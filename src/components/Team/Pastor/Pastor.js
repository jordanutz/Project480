import React from 'react';
import {Grid, Row, Col, Image} from 'react-bootstrap';
import './Pastor.css';

const Pastor = (props) => {
  return (
    <div id='pastor' className='pastor-container'>
      <h1>Elder Team</h1>
      <Grid>
        <Row>
          <Col xs={12} sm={6} className='pastor-section'>
            <div className='pastor-module'>
            <div className="photo-container">
              <Image src='https://78.media.tumblr.com/79dfc85dd1365e47fbb48c3cb233fcd2/tumblr_os5vqee4nN1sshs72o1_1280.jpg' circle className='elder-photo' alt="David Reddish"/>
            </div>
            <div className='aboutpastor-container'>
              <h2>Pastor David Reddish</h2>
              <p>David is the senior elder and Pastor here at The Crossing: 480. His passion is to teach
                the Scripture while ministering about God's gifts. He is a graduate of Asbury College Seminary
                and has served in numerous forms of ministry since 1971. David is married to Sandra, who teaches kindergarten at
                Lexington Christian Academy. Together they have four children.</p><br/>
          </div>
        </div>
          </Col>
          <Col xs={12} sm={6} className='pastor-section'>
            <div className='pastor-module'>
              <div className="photo-container">
                <Image src='https://78.media.tumblr.com/135f7d9ab134dbfaff9394537b637a40/tumblr_o1me41rMnY1sshs72o1_1280.jpg' circle className='elder-photo' alt="Rich Moyen"/>
              </div>
            <div className='aboutpastor-container'>
              <h2>Dr. Rich Moyen</h2>
              <p>Rich is an elder, as well as the lead administrator and treasurer for The Crossing.  He is a retired
                Physician who cares for people and tirelessly works to insure the church is properly taken care of both
                financially and tangibly.  Rich is married to Mary Lu, whom has a nurturing heart and the gift of
                hospitality that enriches all that know them. Together they have four children. </p><br/>
            </div>
          </div>
          </Col>
        </Row>
      </Grid>
    </div>
  )
}

export default Pastor;
