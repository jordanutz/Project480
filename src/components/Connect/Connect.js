import React from 'react'
import Contact from './Contact/Contact'
import Calendar from './Calendar/Calendar'
import Photos from './Photos/Photos'
import './Connect.css'

const Connect = (props) => {
  return (
    <div id="connect" className="connect-container">
      <Calendar />
      <Contact />
    </div>
  )
}

export default Connect;
