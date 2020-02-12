import React, { Component } from 'react';
import {Button, Container, Col, Row, Jumbotron, Card, Spinner} from 'react-bootstrap/';
import './ManageProfile.css';
import Youtube from '../Youtube';
import VideoRequest from '../VideoRequest';
import RequestInfo from '../RequestsInfo';

class ManageProfile extends Component {
    state = {
        loadingContent : true,
        loadingIndex : 0,
        unfinishedRequests : 0,
        renderedVideoRequests : [],
        data : false
     }


     testFunc = () => {
         console.log("ire")
         let renderedBoxes = this.state.renderedBoxes;
         renderedBoxes.push("GhHBrlCMJBI")
         this.setState({renderedBoxes : renderedBoxes})
     }

     countUnfinishedRequests = () => { // counts how many video requests are unfulfilled from data
      const videoRequests =  this.state.data.videoRequests
      var count = 0;
      for(var i = 0; i < videoRequests.length; ++i){
        if(!videoRequests[i].videoId.length > 0)
        count++;
      }
      this.setState({unfinishedRequests : count})
     }

     videoRequestLoaded = () => { // fires once an video request component has been fully loaded
       console.log("component loaded, render the next") // render the next component
       let loadingIndex = this.state.loadingIndex;
       const videoRequests = this.state.data.videoRequests
       let renderedVideoRequests =  this.state.renderedVideoRequests;

       if (videoRequests[loadingIndex] !== undefined) {
        renderedVideoRequests.push(videoRequests[loadingIndex])
        loadingIndex++;
       }

       this.setState({renderedVideoRequests, loadingIndex})

     }

    checkDublicateVideoUrl = (vUrl) => { // called by videorequest component, checks if videourl with that name already exists
      //const videoRequests = this.state.data.videoRequests
      console.log("checks dublicates")
    }


    youtubeLoaded = () => {
      console.log("youtube iframe api loaded");
      this.setState({loadingContent : false})
    }

    componentDidMount() { // gets user data from database

        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
    
        window.onYouTubeIframeAPIReady = this.youtubeLoaded; // once youtube video is done loading call loadvideo function

        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        const data = { // placeholder data, the real data will be from database
            userName : "Jupemon",
            videoRequests : [{
              title : "Create a promotial video",
              description : "I own a business and need some promotial video for it",
              videoId : "nWoQ9SZBhWs",
            },
            {
              title: "I need a cat video",
              description : "I own a cat clinic and need promotial video for it",
              videoId : "-5tHiZACxbI"
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
        let renderedVideoRequests = this.state.renderedVideoRequests
        renderedVideoRequests.push(data.videoRequests[0])
        this.setState({data : data, renderedVideoRequests})
    }

    render() { 
        const data = this.state.data
        if (this.state.loadingContent) {
            return (<div>
            <Jumbotron>
  <div className="headline">
  <h1>Loading...</h1>
  <p>
    loading info...
  </p>
  </div>
</Jumbotron>
<div style={{paddingLeft:"50%", width:"100%"}}><Spinner animation="border" /></div>
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
  </div>
</Jumbotron>
</Col>
  </Row>
  <Row>
  <Col>
  <RequestInfo unfinishedRequests={this.state.unfinishedRequests}/>
  </Col>
  {this.state.data.videoRequests.map(vidReq => {
      return (<Col> <VideoRequest checkDublicateVideoUrl={this.checkDublicateVideoUrl} videoRequestLoaded={this.videoRequestLoaded} countUnfinishedRequests={this.countUnfinishedRequests} description={vidReq.description} title={vidReq.title} videoId={vidReq.videoId}/></Col>)
  })}
  </Row>
</Container>
        </div> );
    }
}
 
export default ManageProfile;