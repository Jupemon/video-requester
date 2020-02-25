import React, { Component } from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';

class CreateRequest extends Component {
    state = { 
        loading : false,
        title : "",
        description : "",
        errorMessage : ""
     }

     createVideoRequest = (title, description) => {
       fetch("http://localhost:3001/createrequest", {
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
           
           
         }
         else {
           console.log("something went wrong with requesting video")
           this.setState({errorMessage : "Connection error"})
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
    <Button onClick={() => {this.createVideoRequest(title, description)}} disabled={this.state.loading} variant="primary">{this.state.loading ? <Spinner animation="border" /> : "Request video"}</Button>
    <p style={{float:"right", color:"red"}}>{this.state.errorMessage}</p>
  </Card.Body>
</Card>
        </div> );
    }
}
 
export default CreateRequest;