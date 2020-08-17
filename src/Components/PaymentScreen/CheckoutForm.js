import React from 'react';
import {ElementsConsumer, CardElement} from '@stripe/react-stripe-js';

import CardSection from './CardSection';
import { Button, Form } from 'react-bootstrap';

class CheckoutForm extends React.Component {

  state={

    // form data
    name : "",
    email : "",

    payment_intent : false,
    errorMessage : "",
    paymentHandled : false,
    loading : false
  }

  handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    this.setState({loading : true})

    const {stripe, elements, clientSecret} = this.props
    const { name, email } = this.state
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: name,
          email : email
        },
      }
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log("something went wrong with this whole thing")
      console.log(result.error.message);
      this.setState({paymentHandled : true, errorMessage : "something went wrong", loading : false})
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
        this.setState({paymentHandled : true, loading : false, payment_intent : result.paymentIntent.id})
        console.log(result.paymentIntent, "payment intent")
        console.log("payment succeeded")
      }
    }
  };

  render() {
    const {errorMessage, paymentHandled} = this.state
    if (paymentHandled) {
      if (errorMessage.length > 0) {
        return (<div>
          <p>Something went wrong with payment</p>
          <Button variant="danger" onClick={() => {this.props.togglePaymentScreen()}}>Oops!</Button>
        </div>)
      }
      else {
        return (<div>
          <p>Payment Succeeded!</p>
          <Button variant="success" onClick={() => {this.props.togglePaymentScreen(this.state.payment_intent)}}>Ok!</Button>
        </div>)
      }
    }
    else {
      return (
      <Form onSubmit={this.handleSubmit}>
        <CardSection />
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control value={this.state.email} onChange={(e) => {this.setState({email : e.currentTarget.value})}} type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            Email is used for refunding payments.
          </Form.Text>
        </Form.Group>
      
        <Form.Group controlId="formFullName">
          <Form.Label>Full name</Form.Label>
          <Form.Control value={this.state.name} onChange={(e) => {this.setState({name : e.currentTarget.value})}} type="text" placeholder="Full name" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>)
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

/*      return (
        <form onSubmit={this.handleSubmit}>
          <CardSection />

          <p>Full Name :</p><input type="text"/>
          <p>Email :</p><input type="text"/>
          <button disabled={!this.props.stripe}>Confirm order</button>
        </form>
      ); */