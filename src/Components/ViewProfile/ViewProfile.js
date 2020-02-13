import React, { Component } from 'react';
import { Jumbotron, Spinner, Row, Col, Container } from 'react-bootstrap';
import RequestInfo from '../RequestsInfo';
import VideoRequest from '../VideoRequest';

class ViewProfile extends Component {
    state = { 
        data : false,
        loadingProfile : false,
        profileFound : false
     }


     videoRequestLoaded = () => {
       console.log("howd")
     }

    componentDidMount () {

      console.log("mounting", window.location.hash); // does a get requets with hash to see if there is 

        const data = { // placeholder data, the real data will be from database
            userName : "jupemon",
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
        if ("#" + data.userName === window.location.hash) {
          console.log("user found")
          this.setState({profileFound : true})
        }
        this.setState({data : data})
    }
    render() { 
        const { loadingProfile, data, profileFound } = this.state
        if (loadingProfile) {
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
        else if (!profileFound) {
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
                    return (<Col> <VideoRequest viewOnly={true} checkDublicateVideoUrl={this.checkDublicateVideoUrl} videoRequestLoaded={this.videoRequestLoaded} countUnfinishedRequests={this.countUnfinishedRequests} description={vidReq.description} title={vidReq.title} videoId={vidReq.videoId}/></Col>)
                })}
                </Row>
              </Container>
                      </div> );
        }
    }
}
 
export default ViewProfile;