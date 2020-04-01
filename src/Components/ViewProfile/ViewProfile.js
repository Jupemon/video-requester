import React, { Component } from 'react';
import { Jumbotron, Spinner, Row, Col, Container } from 'react-bootstrap';
import RequestInfo from '../SharedComponents/RequestsInfo';
import VideoRequest from '../VideoRequest/VideoRequest';
import CreateRequest from './CreateRequest';

class ViewProfile extends Component {
    state = { 
        renderedRequests : [],
        requestPrice : "Free",
        totalRequests : 25,
        unfinishedRequests : 0,
        creatingVideoRequest : false,
        data : false,
        userId : "",
        loadingData : true,
     }

     createVideoRequest = (title, description) => { // If video request is added to db, create one locally on the frontend as well with this
       const data = this.state.data
       const vr = {
         title : title,
         description : description,
       }
       data.videoRequests.push(vr)
       this.setState({data : data})
       
       console.log("send video request to backend ")
       console.log(title, description)
     }

     getProfile = (userId) => {
      fetch(`https://requstenator-server.herokuapp.com/getprofile/${userId}`).then(r => {
        if (r.status === 200) {
          r.json().then(data => {
            this.setState({data : data, userId : userId })
          })
        }
        else { // profile not found
          console.log("something went wrong")
          
        }
        this.setState({loadingData : false})
      })
    }

    youtubeLoaded = () => { // fires once youtube script is loaded
      console.log("youtube iframe api loaded");
      const userId = window.location.hash.slice(1)
      this.getProfile(userId) // after youtube script is loaded load profile
    }

    loadYoutube = () => { // loads youtube script

      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';

      window.onYouTubeIframeAPIReady = this.youtubeLoaded; // once youtube video is done loading call loadvideo function

      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    componentDidMount () {   
      this.loadYoutube()
      
    }

    render() { 
        const { loadingData, data } = this.state
        if (loadingData && !data) {
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
        }
        if (!data && !loadingData) {
          return (<div>
            <Jumbotron>
  <div className="headline">
  <h1>Not found</h1>
  <p>
    Profile with that name was not found
  </p>
  </div>
</Jumbotron>
            </div>)
        }
        else {
            const { data } = this.state
            return ( <div>
              <Container fluid>
                <Row>
                <Col>
                <Jumbotron>
                <div style={{color:"purple", textAlign:"center"}}>
                <h1>{data.userName}</h1>
                <p>
                  give youtube video ideas to {data.userName}
                </p>
                </div>
              </Jumbotron>
              </Col>
                </Row>
                <Row>
                <Col>
                <RequestInfo requestsAmount={data.requestsAmount} unfulfilledRequestsAmount={data.unfilledRequests} videoPrice={{price : data.videoPrice, currency: data.currency}}/>
                </Col>

                {this.state.data.videoRequests.map(vidReq => {
                    return (<Col> <VideoRequest componentRendered={this.componentRendered} viewOnly={true} description={vidReq.description} title={vidReq.title} videoId={vidReq.video_id}/></Col>)
                })}
                <Col>
                <CreateRequest createVideoRequest={this.createVideoRequest} userId={this.state.userId}/>
                </Col>
                </Row>
              </Container>
                      </div> );
        }
    }
}
 
export default ViewProfile;