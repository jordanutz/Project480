import React, {Component} from 'react'
import axios from 'axios'

class Photos extends Component {

  render () {
    return (
      <div className="photos-container">
        Photos
        <button onClick={this.handleImageUpload}>Upload Image</button>

      </div>
    )
  }
}

export default Photos
