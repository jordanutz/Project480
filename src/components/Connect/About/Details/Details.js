import React from 'react'
import './Details.css'

const Details = (props) => {
  return (
    <div className="details-container">
      <div className="overlay">

        <div className="grid">
          <div id="red" className="details-circle">
            <div className="details-header">
              <h2 id="details-text">Game Time!</h2>
            </div>
          </div>
        </div>

        <div className="grid1">
          <div className="details-text">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer scelerisque efficitur massa et ultrices. Cras eget arcu vel lorem vulputate eleifend sed sed lorem.   </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details
