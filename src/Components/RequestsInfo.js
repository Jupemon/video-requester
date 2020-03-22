import React, { Component, useState, useRef } from 'react';
import {Tooltip, Button, Overlay, Card} from 'react-bootstrap';

function renderTooltip(props) {
  if (5===5) {
    console.log(props, "here you go props you")
    return <Tooltip >Max amount of requests reached!</Tooltip>
  }
  else if(5==3) {
    return <Tooltip ></Tooltip>
  }
 else {
  return <Tooltip>Max amount of requests is 20!</Tooltip>;
 }
}

function Price(props) {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  return (
    <>
      <Button ref={target} onMouseLeave={() => setShow(!show)} onMouseEnter={() => setShow(!show)}>
        {props.children}
      </Button>
      <Overlay target={target.current} show={show} placement="right">
        {props => (
          <Tooltip id="overlay-example" {...props}>
            Stripe account has not been added!
          </Tooltip>
        )}
      </Overlay>
    </>
  );
}

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
      The price for a video is : <Price>{this.props.requestPrice ? this.props.requestPrice : "Free"}</Price>
    </Card.Text>
    <div><h2>{unfulfilledRequestsAmount}/{requestsAmount} unfilled video requests</h2></div>
  </Card.Body>
</Card>
        </div> );
    }
}
 
export default RequestInfo;
