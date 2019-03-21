import React, {Component} from 'react';
import { Jumbotron, Grid, Row, Col, Image, Button } from 'react-bootstrap';
import './Footer.css';
import facebook from './assets/facebook.svg';
import instagram from './assets/instagram.svg';
import twitter from './assets/twitter.svg'
import {HashLink as Link} from 'react-router-hash-link';
import {logIn, logOut} from '../../redux/reducer.js'
import {connect} from 'react-redux';
import axios from 'axios';

class Footer extends Component {
ff
  login = () => {
    console.log('herro')
      const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`)
      const scope= encodeURIComponent('openid profile email')
      window.location= `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=${scope}&redirect_uri=${redirectUri}&response_type=code`
  }

  componentDidMount () {
    axios.get('/api/admin-data').then(response => {
      const admin = response.data;
      this.props.logIn(admin);
    })
  }

  logout = () => {
    axios.post('/api/logout').then(res => {
      window.location.href='/'
    })
    .catch(error => console.log(error))
  }

  render () {

    const admin = this.props
    console.log(admin.admin.auth0_id);

    const buttons = admin.admin.auth0_id ?
    <Button onClick={this.logout}>Admin Logout</Button> :
     <Button onClick={this.login}>Admin Login</Button>


    return (

      <div className="footer-container">
        <div className="footer-header">
          <a href="https://www.facebook.com/480RecCenter/">
          <img id="scale" src= {facebook} /></a>
          <img id="scale" src= {instagram} />
          <img id="scale" src= {twitter} />
        </div>
        <div className="footer-secondary">
          <Grid>
            <Row className="show-grid text-center">
              <Col xs={12} sm={3} className='homepage-wrapper'>
                <h2>ABOUT</h2>
                <Link smooth to='/ourstory#about'>Early Beginnings</Link><br/>
                <Link smooth to='/ourstory#pastor'>Pastor David Redish</Link><br/>
                <Link smooth to='/ourstory#worship'>Our Worship Team</Link><br/><br/>
              </Col>
              <Col xs={12} sm={3} className='homepage-wrapper'>
                <h2>FELLOWSHIP</h2>
                <Link smooth to='/fellowship#mission'>What We Believe</Link><br/>
                <Link smooth to='/fellowship#corevalues'>Core Values</Link><br/>
                <Link smooth to='/fellowship#services'>Service Schedule</Link><br/>
                <Link smooth to='/connect#contact'>Need Prayer?</Link><br/><br/>
              </Col>
              <Col xs={12} sm={3} className='homepage-wrapper'>
                <h2>OUTREACH</h2>
                <Link smooth to='/community'>Get Involved</Link><br/>
                <Link smooth to='/outreach'>Volunteer</Link><br/>
                <Link smooth to='/biblestudy'>Small Groups</Link><br/><br/>
              </Col>
              <Col xs={12} sm={3} className='homepage-wrapper'>
                <h2>CONNECT</h2>
                <Link smooth to='/connect'>Events</Link><br/>
                <Link to='/giving'>Giving</Link><br/>
                <Link smooth to='/connect#contact'>Contact Us</Link><br/>

                <div className="login-buttons">
                  {buttons}
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    admin: state.admin
  }
}

const mapDispatchToProps = {
  logIn,
  logOut
}

export default connect(mapStateToProps, mapDispatchToProps) (Footer);
