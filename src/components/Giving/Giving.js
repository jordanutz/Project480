import React, {Component} from 'react';
import {Popover, Tooltip, Modal, OverlayTrigger, Button, Jumbotron, Grid, Row, Col, Image} from 'react-bootstrap';
import './Giving.css';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from '../CheckoutForm/CheckoutForm';


class Giving extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false,
      amount: ''
    }
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleAmount = this.handleAmount.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  handleAmount (e) {
    this.setState ({
      amount: e.target.value
    })
  }

  render () {

    return (

      <div>
        <div className="background-giving">
          <div className="giving-container">
            <h1>Donate</h1>
              <Button className="giving-button" onClick={this.handleShow}>
               Give
             </Button>
            </div>
          </div>

        <div className="giving-about">
          <h3>Our Giving Platform</h3>
          <div className="givingabout-text">
            <p>In the coming weeks, we will be transitioning to our new giving platform, Stripe. This will make your online giving easier,
              faster, and more secure than ever. If you have any questions or concerns, please email us at give@crossing480.info</p>
          </div>
        </div>

        <div className="giving-row">
            <Grid>
              <Row className='row-giving'>
                <Col md={6} mdPush={6} className='givingphoto-column'>
                  <Image src='https://78.media.tumblr.com/e7e607b468dbba80a477c7c19961ac7c/tumblr_ow53mvcMFT1sfxb96o1_500.gif' className='giving-photo' rounded alt="computer"/>
                </Col>
                <Col md={6} mdPull={6} className='givinginfo-column'>
                  <div className="giving-max">
                    <h4>Alternatives</h4>
                    <div className='givinginfo-text'>
                      <p>You can also give in person during the weekend worship experience or you can mail a gift to our main offices.
                        Please send any mailed gifts to the following address:</p><br/>
                      <div className="givinginfo-address">
                        <p>480 Curry Avenue, Lexington, KY 40508</p> <br/>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Grid>
          </div>




       <Modal show={this.state.show} onHide={this.handleClose}>
         <Modal.Header closeButton>
           <Modal.Title></Modal.Title>
         </Modal.Header>
         <Modal.Body>
          <div className='giving-module'>
            <h2>Give</h2>
            <input onChange={this.handleAmount} placeholder="Amount" className="amount-input"/><br/>

              <StripeProvider
                apiKey="pk_test_HUVyDEtcaycDqoOYknSNmnBb"


                >
                <div className="example">
                  <Elements>
                    <CheckoutForm amount={this.state.amount}/>
                  </Elements>
                </div>
              </StripeProvider>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleClose}>Close</Button>
        </Modal.Footer>
     </Modal>

   </div>
    )
  }
}

export default Giving;
