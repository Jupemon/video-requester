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
    render() { const {unfulfilledRequestsAmount, fulfilledRequestsAmount, requestsAmount} = this.props
    console.log(unfulfilledRequestsAmount, fulfilledRequestsAmount, requestsAmount, "WATCH THESE")
        return ( <div>
            <Card style={{ width: '22rem', margin : "auto", marginTop:"25px" }}>
  <Card.Body>
    <Card.Title><h1>Video Requests</h1></Card.Title>
    <Card.Text>
      Here is the list of all recent video requests
    </Card.Text>
    <Card.Text>
      The price for a video is : {this.props.requestPrice}
    </Card.Text>
    <div><h2>{unfulfilledRequestsAmount}/{requestsAmount} unfilled video requests</h2></div>
  </Card.Body>
</Card>
        </div> );
    }
}
 
export default RequestInfo;
