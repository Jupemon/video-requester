// Opens up when user clicks on create videorequest button
import CheckoutForm from './CheckoutForm'
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class PaymentScreen extends Component {
    state = { 
        clientSecret : false
     }
     
    componentDidMount() {
        fetch("https://requstenator-server.herokuapp.com/handlepayment", {
            method : "POST"
        }).then(r => {
            r.json().then(d => {
                this.setState({clientSecret : d.clientSecret})
            })
        })
        .catch(e => {
            console.log("something went wrong with handeling payment")
        })
        
    }
    render() { 
        const {clientSecret} = this.state
        if (!clientSecret) {
            return <div>Loading ClientSecret for payments</div>
        }
        return ( <div style={{position : "fixed", top:"0px", right : "0%", left : "0%", width:"100%", height:"100%", backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
        <CheckoutForm clientSecret={clientSecret} togglePaymentScreen={this.props.togglePaymentScreen}/>
        </div> );
    }
}
 
export default PaymentScreen;