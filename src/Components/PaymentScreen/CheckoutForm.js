import React from 'react';
import {ElementsConsumer, CardElement} from '@stripe/react-stripe-js';

import CardSection from './CardSection';
import { InputGroup, Form, Col, Button } from 'react-bootstrap';

class CheckoutForm extends React.Component {
  state = {
    validated : false,
    errorMessage : "Something went wrong",
    paymentHandled : false,

      // form data
    firstName : "",
    lastName : "",
    email : "",
    city : "",
    country : "",
    billingAddress : "",
    state : "",
    postalCode : ""
  }
  handleSubmit = async (event) => {

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    else {
      console.log(form, "this is form yo")
      const {firstName, lastName, email, city, country, billingAddress, state, postalCode} = this.state
      const formData = {
        firstName, lastName, email, city, country, billingAddress, state, postalCode
      }

      const {stripe, elements, clientSecret, togglePaymentScreen} = this.props

      const result = await stripe.confirmCardPayment(`{${clientSecret}}`, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: firstName +" "+ lastName,
            city,
            country,
            billingAddress,
            state,
            postalCode
          },
        }
      });
  
      if (result.error) {
        // Show error to your customer (e.g., insufficient funds)
        console.log(result.error.message);
        this.setState({errorMessage : "something went wrong"})
      } else {
        // The payment has been processed!
        if (result.paymentIntent.status === 'succeeded') {
          // Show a success message to your customer
          // There's a risk of the customer closing the window before callback
          // execution. Set up a webhook or plugin to listen for the
          // payment_intent.succeeded event that handles any business critical
          // post-payment actions.
        }
      }

    }
    this.setState({validated : true})
    event.preventDefault();
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    
    /*
    const {stripe, elements, clientSecret,} = this.props

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmCardPayment(`{${clientSecret}}`, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Jenny Rosen',
        },
      }
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
      this.setState({errorMessage : "something went wrong"})
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
    */
  };

  render() {
    const { errorMessage, validated } = this.state

    if (errorMessage.length > 0 && !validated) {
      return (<div>
        <div>{errorMessage}</div>
        <Button onClick={() => {this.props.togglePaymentScreen()}} variant="danger">Ok!</Button>
      </div>)
    }

    if (validated) {
      return (<div>
        Payment succesfull
        <Button variant="success">Ok!</Button>
      </div>)
    }
    else {
      return (
        <Form style={{backgroundColor:"white"}} noValidate validated={validated} onSubmit={this.handleSubmit}>
          <Form.Row>
            <Form.Group>
              <CardSection />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>First name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="First name"
                onChange = {(e) => {this.setState({firstName : e.currentTarget.value})}}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Last name"
                onChange = {(e) => {this.setState({lastName : e.currentTarget.value})}}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>Email</Form.Label>
              <InputGroup>
                <Form.Control
                  onChange = {(e) => {this.setState({email : e.currentTarget.value})}}
                  type="email"
                  placeholder="Email"
                  aria-describedby="inputGroupPrepend"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Not a valid email.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="6" controlId="validationCustom03">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" placeholder="City" onChange = {(e) => {this.setState({city : e.currentTarget.value})}} required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid city.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom03">
              <Form.Label>Country</Form.Label>
              <Form.Control  type="text" placeholder="Country" onChange = {(e) => {this.setState({country : e.currentTarget.value})}} required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Country.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom03">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" placeholder="Adress" onChange = {(e) => {this.setState({billingAddress : e.currentTarget.value})}} required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid adress.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom04">
              <Form.Label>State</Form.Label>
              <Form.Control type="text" placeholder="State" onChange = {(e) => {this.setState({state : e.currentTarget.value})}}/>
              <Form.Control.Feedback type="invalid">
                Please provide a valid state.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom05">
              <Form.Label>Postal code</Form.Label>
              <Form.Control type="text" placeholder="Postal code" onChange = {(e) => {this.setState({postalCode : e.currentTarget.value})}} required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid postal code.
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Group>
            <Form.Check
              required
              label="Agree to terms and conditions"
              feedback="You must agree before submitting."
            />
          </Form.Group>
          
          <Button type="submit">Submit form</Button>
        </Form>
      );
    }
    
  }
}

export default function InjectedCheckoutForm(props) {
  return (
    <ElementsConsumer>
      {({stripe, elements}) => (
        <CheckoutForm  stripe={stripe} elements={elements} clientSecret={props.clientSecret} togglePaymentScreen={props.togglePaymentScreen}/>
      )}
    </ElementsConsumer>
  );
}



/*    return (
      <Form onSubmit={this.handleSubmit}>
      <form onSubmit={this.handleSubmit}>
      <input type="text"/>
        <CardSection />
        <button disabled={!this.props.stripe}>Confirm order</button>
      </form>
      </Form>
    ); */