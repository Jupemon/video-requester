import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import './Request.css'
import Buttons from './Buttons/Buttons';
import YoutubePlayer from './YoutubePlayer';
import Status from './Status';

class Request extends Component {
    constructor(props) {
        super(props)

        const { status, video } = this.props.data

        this.state = { 
            status : status,
            videoId : video
         }
    }

    setBackground = (status) => { // return the corresponding background color, based on request status

        if (status === "pending") {
            return "warning"
        }

        if (status === "rejected") {
            return "danger"
        }

        if (status === "fulfilled") {
            return "success"
        }
        
        if (status === "uploading") {
            return "info"
        }

        if (status === "failed") {
            return "dark"
        }
    }

    render() { 

        const {title, description, requester, request_id } = this.props.data

        const { viewOnly } = this.props

        const { status, videoId } = this.state
        
        return (
        <Card bg={this.setBackground(status)}>
            <Card.Body>
                {videoId ? <YoutubePlayer requestId={request_id} videoId={videoId}/> : <Status status={status}/>}
                <Card.Text>FROM : {requester}</Card.Text>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
                {viewOnly || status !== "pending" ? null : <Buttons updateRequests={this.props.updateRequests} requestId={request_id}/>}
            </Card.Body>
        </Card> );

        
    }
}
 
export default Request;