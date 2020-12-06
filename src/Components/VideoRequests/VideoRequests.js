import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import CreateVideoRequest from './CreateVideoRequest';
import Request from './Request/Request';
import RequestsInfo from './RequestsInfo';

class VideoRequests extends Component { // Handles everything to do with videorequests

    constructor(props) {

        super(props)

        const { requests, status } = this.props.profileData

        this.state = { 
            youtubeLoaded : false,
            status : status,
            requests : requests
        }

    }

    youtubeLoaded = () => { // Youtube I frame can now be used

        this.setState({youtubeLoaded : true})
    }

    updateVideoRequests = (updatedData) => { // Update videorequests data

        const { status, requests } = updatedData

        this.setState({ status, requests })

    }


    loadYoutubeScripts = () => { // Load scripts needed to use youtube iframe

        var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";

        var firstScriptTag = document.getElementsByTagName('script')[0];

        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = this.youtubeLoaded// Called after scripts have been loaded
    }


    componentDidMount() {
        if (window.YT === undefined) { // Check if scripts have already been loaded
            this.loadYoutubeScripts()
        }
        
    }



    render() { 
        const { youtubeLoaded, status, requests } = this.state;
        
        if (youtubeLoaded) {
            
            const { viewOnly } = this.props

            const {video_price, currency, channel_name, user_id } = this.props.profileData
            return (<Container>
                { !viewOnly ? null : <Row>
                    <Col>
                    <CreateVideoRequest updateVideoRequests={this.updateVideoRequests} userId={user_id} currency={currency} videoPrice={video_price} channel_name={channel_name}/>
                    </Col>
                </Row>}
                <Row>

                <Col>
                    <RequestsInfo status={status}/>
                </Col>
                    
                    {requests.map(vr => {
                        return <Col key={vr.request_id} style={{marginBottom : "20px"}}><Request updateVideoRequests={this.updateVideoRequests} viewOnly={viewOnly} data={vr}/></Col>
                    })}
                </Row> 
            </Container>);
        }

        else {
            return <div>Loading</div>
        }
      


    }
}
 
export default VideoRequests;
