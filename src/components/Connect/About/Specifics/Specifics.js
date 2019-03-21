import React from 'react'
import './Specifics.css'

const Specifics = (props) => {
  return (
    <div className="specifics-container">
      <div className="overlay">

        <div className="grid4">
          <div id="blue" className="specifics-circle">
            <div className="specifics-header">
              <h2 id="specifics-text">Get Involved!</h2>
            </div>
          </div>
        </div>

        <div className="grid5">
          <div className="specifics-text">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer scelerisque efficitur massa et ultrices. Cras eget arcu vel lorem vulputate eleifend sed sed lorem.   </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Specifics
