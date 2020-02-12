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
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    <div>Hello world</div>
  </Card.Body>
</Card>
        </div> );
    }
}
 
export default RequestInfo;
