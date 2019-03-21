import React, {Component} from 'react';
import './Contact.css';
import {Image} from 'react-bootstrap';
import {FormGroup, FormControl, Grid, Row, Col, form, ControlLabel, Button} from 'react-bootstrap';
import axios from 'axios';

class Contact extends Component {
  constructor (props, context) {
  super(props, context);
    this.state = {
      name: '',
      email: '',
      phone: '',
    }
      this.handleChange = this.handleName.bind(this);
      this.handleChange = this.handleEmail.bind(this);
      this.handleChange = this.handlePhone.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.resetInput = this.resetInput.bind(this);
      this.resetMessage = this.resetMessage.bind(this);
  }

    handleName(e) {
      this.setState({value: e.target.value });
    }

    handleEmail(e) {
      this.setState({value: e.target.value });
    }

    handlePhone(e) {
      this.setState({value: e.target.value });
    }

    handleSubmit(e){
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        console.log(name, email, phone, message)
        axios.post('/send', {name, email, phone, message}).then((response)=>{
            if (response.data.msg === 'success'){
                alert("Message Sent.");
                this.resetInput();
                this.resetMessage();
            }else if(response.data.msg === 'fail'){
                alert("Message failed to send.")
            }
        })
    }

    resetInput(){
        document.getElementById('input-reset').reset();
    }

    resetMessage(){
        document.getElementById('message-reset').reset();
    }

    componentDidMount() {
      window.scrollTo(0, 0)
    }

  render () {
    return (
      <div id='contact' className='contact-container'>
        <h1>Contact Us!</h1>
          <div className='contact-text'>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><br/>
          </div>

        <div className='contact-form' id='no-stretch'>
          <Grid>
            <Row>
              <Col xs={12} sm={5}>
                <div className="basic-input">
                  <form id='input-reset'>
                    <FormGroup
                      controlId="formBasicText">
                      <FormControl
                        type="text"
                        value={this.state.value}
                        placeholder="Your Name"
                        id='name'
                        onChange={() => this.handleName}/>
                    </FormGroup>

                    <FormGroup
                      controlId="formBasicText">

                      <FormControl
                        type="text"
                        value={this.state.value}
                        placeholder="Your Email"
                        id='email'
                        onChange={() => this.handleEmail}/>
                    </FormGroup>

                    <FormGroup
                      controlId="formBasicText">

                      <FormControl
                        type="text"
                        value={this.state.value}
                        placeholder="Your Phone Number"
                        id='phone'
                        onChange={() => this.handlePhone}/>
                    </FormGroup>


                  </form>
                </div>
              </Col>
              <Col xs={12} sm={7}>
                <div className="message-input">
                  <form id='message-reset'>
                    <FormGroup controlId="formControlsTextarea">

                      <FormControl componentClass="textarea"
                        placeholder="Your Message"
                        id='message'
                        className='textarea-input'/>
                    </FormGroup>
                  </form>
                </div>
              </Col>
            </Row>
          </Grid>
        </div>

          <button type="button"
            class="btn btn-primary"
            className='submit-button'
            id='contact-reset'
            onClick={(e)=> this.handleSubmit (e)}>Submit</button>
      </div>
    )
  }
}

export default Contact;
