import React, { Component } from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';

class CreateRequest extends Component {
    state = { 
        title : "",
        description : ""
     }

     validateVideoRequest = () => { // prevents special characters from being added, 

     }

    render() { 
        const {title, description} = this.state
        return ( <div>
            <Card style={{ width: '22rem', margin : "auto", marginTop:"25px"}}>
  <Card.Body>
    <Card.Title><input disabled={this.props.creatingVideoRequest} onChange={(e) => {this.setState({title : e.currentTarget.value})}} value={title} type="text" placeholder="Title" maxLength="35"/></Card.Title>
    <Card.Text>
    <textarea disabled={this.props.creatingVideoRequest} onChange={(e) => {this.setState({description : e.currentTarget.value})}} value={description} maxLength="854" style={{resize : "none"}} rows="14.5" cols="40" placeholder="Write a description of the video you want"/>
    </Card.Text>
    <Button onClick={() => {this.props.createVideoRequest(title, description)}} disabled={this.props.creatingVideoRequest} variant="primary">{this.props.creatingVideoRequest ? <Spinner animation="border" /> : "Request video"}</Button>
  </Card.Body>
</Card>
        </div> );
    }
}
 
export default CreateRequest;