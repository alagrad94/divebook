import React, { Component } from 'react'
import divebookData from '../../1_modules/divebookData'

export default class CloudinaryUploadWidget extends Component {

  constructor() {
    super()

    this.showWidget = this.showWidget.bind(this)
  }

  showWidget() {

    let resultsUrls = [];
    let widget = window.cloudinary.createUploadWidget({
      cloudName: "dehn2kueo",
      uploadPreset: "ppwzpqjm",
      sources: "local",
      publicId: `/${this.props.user.firstName}_${this.props.user.lastName}/${this.props.entry[0].diveSite.name}_${this.props.entry[0].diveDate}/${this.props.entry[0].diveSite.name}_${this.props.entry[0].diveDate}`,
      tags: [`${this.props.entry[0].diveSite.name}_${this.props.entry[0].diveDate}`],
      multiple: true,
      maxFiles: 10,
      thumbnailTransformation: { width: 90, height: 60, crop: 'limit' }
    }, (error, result) => {

      if (result && result.event === "success") {
        let urlObject = {
          "diveLogEntrieId": Number(this.props.entry[0].id),
          "original": result.info.url,
          "thumbnail": result.info.thumbnail_url
        }
        divebookData.handleData({dataSet: "albums", fetchType: "POST", dataBaseObject: urlObject})
        resultsUrls.push({original: result.info.url, thumbnail: result.info.thumbnail_url})
      }

      if (result && result.event === "close") {
        let logId = Number(this.props.entry[0].id)
        let url = resultsUrls[0].original
        this.props.addPhotos(logId, url)
      }
    })
    widget.open()
  }

  render () {
    return (
      <div className="upload">
        <button onClick={this.showWidget.bind(this)} className="button">
          Add Images
        </button>
      </div>
    )
  }
}