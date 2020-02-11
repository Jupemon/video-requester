import React, { Component } from 'react';
import {Card, Button} from 'react-bootstrap';
import Youtube from './Youtube.js'

class VideoRequest extends Component {
    state = {  }
    render() { 
        return ( <div>
            <Card bg="success" style={{ width: '22rem', margin : "auto"}}>
  <Youtube id={"l6e_8s6uBWw"}/>
  <Card.Body>
    <Card.Title>Make a dancing video</Card.Title>
    <Card.Text>
      Jump up and down and dance around
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
</Card>
        </div> );
    }
}
 
export default VideoRequest;