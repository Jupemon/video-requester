import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Request from './Request/Request';
import RequestsInfo from './RequestsInfo';

class VideoRequests extends Component { // Renders videorequests passed as props

    state = { 
        errorMessage : "",
        youtubeLoaded : false
    }

    youtubeLoaded = () => { // Youtube I frame can now be used

        this.setState({youtubeLoaded : true})
    }

    loadYoutubeScripts = () => { // Load scripts needed to use youtube iframe

        var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";

        var firstScriptTag = document.getElementsByTagName('script')[0];

        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = this.youtubeLoaded// Called after scripts have been loaded
    }


    componentDidMount() {

        this.loadYoutubeScripts()
    }



    render() { 
        const { viewOnly, videoRequests } = this.props

        const { requests, status } = videoRequests;
        
        console.log(videoRequests, "THESE")
        const { youtubeLoaded } = this.state
        
        if (youtubeLoaded) {
            return (
                <Row>
                <Col>
                    <RequestsInfo status={status}/>
                </Col>
                    
                    {requests.map(vr => {
                        return <Col key={vr.request_id} style={{marginBottom : "20px"}}><Request updateRequests={this.props.updateRequests} viewOnly={viewOnly} data={vr}/></Col>
                    })}
                </Row> 
            );
        }

        else {
            return <div>Loading</div>
        }
      


    }
}
 
export default VideoRequests;
