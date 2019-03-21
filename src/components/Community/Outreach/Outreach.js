import React, {Component} from 'react';
import './Outreach.css'
import {Navbar, Grid, Row, Col, Image, Panel, PanelGroup, Checkbox, Button, Modal, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import axios from 'axios';
import {connect} from 'react-redux';
import {getOutreach, logIn} from '../../../redux/reducer';

class Outreach extends Component {
  constructor(props, context) {
   super(props, context);

   this.state = {
     open: false,
     showRemove: false,
     showEdit: false,
     showAdd: false,
     name: '',
     date: '',
     location: '',
     time: '',
     description: '',
     id: 0,
     search: ''
   }
   this.removeEventClose = this.removeEventClose.bind(this);
   this.removeEventShow = this.removeEventShow.bind(this);
   this.editEventClose = this.editEventClose.bind(this);
   this.editEventShow = this.editEventShow.bind(this);
   this.addEventClose = this.addEventClose.bind(this);
   this.addEventShow = this.addEventShow.bind(this);
   this.handleEventName = this.handleEventName.bind(this);
   this.handleEventDate = this.handleEventDate.bind(this);
   this.handleEventLocation = this.handleEventLocation.bind(this);
   this.handleEventTime = this.handleEventTime.bind(this);
   this.handleEventDescription = this.handleEventDescription.bind(this);
   this.deleteOutreach = this.deleteOutreach.bind(this);
   this.updateOutreach = this.updateOutreach.bind(this);
   this.handleSearch = this.handleSearch.bind(this);
 }

   componentDidMount() {
     this.getAdmin();
     this.getOutreach();
     window.scrollTo(0, 0)
   }

   getAdmin = () => {
     axios.get('/api/admin-data').then(response => {
       const admin = response.data;
       this.props.logIn(admin);
     })
   }

   getOutreach () {
    axios.get('/api/outreach').then(res => {
      this.props.getOutreach(res.data);
   }).catch(error => console.log('Unable to retrieve Axios Outreach', error))
  }

   deleteOutreach = (id) => {
     axios.delete(`/api/outreach/${id}`).then( (res) => {
       this.setState({
         showRemove: false
       })
       this.props.getOutreach(res.data)
    })
   }

   addOutreach = (name, date, location, time, description) => {
     const outreachInput = {
       name,
       date,
       location,
       time,
       description
     }
     console.log(outreachInput)
     axios.post('/api/outreach', {outreachInput}).then( (res) => {
       this.setState({
         showAdd: false
       })
       this.props.getOutreach(res.data)
     })
   }

   updateOutreach = (id, name, date, location, time, description) => {
     axios.put(`/api/outreach/${id}`, {name, date, location, time, description}).then( (res) => {
       this.setState({
         showEdit: false
       })
       this.props.getOutreach(res.data)
     })
   }

   addEventClose (clearOutreach) {
     this.setState({showAdd: false})
     this.clearOutreach();
   }

   addEventShow () {
     this.setState({showAdd: true})
   }

   editEventClose (clearOutreach) {
     this.setState({showEdit: false})
     this.clearOutreach();
   }

   editEventShow (id) {
     let outreachEvent = this.props.finalOutreach.find(event => event.id === id)
     this.setState({
       showEdit: true,
       id: id,
       name: outreachEvent.name,
       date: outreachEvent.date,
       location: outreachEvent.location,
       time: outreachEvent.time,
       description: outreachEvent.description
     })
   }

   removeEventClose(clearOutreach) {
     this.setState({ showRemove: false });
     this.clearOutreach();
   }

   removeEventShow(id) {
     console.log('jjjjj')
     this.setState({ showRemove: true, id: id });
   }

   handleEventName (e) {
     this.setState ({ name: e.target.value})
   }

   handleEventDate (e) {
     this.setState ({ date: e.target.value})
   }

   handleEventLocation (e) {
     console.log(e)
     this.setState ({ location: e.target.value })
   }

   handleEventTime (e) {
     this.setState ({ time: e.target.value })
   }

   handleEventDescription (e) {
     this.setState ({ description: e.target.value})
   }

   handleSearch (e) {
     this.setState ({
       search: e.target.value
     })
   }

   clearOutreach () {
     this.setState ({
       name: '',
       date: '',
       location: '',
       time: '',
       description: ''
     })
   }


  render () {
    const {finalOutreach} = this.props;
    const admin = this.props;
    const {id, name, date, location, time, description} = this.state;
    const addButtons = admin.admin.auth0_id ? <Button onClick={this.addEventShow}>Create New Event</Button> : null
    const isEnabled = name.length > 0 && location.length > 0 && time.length > 0 && description.length > 0;

    let filteredOutreach = finalOutreach.filter( (item) => {
      return item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) != -1;
    })

    let displayedOutreach = filteredOutreach.map( (item) => {
      return <PanelGroup accordion id="accordion-example" >
        <Panel eventKey={item.id}>
          <Panel.Heading>
            <Panel.Title toggle>{item.name}</Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible id="selection-body">
        Organization: {item.name}<br/>
        Date: {item.date}<br/>
        Location: {item.location}<br/>
        Time: {item.time}<br/>
        Contact: {item.description}<br/>

      { admin.admin.auth0_id === 'github|39249733' ?
      <div className="outreachbuttons-container">
          <br/><Button onClick={() => this.editEventShow(item.id)}>Edit Event</Button>
          <Button onClick={() => this.removeEventShow(item.id)}>Delete Event</Button>
      </div>
      :
      null
    }
      </Panel.Body>
    </Panel>
  </PanelGroup>;

    });



    return (
      <div>
        <div className="outreach-background">
          <div className='outreach-container'>
            <h1>Outreach</h1>
          </div>
        </div>

        <div className="outreach-about">
          <h3>Volunteer</h3>
          <div className="outreachabout-text">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              Duis aute irure dolor.</p>
          </div>
        </div>


      <div className='volunteer-profile'>
          <Grid>
            <Row>
              <Col xs={6} md={5} className="flex-filter">
                <div className='filters-container'>
                  <Navbar id="search-box">
                    <Navbar.Header>
                      <Navbar.Brand>
                        <h1 id="go">Go!</h1>
                      </Navbar.Brand>
                      <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                      <Navbar.Form className="flex-search">
                        <FormGroup>
                          <FormControl type="text" placeholder="Search" onChange={this.handleSearch} />
                        </FormGroup>{' '}
                      </Navbar.Form>
                    </Navbar.Collapse>
                    </Navbar>



                  <div className='eventbutton-container'>
                    <br/>{addButtons}
                  </div>

                </div><br/>
              </Col>

              <Col xs={12} md={7} className="flex-outreach">
                <div className='selection-container'>
                  <Panel>
                    <Panel.Heading id="custom-color">
                      <Panel.Title id="custom-text" componentClass="h3">Opportunities</Panel.Title>
                    </Panel.Heading>
                  {displayedOutreach}
                  </Panel>
                </div>
              </Col>
            </Row>
          </Grid>
        </div>

        <Modal show={this.state.showAdd} onHide={this.addEventClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>

              <form>
            <FormGroup
              controlId="formBasicText"
            >
            <ControlLabel>Organization:</ControlLabel>
              <FormControl
                type="text"
                value={this.state.name}
                placeholder="Organization"
                onChange={this.handleEventName}
              />
              <FormControl.Feedback />
            </FormGroup>


          <FormGroup
            controlId="formBasicText"
          >
          <ControlLabel>Date:</ControlLabel>
            <FormControl
              type="date"
              value={this.state.date}
              placeholder="Date"
              onChange={this.handleEventDate}
            />
            <FormControl.Feedback />
          </FormGroup>

          <FormGroup
            controlId="formBasicText"
          >
          <ControlLabel>Location:</ControlLabel>
            <FormControl
              type="text"
              value={this.state.location}
              placeholder="Location"
              onChange={this.handleEventLocation}
            />
            <FormControl.Feedback />
          </FormGroup>

          <FormGroup
            controlId="formBasicText"
          >
          <ControlLabel>Time:</ControlLabel>
            <FormControl
              type="text"
              value={this.state.time}
              placeholder="Time"
              onChange={this.handleEventTime}
            />
            <FormControl.Feedback />
          </FormGroup>

          <FormGroup
            controlId="formBasicText"
          >
          <ControlLabel>Contact:</ControlLabel>
            <FormControl
              type="text"
              value={this.state.description}
              placeholder="Contact"
              onChange={this.handleEventDescription}
            />
            <FormControl.Feedback />
          </FormGroup>

          </form>
            </Modal.Body>
          <Modal.Footer>
            <Button disabled={!isEnabled} onClick={() => this.addOutreach(name, date, location, time, description)}>Submit</Button>
            <Button onClick={this.addEventClose}>Cancel</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.showEdit} onHide={this.editEventClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>

              <form>
            <FormGroup
              controlId="formBasicText"
            >
            <ControlLabel>Organization:</ControlLabel>
              <FormControl
                type="text"
                value={this.state.name}
                onChange={this.handleEventName}
              />
              <FormControl.Feedback />
            </FormGroup>


          <FormGroup
            controlId="formBasicText"
          >
          <ControlLabel>Date:</ControlLabel>
            <FormControl
              type="text"
              value={this.state.date}
              onChange={this.handleEventDate}
            />
            <FormControl.Feedback />
          </FormGroup>

          <FormGroup
            controlId="formBasicText"
          >
          <ControlLabel>Location:</ControlLabel>
            <FormControl
              type="text"
              value={this.state.location}
              onChange={this.handleEventLocation}
            />
            <FormControl.Feedback />
          </FormGroup>

          <FormGroup
            controlId="formBasicText"
          >
          <ControlLabel>Time:</ControlLabel>
            <FormControl
              type="text"
              value={this.state.time}
              onChange={this.handleEventTime}
            />
            <FormControl.Feedback />
          </FormGroup>

          <FormGroup
            controlId="formBasicText"
          >
          <ControlLabel>Contact:</ControlLabel>
            <FormControl
              type="text"
              value={this.state.description}
              onChange={this.handleEventDescription}
            />
            <FormControl.Feedback />
          </FormGroup>

          </form>
            </Modal.Body>
          <Modal.Footer>
            <Button onClick={ () => this.updateOutreach(id, name, date, location, time, description)}>Submit Changes</Button>
            <Button onClick={this.editEventClose}>Cancel</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.showRemove} onHide={this.removeEventClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Are you sure you would like to delete this event?</h4>
            </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.deleteOutreach(this.state.id)}>Delete Event</Button>
            <Button onClick={this.removeEventClose}>Cancel</Button>
          </Modal.Footer>
        </Modal>

    </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    finalOutreach: state.finalOutreach,
    admin: state.admin
  }
}

const mapDispatchToProps = {
  getOutreach,
  logIn
}

export default connect(mapStateToProps, mapDispatchToProps)(Outreach);
