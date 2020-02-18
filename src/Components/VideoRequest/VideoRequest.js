import React, { Component } from 'react';
import {Card, Button} from 'react-bootstrap';
import Youtube from './Youtube.js'
import Info from './Info.js';

class VideoRequest extends Component {
    state = { 
      loadingData : true,
      videoLoaded : false,
      videoId : "",
      linkInfo : "Insert a youtube video link here",
     }


     componentDidMount() {
       if (this.props.videoId.length > 0) { // checks if video request is already fulfilled
        console.log("video id exists")
         this.setState({videoId : this.props.videoId, videoLoaded : true})
       }
       
       if (this.props.viewOnly) { // checks if you are managin or viewing video requests
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

     fulfillRequest = () => { // once valid url send a requst to backend
      console.log("sending request")
      console.log(this.props.userName)
      fetch("http://localhost:3001/fulfillrequest", {
        method : "POST",
        headers : {
          'Content-Type' : "application/json"
        },
        body : JSON.stringify({
          videoUrl : this.state.videoId,
          username : this.props.userName
          
        })
      }).then(res => {
        if (res.status === 200) {
          res.json().then(data => {
            console.log("data", data)
          })
        }
        else {
          console.log("something went wrong with the request")
        }
      })
     }

     loadVideoUrl = (videoUrl) => {  // validate url
      const isValid = this.checkValidUrl(videoUrl)
      if (isValid) {
        this.loadVideo(isValid)
      }
      else {
        this.setState({linkInfo : "not valid youtube link"})
      }

    }

    loadVideo = (videoId) => { // load youtube video from videourl
      console.log(videoId)
      this.setState({videoId : videoId, videoLoaded : true,})
      this.props.countUnfinishedRequests()
      console.log("loading video")
    }

    render() { 
        return ( <div>
            <Card bg={this.state.videoLoaded ? "success" : "warning"} style={{ width: '22rem', margin : "auto", marginTop:"25px"}}>
            {this.state.videoLoaded ? <Youtube videoRequestLoaded={this.props.videoRequestLoaded} id={this.state.videoId}/> : this.props.viewOnly? <Info />: this.state.loadingData ? <div style={{width:"350px", height:"360px", backgroundColor:"#ffc107"}}>
  <div style={{position:"absolute", right:"80px", top:"175px"}}>
  <div>Loading</div>
  </div>
  </div>: <div style={{width:"350px", height:"360px", backgroundColor:"#ffc107"}}>
  <div style={{position:"absolute", right:"80px", top:"175px"}}>
  <div><input style={{width:"200px"}} onChange={(e) => {this.loadVideoUrl(e.currentTarget.value)}} type="text"/></div>
  <p>{this.state.linkInfo}</p>
  <button onClick={()=> {this.fulfillRequest()}}>Testing button</button>
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