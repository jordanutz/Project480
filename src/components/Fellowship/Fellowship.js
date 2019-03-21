import React,{Component} from 'react';
import Mission from './Mission/Mission';
import Beliefs from './Beliefs/Beliefs';
import ServiceTimes from './ServiceTimes/ServiceTimes';
import './Fellowship.css'

class Fellowship extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render () {
    return (
      <div className="fellowship-container">
        <Mission />
        <Beliefs />
        <ServiceTimes />
      </div>
    )
  }
}

export default Fellowship;
