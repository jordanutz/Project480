import React, {Component} from 'react';
import {Grid, Image, Row, Col, Button} from 'react-bootstrap';
import './BibleStudy.css';

class BibleStudy extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render () {
    return (
      <div>
        <div className='group-container'>
          <h1>Small Groups</h1>
          <div className='group-text'>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              Duis aute irure dolor in reprehenderit.</p>
          </div>
        </div>

        <div className="group-grid">
          <Grid>

            <Row className="group-row">
              <Col md={6} mdPush={6} className='photo-column'>
                <Image src='https://78.media.tumblr.com/bb2c39cb83ec511bf7e0a63f290ed023/tumblr_ox3npo52X31qh9o2do1_1280.png' className='group-photo' rounded alt="bible study"/>
              </Col>
              <Col md={6} mdPull={6} className='group-column'>
                <div className="group-max">
                  <h2>Relationships</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                </div>
              </Col>
            </Row>

            <Row className="group-row">
              <Col md={6} mdPush={6} className='photo-column'>
                <Image src='https://78.media.tumblr.com/a32e343643d61b4c2b12021a623910bc/tumblr_oh5raqWDPn1rsdpaso1_250.gif' className='group-photo' rounded alt="bible study"/>
              </Col>
              <Col md={6} mdPull={6} className='group-column'>
                <div className="group-max">
                  <h2>Community</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                </div>
              </Col>
            </Row>

            <Row className="group-row">
              <Col md={6} mdPush={6} className='photo-column'>
                <Image src='https://78.media.tumblr.com/a58bcef5668713531a7e45282069cda3/tumblr_oiwqc7yBy11rsdpaso1_250.gif' className='group-photo' alt="bible-study" rounded/>
              </Col>
              <Col md={6} mdPull={6} className='group-column'>
                <div className="group-max">
                  <h2>Spiritual Growth</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                </div>
              </Col>
            </Row>

          </Grid>

        </div>
        <div className="register-button">
          <Button className="register">Sign Up</Button>
        </div>
      </div>
    )
  }
}

export default BibleStudy;
