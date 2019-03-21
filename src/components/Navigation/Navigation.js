import React, {Component} from 'react'
import './Navigation.css'
import Hamburger from './assets/Hamburger.svg'
import { HashLink as Link } from 'react-router-hash-link';

class Navigation extends Component {
  constructor() {
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

        <div className="navigation-menu" onClick={this.closeMenu}>
          <ul>
            <Link style={{ textDecoration: 'none'}} to='/ourstory'><li>Our Story</li></Link>
            <Link style={{ textDecoration: 'none'}} to='/fellowship'><li>Fellowship</li></Link>
            <Link style={{ textDecoration: 'none'}} to='/community'><li>Community</li></Link>
            <Link style={{ textDecoration: 'none'}} to='/giving'><li>Giving</li></Link>
            <Link style={{ textDecoration: 'none'}} to='/connect'><li>Connect</li></Link>
          </ul>
        </div>

    return (
      <div className="navigation">
        <div className="navigation-secondary">

          <div className="navigation-logo">
            <Link style={{ textDecoration: 'none'}} to="/"><h1>480</h1></Link>
          </div>

          <div className="navigation-body">
            <ul>
              <li><Link style={{ textDecoration: 'none'}} to='/ourstory'>Our Story</Link>
                <ul className="navigation-dropdown">
                  <li><Link to='/ourstory#about'>About Us</Link></li>
                  <li><Link smooth to='/ourstory#pastor'>Meet Pastor David</Link></li>
                  <li><Link smooth to='/ourstory#worship'>Worship Team</Link></li>
                </ul>
              </li>
              <li><Link style={{ textDecoration: 'none'}} to='/fellowship'>Fellowship</Link>
                <ul className="navigation-dropdown">
                  <li><Link smooth to="/fellowship#mission">Mission Statement</Link></li>
                  <li><Link smooth to="/fellowship#corevalues">Our Beliefs</Link></li>
                  <li><Link smooth to="/fellowship#services">Service Times</Link></li>
                </ul>
              </li>
              <li><Link style={{ textDecoration: 'none'}} to='/community'>Community</Link>
                <ul className="navigation-dropdown">
                  <li><Link to="/outreach">Outreach</Link></li>
                  <li><Link to="/smallgroups">Small Groups</Link></li>
                </ul>
              </li>
              <Link style={{ textDecoration: 'none'}} to='/giving'><li>Giving</li></Link>
              <li><Link style={{ textDecoration: 'none'}} to='/connect'>Connect</Link>
                <ul className="navigation-dropdown">
                  <li><Link to="/connect">Calendar</Link></li>
                  <li><Link to="/connect">Location</Link></li>
                  <li><Link smooth to="/connect#contact">Contact Us</Link></li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="navigation-toggle">
            <img onClick={this.toggleMenu} src={Hamburger} />
          </div>

          {navigationMenu}

        </div>
      </div>
    )
  }
}


export default Navigation;
