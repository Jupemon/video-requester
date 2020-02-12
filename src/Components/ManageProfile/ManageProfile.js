import React, { Component } from 'react';
import {Button, Container, Col, Row, Jumbotron, Card} from 'react-bootstrap/';
import './ManageProfile.css';
import Youtube from '../Youtube';
import VideoRequest from '../VideoRequest';
import RequestInfo from '../RequestsInfo';

class ManageProfile extends Component {
    state = { 
        amountOfBoxes : [],
        renderedBoxes : ["xb3YBX0_IN4", ],
        data : false
     }


     testFunc = () => {
         console.log("ire")
         let renderedBoxes = this.state.renderedBoxes;
         renderedBoxes.push("GhHBrlCMJBI")
         this.setState({renderedBoxes : renderedBoxes})
     }

    componentDidMount() { // gets user data from database

        const data = {
            userName : "Jupemon",
            videoRequests : [{
              title : "Create a promotial video",
              description : "I own a business and need some promotial video for it",
              videoId : "nWoQ9SZBhWs",
            },
            {
              title: "I need a cat video",
              description : "I own a cat clinic and need promotial video for it",
              videoId : ""
            },            {
              title: "I want a funny video",
              description : "I dont care what you film, make me a funny video",
              videoId : ""
            },            {
              title: "Green screen effect",
              description : "I am a movie maker, i need a green screen explosion effect",
              videoId : ""
            },            {
              title: "Restoraunt promotial video",
              description : "I own a restoraunt, can you create a video about it",
              videoId : ""
            },            {
              title: "I own a cafee place, please create promo for it",
              description : "I own a caffe place and need promotial video for it",
              videoId : ""
            },]
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
    Basic info about {data.userName}
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
  <RequestInfo />
  </Col>
  {this.state.data.videoRequests.map(vidReq => {
      return (<Col> <VideoRequest description={vidReq.description} title={vidReq.title} videoId={vidReq.videoId}/></Col>)
  })}
  </Row>
</Container>
        </div> );
    }
}
 
export default ManageProfile;