import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import App from './App';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_DOEkIFRqbKXBqWg0ykobHYQP00nEaxN5cb");


ReactDOM.render(<Elements stripe={stripePromise}><App /></Elements>, document.getElementById('root'));


