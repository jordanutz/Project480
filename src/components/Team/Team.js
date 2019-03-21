import React, {Component} from 'react';
import Pastor from './Pastor/Pastor';
import Worship from './Worship/Worship';
import About from '../Connect/About/About';

class Team extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render () {
    return (
      <div>
        <About />
        <Pastor />
        <Worship />
      </div>
    )
  }
}

export default Team;
