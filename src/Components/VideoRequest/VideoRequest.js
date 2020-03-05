import React, { Component } from 'react';
import {Card, Button} from 'react-bootstrap';
import Youtube from './Youtube.js'
import Info from './Info.js';
import './VideoRequest.css'
import Loading from './Loading.js';

class VideoRequest extends Component {
  constructor(props) {
    super(props)
    console.log("component mount is happening")
    this.state = { 
      style : {opacity : 0.0, transition : "1s"},
      requestFulfilled : false,
      loading : false,
      videoId : "",
      linkInfo : "Insert a youtube video link here",
     }

    }
     componentDidMount() { // check if component is view only & check if request already fulfilled
       if (this.props.videoId) {
         this.setState({videoId : this.props.videoId, requestFulfilled : true})
       }
       
       if (this.props.viewOnly) { // checks if you are fulfilling or viewing video requests
        console.log("view only component")
       }
     }

     checkValidUrl = (ytlink) => { // checks if youtube link is valid, returns the video id if it is
      var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      var match = ytlink.match(regExp);
      if (match && match[2].length === 11) {
      return match[2];
      } else {
      return false
      }
     }

     sendData = (videoId) => { // Send a post request to backend
      let { linkInfo } = this.state.linkInfo;
      this.setState({loading : true})
      console.log("sending request")
      fetch("http://localhost:3001/fulfillrequest", {
        method : "POST",
        headers : {
          'Content-Type' : "application/json"
        },
        body : JSON.stringify({
          videoId : videoId,
          token_id : window.localStorage.getItem("token_id"),
          requestId : this.props.requestId
          
        })
      }).then(res => {
        if (res.status === 201) { // data was accepted, world peace is achieved
          res.json().then(data => {
            this.fulfillRequest(videoId)
          })
        }
        else {
          console.log("something went wrong with the request")
          linkInfo = "Something went wrong"
          
        }
      })
      .catch(er => {
        console.log(er)
        linkInfo = "Unable to connect to server"
        
      })
      .finally((d) => {
        this.setState({loading : false, linkInfo})
        console.log(d, "final data")
      })
     }

     loadVideoUrl = (videoUrl) => {  // validate youtube video URL
      const isValid = this.checkValidUrl(videoUrl) // contains false if not valid url, contains the valid url otherwise
      if (isValid) {
        this.sendData(isValid)
        
      }
      else {
        this.setState({linkInfo : "not valid youtube link"})
      }

    }

    fulfillRequest = (videoId) => { // load youtube video & called dataRequest is ok
      let style = this.state.style
      style = {opacity : 1, transition : "1s"}
      this.setState({requestFulfilled : true, videoId : videoId, loading : false, style : style})

    }

    render() { 
        return ( <div style={this.state.style} className="video-request">
            <Card bg={this.state.requestFulfilled ? "success" : "warning"} style={{ width: '22rem', margin : "auto", marginTop:"25px"}}>
            {this.state.loading ? <Loading /> : this.state.requestFulfilled ? <Youtube fulfillRequest={this.fulfillRequest} id={this.state.videoId}/> : this.props.viewOnly? <Info />: <div style={{width:"350px", height:"360px", backgroundColor:"#ffc107"}}>
  <div style={{position:"absolute", right:"80px", top:"175px"}}>
  <div><input style={{width:"200px"}} onChange={(e) => {this.loadVideoUrl(e.currentTarget.value)}} type="text"/></div>
  <p>{this.state.linkInfo}</p>
  </div>
  </div>}

  <Card.Body>
    <Card.Title>{this.props.title}</Card.Title>
    <Card.Text>
      {this.props.description}
    </Card.Text>
  </Card.Body>
</Card>
        </div> );
    }
}
 
export default VideoRequest;