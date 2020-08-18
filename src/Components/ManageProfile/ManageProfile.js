import React, { Component } from 'react';
import { Container, Col, Row, Jumbotron, Spinner } from 'react-bootstrap/';
import './ManageProfile.css';
import VideoRequest from '../VideoRequest/VideoRequest';
import RequestInfo from '../SharedComponents/RequestsInfo';
import EditProfile from './EditProfile';

class ManageProfile extends Component {
    state = {
        stripeAccount : false,
        loadingContent : true,
        loadingIndex : 0,
        unfinishedRequests : 0,
        data : false
     }

    youtubeLoaded = () => { // fires once youtube script is loaded
      console.log("youtube iframe api loaded");

      this.setState({loadingContent : false})
    }

    loadYoutube = () => { // loads youtube script

      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';

      window.onYouTubeIframeAPIReady = this.youtubeLoaded; // once youtube video is done loading call loadvideo function

      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    parseVideoRequests = (videoRequests) => {
      return videoRequests.map(vr => {
        return JSON.parse(vr)
      })
    }


    checkStripeIntegration = (string) => { // returns true if stripe accout has been integrated
      if (string.includes("acct_")) {
        return true
      }
      else {
        return false
      }
    }

    rejectRequest = (request_id) => { // deletes the video request locally, called after succesfull db deletion
      const videoRequests = this.state.data.videorequests.filter
    }

    componentDidMount() { // loads youtube & parse data
        let data = this.props.data
        this.loadYoutube()
        data.videorequests = this.parseVideoRequests(this.props.data.videorequests)
        //const stripeAccount = this.checkStripeIntegration(data.stripe_account_id)
        console.log(data, "parsed data")
        
        this.setState({data : data, /*stripeAccount : stripeAccount*/})
    }

    render() { 

      const stripeState = this.state.data.stripeState
      const data = this.state.data

      if (this.state.loadingContent) {
        return (
          <div>
            <Jumbotron>
              <div className="headline">
                <h1>Loading...</h1>
                <p>loading info...</p>
              </div>
            </Jumbotron>
            <div style={{paddingLeft:"50%", width:"100%"}}><Spinner animation="border" /></div>
          </div>
        )
      } // Does a get request to get the profile, allows managing the profile
        return ( <div>
          <Container fluid>
            <EditProfile stripeState={stripeState} userName={data.username} user_id={data.user_id} price={data.video_price} currency={data.currency}/>
            <Row>
              <Col>
                <RequestInfo videoPrice={{price : data.video_price, currency: data.currency}} unfulfilledRequestsAmount={this.state.data.requestsAmount - this.state.data.fulfilledRequestsAmount} fulfilledRequestsAmount={this.state.data.fulfilledRequestsAmount} requestsAmount={this.state.data.requestsAmount}/>
              </Col>
              {this.state.data.videorequests.map(vidReq => {
                  return (<Col> <VideoRequest key={vidReq.request_id} requestId={vidReq.request_id} description={vidReq.description} title={vidReq.title} videoId={vidReq.video_id}/></Col>)
              })}
            </Row>
          </Container>
        </div> );
    }
}
 
export default ManageProfile;