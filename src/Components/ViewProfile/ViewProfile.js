import React, { Component } from 'react';
import { Jumbotron, Spinner, Row, Col, Container } from 'react-bootstrap';
import RequestInfo from '../RequestsInfo';
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
        loadingProfile : false,
        profileFound : false
     }

     createVideoRequest = (title, description) => { // If video request is added to db, create one locally on the frontend as well with this
       const data = this.state.data;
       const vr = {
         title : title,
         description : description,
       }
       data.push(vr)
       this.setState({data : data})
       
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


    componentRendered = () => { // called by every single rendered request component
      const renderedRequests = this.state.renderedRequests;
      const data = this.state.data
      renderedRequests.push(data[renderedRequests.length]) /////// NANANANANAAA
      this.setState({ renderedRequests })
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
                <RequestInfo totalRequests={this.state.totalRequests} unfinishedRequests={this.state.unfinishedRequests} requestPrice={this.state.requestPrice}/>
                </Col>

                {this.state.data.map(vidReq => {
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