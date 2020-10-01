import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Request from './Request/Request';
import RequestsInfo from './RequestsInfo';

class VideoRequests extends Component {

    state = { 
        videoRequests : [],
        errorMessage : "",
        youtubeLoaded : false
    }

    youtubeLoaded = () => {
        this.setState({youtubeLoaded : true})
    }

    loadYoutubeScripts = () => {
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
        const { youtubeLoaded } = this.state
        
        if (youtubeLoaded) {
            return (
                <Row>
                <Col>
                    <RequestsInfo status={status}/>
                </Col>
                    
                    {requests.map(vr => {
                        return <Col key={vr.request_id} style={{marginBottom : "20px"}}><Request viewOnly={viewOnly} data={vr}/></Col>
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
