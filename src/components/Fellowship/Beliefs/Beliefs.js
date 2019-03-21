import React from 'react';
import {Grid, Row, Col, Image} from 'react-bootstrap';
import './Beliefs.css'

const Beliefs = (props) => {


  return (
    <div id='corevalues' className='values-container'>
      <h1>Core Values</h1>
        <Grid>
          <Row>
            <Col xs={12} sm={4} className="values-module">
              <div className="values-photo">
                <Image src='https://78.media.tumblr.com/df3ae7c3a65f9729963a1fe8b3e9867b/tumblr_olbt1qPl701sshs72o1_1280.jpg' circle className='values-photo' alt="values"/>
              </div>
              <h2>Worship</h2>
              <div container='coretext-container'>
              <p>Lorem ipsum dolor sit consectetur adipiscing elit. Nunc ultricies a mi mollis viverra.
                Aenean nec eros. In efficitur vitae pulvinar. </p><br />
              </div>
            </Col>

            <Col xs={12} sm={4} className="values-module">
              <div className="values-photo">
                <Image src='https://78.media.tumblr.com/36865fa3aecabb93b262483ae81eb25d/tumblr_otlohkntB41sshs72o1_1280.jpg' circle className='values-photo' alt="values"/>
              </div>
              <h2>Community</h2>
              <div container='coretext-container'>
                <p>Lorem ipsum dolor sit consectetur adipiscing elit. Nunc ultricies a mi mollis viverra.
                  Aenean nec eros. In efficitur vitae pulvinar. </p> <br />
              </div>
            </Col>

            <Col xs={12} sm={4} className="values-module">
              <div className="values-photo">
                <Image src='https://78.media.tumblr.com/a9c6839f65d3a69e7e3e81fcda84bdab/tumblr_otnhrxVWPu1sshs72o1_500.jpg' circle className='values-photo' alt="values"/>
              </div>
              <h2>Service</h2>
              <div container='coretext-container'>
                <p>Lorem ipsum dolor sit consectetur adipiscing elit. Nunc ultricies a mi mollis viverra.
                  Aenean nec eros. In efficitur vitae pulvinar. </p> <br />
              </div>
            </Col>
          </Row>
        </Grid>
    </div>
  )
}

export default Beliefs;
