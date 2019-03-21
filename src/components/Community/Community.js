import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {Grid, Row, Col, Image} from 'react-bootstrap';
import './Community.css'

class Community extends Component {

  componentDidMount () {
    window.scrollTo(0, 0)
  }

  render () {
    return (
      <div>
        <div className="jumbotron">
          <div className="community-container">
            <h1>Community</h1>
          </div>
        </div>

        <div className='activities-container'>
          <Grid>
            <Row>
              <Col xs={12} sm={6}>
                <div className='activities-module'>
                  <h2>Outreach</h2>
                  <div className='activities-text'>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><br/>
                  </div>
                    <Link to='/outreach'><button>Learn More</button></Link><br/>
                </div>
              </Col>
              <Col xs={12} sm={6}>
                <div className='activities-module'>
                  <h2>Small Groups</h2>
                  <div className='activities-text'>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><br/>
                  </div>
                    <Link to='/smallgroups'><button>Learn More</button></Link>
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    )
  }
}

export default Community;
