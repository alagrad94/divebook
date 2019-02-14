import React, { Component } from 'react'
import divebookData from '../../../1_modules/divebookData';
import ImageGallery from 'react-image-gallery';

export default class AlbumDetails extends Component {

  state = {
    diveImages: []
  }

  getDiveImages () {
    let diveImages = [];
      divebookData.handleData({dataSet: "albums", fetchType: "GET", embedItem: `?diveLogEntrieId=${this.props.entry[0].id}`})
      .then(photos => {
        photos.forEach(photo => {
        diveImages.push({id: photo.id, original: photo.original, thumbnail: photo.thumbnail})
        });

        this.setState({diveImages: diveImages}, ()=>null)

        })
      // .then(() => this.setState({diveImages: diveImages}, ()=>null))
  }

  componentDidMount () {
      this.getDiveImages();
  }

  render () {

    return <ImageGallery items={this.state.diveImages} />

  }
}