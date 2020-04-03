import React, { Component } from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';
import PaymentScreen from '../PaymentScreen/PaymentScreen';

class CreateRequest extends Component {
    state = { 
        requestToBeCreated : {
          title : "",
          description : ""
        },
        paymentScreen : false,
        loading : false,
        title : "",
        description : "",
        infoMessage : ""
     }


     togglePaymentScreen = (succeeded) => { // toggles payments screen, if input is true then payment was a success
      if (succeeded) {
        console.log("payment was a success, create a new video request")
        const { requestToBeCreated } = this.state
        this.createVideoRequest(requestToBeCreated.title, requestToBeCreated.description)
      }
      const paymentScreen = this.state.paymentScreen
      this.setState({paymentScreen : !paymentScreen})
    }

    startPaymentProcess = (title, description) => { // called when create request button is pressed, starts the creating process
      const requestToBeCreated = {
        title, description
      }
      this.setState({requestToBeCreated, paymentScreen : true})
    }

     createVideoRequest = (title, description) => {
       fetch("https://requstenator-server.herokuapp.com/createrequest", {
         method : "POST",
         headers : {
          'Content-Type': 'application/json'
         },
         body : JSON.stringify({
           user_id : this.props.userId,
           title : title,
           description : description
         })
       }).then(r => {
         if (r.status === 201) {
           console.log("created a new video request")
           this.setState({infoMessage : "Video requested"})
           this.props.createVideoRequest(title, description)
           
         }
         else {
           console.log("something went wrong with requesting video")
           this.setState({infoMessage : "Connection error"})
         }
       })
     }

    render() { 
        const {title, description} = this.state
        return ( <div>
            <Card style={{ width: '22rem', margin : "auto", marginTop:"25px"}}>
  <Card.Body>
    <Card.Title><input disabled={this.state.loading} onChange={(e) => {this.setState({title : e.currentTarget.value})}} value={title} type="text" placeholder="Title" maxLength="35"/></Card.Title>
    <Card.Text>
    <textarea disabled={this.state.loading} onChange={(e) => {this.setState({description : e.currentTarget.value})}} value={description} maxLength="854" style={{resize : "none"}} rows="14.5" cols="40" placeholder="Write a description of the video you want"/>
    </Card.Text>
    <Button onClick={() => {this.startPaymentProcess(title, description)}} disabled={this.state.loading} variant="primary">{this.state.loading ? <Spinner animation="border" /> : "Request video"}</Button>
    <p style={{float:"right", color:"red"}}>{this.state.errorMessage}</p>
  </Card.Body>
</Card>
 {this.state.paymentScreen ? <PaymentScreen videoPrice={{price : this.props.videoPrice.price, currency : this.props.videoPrice.currency}} requestToBeCreated={this.state.requestToBeCreated} togglePaymentScreen={this.togglePaymentScreen} createVideoRequest={this.createVideoRequest}/> : null}
        </div> );
    }
}
 
export default CreateRequest;

//this.createVideoRequest(title, description)}