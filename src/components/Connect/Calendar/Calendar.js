import React, {Component} from 'react';
import {Grid, Row, Col, Button,  Modal, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import './Calendar.css'
import {connect} from 'react-redux';
import {getEvents, logIn} from '../../../redux/reducer';
import axios from 'axios';
import Google from './Google/Google';

class Calendar extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      showAdd: false,
      showEdit: false,
      showRemove: false,
      id: 0,
      calendarName: '',
      calendarDate: '',
      calendarTime: '',
    }
    this.addCalendarClose = this.addCalendarClose.bind(this);
    this.addCalendarShow = this.addCalendarShow.bind(this);
    this.editCalendarClose = this.editCalendarClose.bind(this);
    this.editCalendarShow = this.editCalendarShow.bind(this);
    this.removeCalendarShow = this.removeCalendarShow.bind(this);
    this.removeCalendarClose = this.removeCalendarClose.bind(this);
    this.addCalendar = this.addCalendar.bind(this);
    this.deleteCalendar = this.deleteCalendar.bind(this);
    this.updateCalendar = this.updateCalendar.bind(this);
    this.handleCalendarName = this.handleCalendarName.bind(this);
    this.handleCalendarDate = this.handleCalendarDate.bind(this);
    this.handleCalendarTime = this.handleCalendarTime.bind(this);
    this.getValidationDate = this.getValidationDate.bind(this);
  }


  componentDidMount () {
    this.getAdmin();
    this.getCalendar();
    window.scrollTo(0, 0)
  }

  getCalendar = () => {
    axios.get('/api/events').then(res => {
      this.props.getEvents(res.data);
    }).catch(error => console.log('Unexpected error', error))
  }

  getAdmin = () => {
    axios.get('/api/admin-data').then(response => {
      const admin = response.data;
      this.props.logIn(admin);
    })
  }

  addCalendarClose (clearCalendar) {
    this.setState({showAdd: false})
    this.clearCalendar ();
  }

  addCalendarShow () {
    this.setState({showAdd: true})
  }

  removeCalendarClose (clearCalendar) {
    this.setState({showRemove: false})
    this.clearCalendar ();
  }

  removeCalendarShow (id) {
    this.setState({showRemove: true, id: id})
  }

  editCalendarClose (clearCalendar) {
    this.setState({showEdit: false})
    this.clearCalendar ();
  }

  editCalendarShow (id) {
    const calendarEvent = this.props.finalEvents.find(event => event.id === id)
    this.setState({
      showEdit: true,
      id: id,
      calendarName: calendarEvent.name,
      calendarDate: calendarEvent.date,
      calendarTime: calendarEvent.time
    })
  }

  handleCalendarName (e) {
    this.setState({ calendarName: e.target.value })
  }

  handleCalendarDate (e) {
    this.setState({ calendarDate: e.target.value })
  }

  handleCalendarTime (e) {
    this.setState ({ calendarTime: e.target.value })
  }

  getValidationDate () {
    let date = /^\d{1}([./])\d{2}$/
    let formattedDate = this.state.calendarDate.match(date);
    return formattedDate ? 'success' : 'error';
  }

  clearCalendar () {
    this.setState ({
      calendarName: '',
      calendarDate: '',
      calendarTime: ''
    })
  }

  addCalendar = (name, date, time) => {
    console.log(name, date, time)
    const eventInput = {
      name,
      date,
      time
    }
    axios.post('/api/events', {eventInput}).then( (res) => {
      this.setState({
        showAdd: false
      })
      this.props.getEvents(res.data)
    })
  }

  deleteCalendar = (id) => {
    console.log('deleteCalendar');
    axios.delete(`/api/events/${id}`).then( (res) => {
      this.setState({
        showRemove: false
      })
      this.props.getEvents(res.data)
    })
  }

  updateCalendar = (id, name, date, time) => {
    axios.put(`/api/events/${id}`, {name, date, time}).then( (res) => {
      this.setState({
        showEdit: false
      })
      this.props.getEvents(res.data)
    })
  }

  render() {
    const {finalEvents} = this.props
    const {id, calendarName, calendarDate, calendarTime} = this.state
    const admin = this.props
    const isEnabled = calendarName.length > 0 && calendarDate.match(/^\d{1}([./])\d{2}$/) && calendarTime.length > 0;
    const addButtons = admin.admin.auth0_id === 'github|39249733' ? <Button onClick={this.addCalendarShow}>Add New Event</Button> : null

    let displayedEvents = finalEvents.map( (item) => {
      return <div id="calendar" key={item.id} className="events-container">
        <div className="date-container">
          <h5>{item.date}</h5>
        </div>

        <div className="event-module">
          <h4><b><br/>{item.name}</b></h4><br/>
          <h5>{item.time}</h5>


          { admin.admin.auth0_id ?
            <div className="editdelete-buttons">
              <Button onClick={() => this.editCalendarShow(item.id)}>Edit Event</Button>
              <Button onClick={() => this.removeCalendarShow(item.id)}>Delete Event</Button>
            </div>
          :
          null
        }
        </div>
      </div>

    });

    return (
      <div className='two-container'>
        <Grid>
          <Row>
            <Col xs={12} sm={8} className='location-container'>
              <h2>Location</h2>
              <div className="google-container">
                  <Google />
              </div>
            </Col>
            <Col xs={12} sm={4} className='calendar-container'>
              <div className='calendar-header'>
                <h2>Calendar</h2>
              </div>
              <div className='calendar-events'>
                {displayedEvents}
                {addButtons}
              </div>
            </Col>
          </Row>
        </Grid>

        <Modal show={this.state.showAdd} onHide={this.addCalendarClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <form>
              <FormGroup controlId="formBasicText">
                <ControlLabel>Name: </ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.calendarName}
                  placeholder="Name"
                  onChange={this.handleCalendarName}/>
              </FormGroup>

              <FormGroup
                controlId="formBasicText"
                validationState={this.getValidationDate()}>
                <ControlLabel>Date: </ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.calendarDate}
                  format="MM / DD"
                  placeholder="M / DD"
                  onChange={this.handleCalendarDate}/>
              </FormGroup>

              <FormGroup controlId="formBasicText">
                <ControlLabel>Time: </ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.calendarTime}
                  placeholder="Time"
                  onChange={this.handleCalendarTime}/>
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button disabled={!isEnabled} onClick={() => this.addCalendar(calendarName, calendarDate, calendarTime)}>Create Event</Button>
            <Button onClick={this.addCalendarClose}>Cancel</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.showRemove} onHide={this.removeCalendarClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h2>Are you sure you want to delete this event?</h2>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => this.deleteCalendar(this.state.id)}>Delete Event</Button>
              <Button onClick={this.removeCalendarClose}>Cancel</Button>
            </Modal.Footer>
          </Modal>

          <Modal show={this.state.showEdit} onHide={this.editCalendarClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <form>
                <FormGroup controlId="formBasicText">
                  <ControlLabel>Name: </ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.calendarName}
                    onChange={this.handleCalendarName}/>
                </FormGroup>

                <FormGroup controlId="formBasicText"
                  validationState={this.getValidationDate()}>
                  <ControlLabel>Date: </ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.calendarDate}
                    onChange={this.handleCalendarDate}/>
                </FormGroup>

                <FormGroup controlId="formBasicText">
                  <ControlLabel>Time: </ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.calendarTime}
                    onChange={this.handleCalendarTime}/>
                </FormGroup>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button disabled={!isEnabled} onClick={() => this.updateCalendar(id, calendarName, calendarDate, calendarTime)}>Submit</Button>
              <Button onClick={this.editCalendarClose}>Cancel</Button>
            </Modal.Footer>
          </Modal>



      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    finalEvents: state.finalEvents,
    admin: state.admin
  }
}

const mapDispatchToProps = {
  getEvents,
  logIn
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
