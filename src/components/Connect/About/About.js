import React, {Component} from 'react';
import './About.css'
import {Image, Carousel, Item, Caption, Button} from 'react-bootstrap';
import {logIn} from '../../../redux/reducer';
import {connect} from 'react-redux';
import axios from 'axios';
import Details from './Details/Details'
import Elements from './Elements/Elements'
import Specifics from './Specifics/Specifics'

class About extends Component {
  constructor() {
    super()
    this.state = {
      toggleDetails: true,
      toggleElements: false,
      toggleSpecifics: false
    }
  }

  componentDidMount() {
    this.getAdmin();
  }

  getAdmin = () => {
    axios.get('/api/admin-data').then(response => {
      const admin = response.data;
      this.props.logIn(admin);
    })
  }

  handleToggleDetails = () => {
    this.setState({
      toggleDetails: true,
      toggleElements: false,
      toggleSpecifics: false
    })
  }

  handleToggleElements = () => {
    this.setState({
      toggleElements: true,
      toggleDetails: false,
      toggleSpecifics: false
    })
  }

  handleToggleSpecifics = () => {
    this.setState({
      toggleSpecifics: true,
      toggleElements: false,
      toggleDetails: false
    })
  }

  render () {
    const admin = this.props

    return (
      <div>

          <div id="about" className="aboutheader-container">

              <div className="about-content">
                {this.state.toggleDetails && <Details />}
                {this.state.toggleElements && <Elements />}
                {this.state.toggleSpecifics && <Specifics />}
              </div>


            <div className="about-toggle">
              <div className="about-togglsecondary">
                <div id="details" className="toggle-icon" onClick={this.handleToggleDetails}></div>
                <div id="elements" className="toggle-icon" onClick={this.handleToggleElements}></div>
                <div id="specifics" className="toggle-icon" onClick={this.handleToggleSpecifics}></div>
              </div>
            </div>
          </div>


      <div id='about' className='about-container'>
        <h1>The 480</h1>

        <div className="about-secondary">

            <div className='about-text'>
              <p>This is your community space and cafe near the University of Kentucky
                  that provides a venue for events, recreation, quiet study, and friendly interaction. 480 offers a unique experience, whether playing some classic arcade games, using the free high-speed wi-fi,
                  hanging with friends and catching the game on the three 4K TVs and 8 inch projector screen or taking part in
                  the numerous events. </p><br/>
            </div>

            <div className='about-text'>
              <p>Drop in, grab some coffee, and relax at the bar or on a couch in the lounge. Gather at a table with old and new
                friends or break a sweat on the wall, in a Zumba class or another calisthenic. There is always something going on! </p><br/>
            </div>
          </div>
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
  logIn
}

export default connect(mapStateToProps, mapDispatchToProps)(About);
