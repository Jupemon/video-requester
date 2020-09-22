import React, { Component } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import Request from './Request';

class VideoRequests extends Component {
    state = { 
        loading : true,
        videoRequests : [],
        errorMessage : ""
     }

    fetchVideoRequests = async (user_id) => {
        try {
            const response = await fetch(`http://localhost:3001/getvideorequests/${user_id}`)
            const videoRequests = await response.json()
            this.setState({ videoRequests, loading : false })
        }
        catch {
            this.setState({errorMessage : "Couldnt find any videoRequests", loading : false})
        }
    }

    componentDidMount() {
        this.fetchVideoRequests(this.props.userId)
    }
    
    
    render() { 
        const { videoRequests, loading } = this.state
        const { viewOnly } = this.props

        if (loading) {
            return <div>Loading</div>
        }

        if (videoRequests.length <= 0)  {
            return <div>No Videorequests found</div>
        }

        if (viewOnly) {
            return ( <Row>
                {videoRequests.map(vr => {
                    return <Col><Request viewOnly data={vr}/></Col>
                })}
            </Row> );
        }

        else {
            return ( <Row>
                {videoRequests.map(vr => {
                    return <Col><Request data={vr}/></Col>
                })}
            </Row> );
        }

    }
}
 
export default VideoRequests;
