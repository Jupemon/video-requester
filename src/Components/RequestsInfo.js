import React, { Component } from 'react';
import {Popover, Overlay, Button, OverlayTrigger, Card} from 'react-bootstrap';

const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Max video requests</Popover.Title>
      <Popover.Content>
      <input type="text" />
      <Button>Save</Button>
      </Popover.Content>
    </Popover>
  );
class RequestInfo extends Component {
    state = {  }
    render() { 
        return ( <div>
            <Card style={{ width: '22rem', margin : "auto", marginTop:"25px" }}>
  <Card.Body>
    <Card.Title><h1>Video Requests</h1></Card.Title>
    <Card.Text>
      Here you will get all your video requests which you have 
    </Card.Text>
    <Card.Text>
      The price for a custom clip is : 5e
    </Card.Text>
    <div><h2>{this.props.unfinishedRequests}/20 unfilled video requests</h2></div>
  </Card.Body>
</Card>
        </div> );
    }
}
 
export default RequestInfo;
