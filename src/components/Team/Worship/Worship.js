import React, {Component} from 'react';
import {Jumbotron, Row, Col, Image, Tab, Tabs, NavItem, Nav, Popover, Tooltip, Modal, Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import './Worship.css';
import axios from 'axios';
import {connect} from 'react-redux';
import {getWorship, logIn} from '../../../redux/reducer';
import {Redirect} from 'react-router-dom';

class Worship extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      id: 0,
      showRemove: false,
      showEdit: false,
      showAdd: false,
      name: '',
      university: '',
      graduation: '',
      major: '',
      instrument: '',
      image: '',
      redirect: false
    }
  }

  componentDidMount() {
    this.getWorship();
    this.getAdmin();
  }

  getWorship = () => {
    axios.get('/api/worship').then(res => {
      console.log(res)
      this.props.getWorship(res.data);
    }).catch(error => console.log('Unknown error with retrieving worship'))
  }

  getAdmin = () => {
    axios.get('/api/admin-data').then(res => {
      const admin = res.data;
      this.props.logIn(admin);
    })
  }

  deleteMember = (id) => {
    axios.delete(`/api/worship/${id}`).then(res => {
      this.setState({showRemove: false})
      this.props.getWorship(res.data)
    })
  }

  addMember = (name, university, graduation, major, instrument, image, admin_id) => {
    const worshipInput = {
      name,
      university,
      graduation,
      major,
      instrument,
      image,
      admin_id
    }
    axios.post('/api/worship', {worshipInput}).then(res => {
      this.setState({showAdd: false})
      this.props.getWorship(res.data)
    })
  }

  updateMember = (id, name, university, graduation, major, instrument, image) => {
    axios.put (`api/worship/${id}`, {name, university, graduation, major, instrument, image}).then(res => {
      this.setState({showEdit: false})
      this.props.getWorship(res.data)
    })
  }

  addWorshipClose = (clearWorship) => {
    this.setState({showAdd: false});
    this.clearWorship();
  }

  addWorshipShow = () => {
    this.setState({showAdd: true})
  }

  editWorshipClose = (clearWorship) => {
    this.setState({showEdit: false})
    this.clearWorship()
  }

  editWorshipShow = (id) => {
    const worshipMember = this.props.finalWorship.find(member => member.id === id)
    console.log(worshipMember)
    this.setState({
      showEdit: true,
      id: id,
      name: worshipMember.name,
      graduation: worshipMember.graduation,
      university: worshipMember.university,
      major: worshipMember.major,
      instrument: worshipMember.instrument,
      image: worshipMember.image
     })
  }

  removeWorshipClose = (clearWorship) => {
    console.log('jjjjjj');
    this.setState({ showRemove: false });
    this.clearWorship()
  }

  removeWorshipShow = (id) => {
    console.log('herro', id);
    this.setState({ showRemove: true, id: id });
  }

  handleName = (e, res) => {
    this.setState ({ name: e.target.value });
  }

  handleUniversity = (e) => {
    this.setState ({ university: e.target.value })
  }

  handleGraduation = (e) => {
    this.setState ({ graduation: e.target.value })
  }

  handleMajor = (e) => {
    this.setState ({ major: e.target.value })
  }

  handleInstrument = (e) => {
    this.setState ({ instrument: e.target.value })
  }

  handleImage = (e) => {
    this.setState ({ image: e.target.value })
  }

  clearWorship = () => {
    this.setState ({
      name: '',
      university: '',
      graduation: '',
      major: '',
      instrument: '',
      image: ''
    })
  }

  render () {
    const {finalWorship} = this.props;
    const admin = this.props
    const {id, name, university, graduation, major, instrument, image} = this.state;
    const isEnabled = name.length > 0 && university.length > 0 && graduation.length > 0 && major.length > 0 && instrument.length > 0 && image.length > 0;

    const addButtons = admin.admin.auth0_id && <Button onClick={this.addWorshipShow}>Add New Team Member</Button>

    let displayedTabPanes = finalWorship.map( (member) => {
      console.log(member.id);
      return <Tab.Pane eventKey={member.id}>

        <img src={member.image} className="worship-image" alt={member.name}/><br/>
        Name: {member.name}<br/>
        {member.university}<br/>
        Graduation Year: {member.graduation}<br/>
        Major: {member.major}<br/>
        Instrument: {member.instrument}<br/>

      { admin.admin.auth0_id === 'github|39249733' ?
      <div className='editdelete-buttons'>
        <Button onClick={() => this.editWorshipShow(member.id)}>Edit Member</Button>
        <Button onClick={() => this.removeWorshipShow(member.id)}>Delete Member</Button>
      </div>
      :
      null
    }

        </Tab.Pane>
    })

    let displayedNavItems = finalWorship.map( (member) => {
      return <NavItem eventKey={member.id}>{member.name}</NavItem>
    })

    return (
      <div id='worship' className='worship-container'>
        <h1>Worship Team</h1>
        <div className='worship-module'>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row className="clearfix">
                <Col sm={4} mdp={4}>
                  <Nav bsStyle="pills" stacked>
                    <h2>Members</h2>
                    {displayedNavItems}
                    <br/><div className="addteammember-button">
                    {addButtons}
                    </div>
                  </Nav>
                </Col>
                <Col sm={8} md={8}>
                  <div className="displayedtabs">

                  <Tab.Content animation>
                    {displayedTabPanes}
                  </Tab.Content>
                  </div>
                </Col>
            </Row>
          </Tab.Container>
        </div>

        <Modal show={this.state.showRemove} onHide={this.removeWorshipClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Are you sure you would like to delete this member?</h4>
            </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.deleteMember(this.state.id)}>Delete Member</Button>
            <Button onClick={this.removeWorshipClose}>Cancel</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.showEdit} onHide={this.editWorshipClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Team Member</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <form>

            <FormGroup
              controlId="formBasicText"
            >
              <ControlLabel>Name:</ControlLabel>
              <FormControl
                type="text"
                value={this.state.name}
                onChange={this.handleName}
              />
            </FormGroup>

            <FormGroup
              controlId="formBasicText"
            >
              <ControlLabel>University:</ControlLabel>
              <FormControl
                type="text"
                value={this.state.university}
                onChange={this.handleUniversity}
              />
            </FormGroup>

            <FormGroup
              controlId="formBasicText"
            >
              <ControlLabel>Graduation:</ControlLabel>
              <FormControl
                type="text"
                value={this.state.graduation}
                onChange={this.handleGraduation}
              />
            </FormGroup>

            <FormGroup
              controlId="formBasicText"
            >
              <ControlLabel>Major:</ControlLabel>
              <FormControl
                type="text"
                value={this.state.major}
                onChange={this.handleMajor}
              />
            </FormGroup>

            <FormGroup
              controlId="formBasicText"
            >
              <ControlLabel>Instrument:</ControlLabel>
              <FormControl
                type="text"
                value={this.state.instrument}
                onChange={this.handleInstrument}
              />
            </FormGroup>

            <FormGroup
              controlId="formBasicText"
            >
              <ControlLabel>Image</ControlLabel>
              <FormControl
                type="text"
                value={this.state.image}
                onChange={this.handleImage}
              />
            </FormGroup>



          </form>



          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.updateMember(id, name, university, graduation, major, instrument, image) }>Save Changes</Button>
            <Button onClick={this.editWorshipClose}>Cancel</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.showAdd} onHide={this.addWorshipClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add User</Modal.Title>
          </Modal.Header>
          <Modal.Body>

              <form>

              <FormGroup
              controlId="formBasicText"
              >
              <ControlLabel>Name:</ControlLabel>
              <FormControl
                type="text"
                value={this.state.name}
                placeholder='Name'
                onChange={this.handleName}
              />
              </FormGroup>

              <FormGroup
              controlId="formBasicText"
              >
              <ControlLabel>University:</ControlLabel>
              <FormControl
                type="text"
                value={this.state.university}
                placeholder="University"
                onChange={this.handleUniversity}
              />
              </FormGroup>

              <FormGroup
              controlId="formBasicText"
              >
              <ControlLabel>Graduation:</ControlLabel>
              <FormControl
                type="text"
                value={this.state.graduation}
                placeholder="Graduation"
                onChange={this.handleGraduation}
              />
              </FormGroup>

              <FormGroup
              controlId="formBasicText"
              >
              <ControlLabel>Major:</ControlLabel>
              <FormControl
                type="text"
                value={this.state.major}
                placeholder="Major"
                onChange={this.handleMajor}
              />
              </FormGroup>

              <FormGroup
              controlId="formBasicText"
              >
              <ControlLabel>Instrument:</ControlLabel>
              <FormControl
                type="text"
                value={this.state.instrument}
                placeholder="Instrument"
                onChange={this.handleInstrument}
              />

              </FormGroup>

              <FormGroup
                controlId="formBasicText"
              >
                <ControlLabel>Image</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.image}
                  placeholder="Image"
                  onChange={this.handleImage}
                />
              </FormGroup>
              </form>
            </Modal.Body>
          <Modal.Footer>
            <Button disabled={!isEnabled} onClick={() => this.addMember(name, university, graduation, major, instrument, image, 1)}>Create User</Button>
            <Button onClick={this.addWorshipClose}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    finalWorship: state.finalWorship,
    admin: state.admin
  }
}

const mapDispatchToProps = {
  getWorship,
  logIn,
}

export default connect(mapStateToProps, mapDispatchToProps)(Worship);
