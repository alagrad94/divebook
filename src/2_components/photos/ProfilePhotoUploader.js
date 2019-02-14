import React, { Component } from 'react'
import axios from 'axios'
import divebookData from '../../1_modules/divebookData'

export default class ProfilePhotoUploader extends Component {
  state = {
    selectedFile: null,
    file: null
  }
  postProfilePhotoUrl(photoUrl){
    let id =  Number(sessionStorage.getItem('user'))
    console.log(id)
    divebookData.handleData({dataSet: "users", fetchType: "PATCH", patchId: id, dataBaseObject: {"id": id ,"userPhoto": photoUrl}})
  }

  fileSelectedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      file: URL.createObjectURL(event.target.files[0])
    }, ()=> null)

  }

  fileUploadHandler = (evt) => {
    if (this.props.photoUrl === "") {
      let user = this.props.data.currentUser[0]
      let cloudinaryURL = 'https://api.cloudinary.com/v1_1/dehn2kueo/upload';
      let cloudinaryUploadPreset = 'ppwzpqjm';
      let fd = new FormData();
      let file = this.state.selectedFile;
      let tag = `${user.firstName}_${user.lastName}_profile_photo`
      let publicId = `/${user.firstName}_${user.lastName}/${user.firstName}_${user.lastName}_profile_photo`
      let axiosConfig = {headers: {'Content-Type': 'x-www-form-urlencoded'}}
      fd.append('upload_preset', cloudinaryUploadPreset);
      fd.append('tags', tag); // Optional - add tag for image admin in Cloudinary
      fd.append('file', file);
      fd.append('public_id', publicId)

      axios.post(cloudinaryURL, fd, axiosConfig)
      .then(res => {
        let photoUrl = res.data.secure_url;
        console.log(photoUrl)
        this.postProfilePhotoUrl(photoUrl)
      }).then(this.props.updateAppState).then(this.props.history.push("/profile"))
    } else {

    }
  }

  render () {
    let PicAndButton = () => {
      if(this.state.file !== null) {
        return (
          <div>
          <button  type="submit" className="upload_button">Upload</button>
          <img width="25%" height="25%" src={this.state.file} alt=""/>
          </div>
        )
      } else {
        return null
      }
    }

    let ProfilePicUpload = () => {
      if(this.props.data.photoUrl !== "") {

        return (
          <label htmlFor="file-upload" className="inputfile">Select A Profile Photo <input type="file" id="file-upload" onChange={this.fileSelectedHandler} /></label>
        )
      } else {
        return null
      }
    }
    return (
      <form className="photo" onSubmit={this.fileUploadHandler}>
        <ProfilePicUpload></ProfilePicUpload>
        <PicAndButton></PicAndButton>
      </form>
    )
  }
}