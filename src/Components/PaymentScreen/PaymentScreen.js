// Opens up when user clicks on create videorequest button
import CheckoutForm from './CheckoutForm'
import React, { Component } from 'react';

class PaymentScreen extends Component {
    state = {  }
    render() { 
        return ( <div style={{position : "fixed", right : "0%", left : "0%", width:"100%", height:"100%", backgroundColor: "#e9ecef"}}>
        <CheckoutForm />
        </div> );
    }
}
 
export default PaymentScreen;