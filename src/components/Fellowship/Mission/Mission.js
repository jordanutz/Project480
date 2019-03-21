import React from 'react';
import './Mission.css';
import {Image} from 'react-bootstrap';

const Mission = (props) => {
  return (
    <div id="mission" className='mission-container'>
      <Image src='https://78.media.tumblr.com/65bf4ec4a1b747c12dd0b31363ad7a7a/tumblr_nr2yfizd1C1sshs72o1_1280.jpg' circle className='about-photo' alt="mission"/><br/>
      <h1>Our Mission</h1>
        <div className='mission-text'>
          <p>We’re a fellowship from a variety of backgrounds who have joined together for a common purpose:
            to strengthen our relationship with God, as well as to assist others in the reinforcement of their own.
            Our common goal is to expand together in the Lord Jesus Christ and grow His Kingdom through relationships
            based on love, service through kindness, and ministering God's superior power and grace. We believe the
            church is God’s people, not just a building. </p>
        </div>
      </div>
  )
}

export default Mission;
