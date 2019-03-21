import React, {Component} from 'react'
import './Header.css'
import {Link} from 'react-router-dom'
import Hamburger from '../Navigation/assets/Hamburger.svg'

class Header extends Component {
  constructor () {
    super()
    this.state = {
      toggle: false
    }
  }

  toggleMenu = () => {
    this.setState((prevState) => {
      return {toggle: !prevState.toggle}
    })
  }

  closeMenu = () => {
    this.setState({
      toggle: false
    })
  }


  render () {

    let navigationMenu = this.state.toggle &&
      <div className="header-menu" onClick={this.closeMenu}>
        <ul>
          <Link style={{ textDecoration: 'none'}} to='/ourstory'><li>Our Story</li></Link>
          <Link style={{ textDecoration: 'none'}} to='/fellowship'><li>Fellowship</li></Link>
          <Link style={{ textDecoration: 'none'}} to='/community'><li>Community</li></Link>
          <Link style={{ textDecoration: 'none'}} to='/giving'><li>Giving</li></Link>
          <Link style={{ textDecoration: 'none'}} to='/connect'><li>Connect</li></Link>
        </ul>
      </div>

    return (
      <div className="header">
        <div className="header-toggle">
          <img onClick={this.toggleMenu} src={Hamburger} />
        </div>
        <div className="header-body">
          <div className="header-module">
            <Link style={{ textDecoration: 'none'}} to='/ourstory'><h2>Our Story</h2></Link>
          </div>
          <div className="header-module">
            <Link style={{ textDecoration: 'none'}} to='/fellowship'><h2>Fellowship</h2></Link>
          </div>
          <div className="header-module">
            <Link style={{ textDecoration: 'none'}} to='/community'><h2>Community</h2></Link>
          </div>
          <div className="header-module">
            <Link style={{ textDecoration: 'none'}} to='/giving'><h2>Giving</h2></Link>
          </div>
          <div className="header-module">
            <Link style={{ textDecoration: 'none'}} to='/connect'><h2>Connect</h2></Link>
          </div>
        </div>
        {navigationMenu}
      </div>
    )
  }
}

export default Header;
