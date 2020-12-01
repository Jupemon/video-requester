import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import './Request.css'
import YoutubePlayer from './YoutubePlayer';
import HandleRequest from './HandleRequest/HandleRequest';

class Request extends Component {
    constructor(props) {
        super(props)

        const { status, video } = this.props.data

        this.state = { 
            status : status,
            videoId : video
        }
    }

    updateRequestStatus = ( status ) => { // Set request status

        this.setState({status : status})
    }

    render() { 

        const {title, description, requester, request_id } = this.props.data

        const { viewOnly } = this.props

        const { status, videoId } = this.state

        if (status === "pending" || status === "failed") {
            return (
                <Card bg="warning">
                    <Card.Body>
                        <div className="status">{status.toUpperCase()}</div>
                        <Card.Text>From : {requester}</Card.Text>
                        <Card.Title className="title">{title}</Card.Title>
                        <Card.Text className="description">{description}</Card.Text>
                        {viewOnly ? null : <HandleRequest updateRequestStatus={this.updateRequestStatus} updateVideoRequests={this.props.updateVideoRequests} requestId={request_id}/>}
                    </Card.Body>
                </Card> );
        
        }

        if (status === "rejected") {
            return (
                <Card bg="danger">
                    <Card.Body>
                        <div className="status">{status.toUpperCase()}</div>
                        <Card.Text>From : {requester}</Card.Text>
                        <Card.Title className="title">{title}</Card.Title>
                        <Card.Text className="description">{description}</Card.Text>
                    </Card.Body>
                </Card> );
        
        }

        if (status === "fulfilled") {
            return (
                <Card bg="success">
                    <Card.Body>
                        <div className="status">{status.toUpperCase()}</div>
                        <YoutubePlayer requestId={request_id} videoId={videoId}/>
                    </Card.Body>
                </Card> );
        
        }
        if (status === "uploading") {
            return (
                <Card bg="info">
                    <Card.Body>
                        <div className="status">{status.toUpperCase()}</div>
                        <YoutubePlayer requestId={request_id} videoId={videoId}/>
                    </Card.Body>
                </Card> );
        
        }
        
    }
}
 
export default Request;