import React, { Component } from 'react';
import {Tooltip, Button, OverlayTrigger, Card} from 'react-bootstrap';

function renderTooltip(props) {
  if (5===5) {
    return <Tooltip {...props}>Max amount of requests reached!</Tooltip>
  }
  else if(5==3) {
    return <Tooltip {...props}></Tooltip>
  }
  return <Tooltip {...props}>Max amount of requests is 20!</Tooltip>;
}

const Example = (props) => (
  <OverlayTrigger
    placement="right"
    delay={{ show: 250, hide: 400 }}
    overlay={renderTooltip}
  >
    <Button variant="danger">{props.children}</Button>
  </OverlayTrigger>
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
      The price for a video is : {this.props.requestPrice ? this.props.requestPrice : "Free"}
    </Card.Text>
    <Example><div><h2>{unfulfilledRequestsAmount}/{requestsAmount} unfilled video requests</h2></div></Example>
  </Card.Body>
</Card>
        </div> );
    }
}
 
export default RequestInfo;
