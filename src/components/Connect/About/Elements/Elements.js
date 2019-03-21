import React from 'react'
import './Elements.css'

const Elements = (props) => {
  return (
    <div className="elements-container">
      <div className="overlay">


          <div className="grid2">
            <div id="purple" className="elements-circle">
              <div className="elements-header">
                <h2 id="elements-text">Worship!</h2>
              </div>
            </div>
          </div>

          <div className="grid3">
            <div className="elements-text">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer scelerisque efficitur massa et ultrices. Cras eget arcu vel lorem vulputate eleifend sed sed lorem.   </p>
            </div>
          </div>

      </div>
    </div>
  )
}

export default Elements
