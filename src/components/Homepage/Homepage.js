import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Grid, Row, Col, Image, Button} from 'react-bootstrap';
import './Homepage.css';


class Homepage extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

    render () {
    return (

        <div className="background-image">
          <div className="main-container">
            <div className="circle1"></div>
            <div className="circle2"></div>
            <div className="circle3"></div>
            <Link id="logo" to="/ourstory">
              <h2>Welcome to the</h2>
              <h1> 480</h1>
            </Link>
          </div>
        </div>
    )
  }
}

export default Homepage;
