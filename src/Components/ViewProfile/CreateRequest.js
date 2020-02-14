import React, { Component } from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';

class CreateRequest extends Component {
    state = { 
        loadingRequest : false
     }

     validateVideoRequest = () => { // prevents special characters from being added, 

     }

    render() { 
        return ( <div>
            <Card style={{ width: '22rem', margin : "auto", marginTop:"25px"}}>
  <Card.Body>
    <Card.Title><input type="text" placeholder="Title" maxLength="35"/></Card.Title>
    <Card.Text>
    <textarea maxLength="854" style={{resize : "none"}} rows="14.5" cols="40" placeholder="Write a description of the video you want"/>
    </Card.Text>
    <Button variant="primary">{this.state.loadingRequest ? <Spinner animation="border" /> : "Request video"}</Button>
  </Card.Body>
</Card>
        </div> );
    }
}
 
export default CreateRequest;