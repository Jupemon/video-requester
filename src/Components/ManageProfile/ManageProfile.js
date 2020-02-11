import React, { Component } from 'react';
import {Button, Container, Col, Row, Jumbotron, Card} from 'react-bootstrap/';
import './ManageProfile.css';
import Youtube from '../Youtube';
import VideoRequest from '../VideoRequest';

class ManageProfile extends Component {
    state = { 
        amountOfBoxes : [],
        renderedBoxes : ["242"],
        data : false
     }


     testFunc = () => {
         console.log("ire")
         let renderedBoxes = this.state.renderedBoxes;
         renderedBoxes.push("hom")
         this.setState({renderedBoxes : renderedBoxes})
     }

    componentDidMount() { // gets user data from database

        const data = {
            userName : "Jupemon",
            videoRequests : ["please make a video of you dancing in a santa costume", "Make a video of your hopping"],
            fulfilledRequests : [{
                request : "please hop around", videoUrl : "Https.yourube.aeiothaeoi"
            }]
        } // data which is gotten from database
        this.setState({data : data})
    }

    render() { 
        const data = this.state.data
        if (!data) {
            return (<div>
            Loading data...
            </div>)
        } // Does a get request to get the profile, allows managing the profile
        return ( <div>
<Container fluid>
  <Row>
  <Col>
  <Jumbotron>
  <div className="headline">
  <h1>{data.userName}</h1>
  <p>
    Basic info about jupemon
  </p>
  <p>
    <Button onClick={() => {this.testFunc()}} variant="info">Learn more</Button>
  </p>
  </div>
</Jumbotron>
</Col>
  </Row>
  <Row>
  <Col>
  <Jumbotron>
  <h1>Video Requests</h1>
  <p>Max video requests</p>
  <Button>5/25</Button>
</Jumbotron>
  </Col>
  {this.state.renderedBoxes.map(box => {
      return (<Col> <VideoRequest /></Col>)
  })}
  </Row>
</Container>
        </div> );
    }
}
 
export default ManageProfile;