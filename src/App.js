import React, { Component } from 'react'
import Navigation from './components/Navigation/Navigation'
import routes from './routes'
import './Reset.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Copyright from './components/Copyright/Copyright'
import {HashLink as Link} from 'react-router-hash-link'
import './App.css'
import { withRouter } from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <div className="App">
        {this.props.location.pathname === '/' ? <Header /> : <Navigation /> }
        {routes}
        <Footer />
        <Copyright />
      </div>
    );
  }
}

export default withRouter(App);
