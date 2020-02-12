import React, { Component } from 'react';
import {Card, Button} from 'react-bootstrap';
import Youtube from './Youtube.js'

class VideoRequest extends Component {
    state = { 
      videoLoaded : false,
      videoId : "",
      linkInfo : "Insert a youtube video link here",
     }


     componentDidMount() {
       if (this.props.videoId.length > 0) { // checks if video request is already fulfilled
        console.log("video id exists")
         this.setState({videoId : this.props.videoId, videoLoaded : true})
       }
     }

     checkValidUrl = (ytlink) => { // checks if youtube link is valid, returns the video id if it is
      var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      var match = ytlink.match(regExp);
      if (match && match[2].length == 11) {
      return match[2];
      } else {
      return false
      }
     }

     loadVideoUrl = (videoUrl) => { 
       // checks if video url is valid and loads video if it is
      this.checkValidUrl(videoUrl) ? this.loadVideo(this.checkValidUrl(videoUrl)) : this.setState({linkInfo : "not valid youtube link"})

      // check if video with the same url already exists
      this.props.checkDublicateVideoUrl()

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
            {this.state.videoLoaded ? <Youtube videoRequestLoaded={this.props.videoRequestLoaded} id={this.state.videoId}/> :   <div style={{width:"350px", height:"360px", backgroundColor:"#ffc107"}}>
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