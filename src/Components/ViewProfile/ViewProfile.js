import React, { Component } from 'react';
import { Jumbotron, Spinner, Row, Col, Container } from 'react-bootstrap';
import RequestInfo from '../RequestsInfo';
import VideoRequest from '../VideoRequest/VideoRequest';
import CreateRequest from './CreateRequest';

class ViewProfile extends Component {
    state = { 
        requestPrice : "Free",
        unfinishedRequests : 0,
        creatingVideoRequest : false,
        data : false,
        userId : "",
        loadingProfile : false,
        profileFound : false
     }

     createVideoRequest = (title, description) => { // creates another video request, called by createRequest component
       this.setState({creatingVideoRequest : true})
       console.log("send video request to backend ")
       console.log(title, description)
     }

     getProfile = (userId) => {
       console.log("am i happeninig?")
      fetch(`http://localhost:3001/getprofile/${userId}`).then(r => {
        if (r.status === 200) {
          r.json().then(data => {
            
            data = this.parseData(data)
            console.log("this was gotten", data)
            this.setState({data : data, profileFound : true, userId : userId})
          })
        }
        else { // profile not found
          console.log("something went wrong")
        }
      })
    }

    parseData = (arr) => { // parse received videorequests
      return arr.map(vr => {
        return JSON.parse(vr)
      })
    }

    componentDidMount () {
      const userId = window.location.hash.slice(1)
      console.log("mounting", userId); // does a get requets with hash to see if there is 
      this.getProfile(userId)
      
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
                <RequestInfo unfinishedRequests={this.state.unfinishedRequests} requestPrice={this.state.requestPrice}/>
                </Col>
                <Col>
                <CreateRequest userId={this.state.userId}/>
                </Col>
                {this.state.data.map(vidReq => {
                    return (<Col> <VideoRequest viewOnly={true} description={vidReq.description} title={vidReq.title} videoId={vidReq.videoId}/></Col>)
                })}
                </Row>
              </Container>
                      </div> );
        }
    }
}
 
export default ViewProfile;