import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import Accepted from './Accepted';
import Buttons from './Buttons';
import Rejected from './Rejected';

class Request extends Component {
    constructor(props) {
        super(props)

        this.state = { 
            fulfilled : undefined,
            videoID : undefined
         }
    }


    loadYoutubePlayer = (videoUrl) => {
        this.setState({fulfilled : true, videoUrl : videoUrl})
    }

    render() { 
        const {title, description, request_id, owner_id, price, currency} = this.props.data
        const { viewOnly } = this.props
        const { fulfilled, videoId } = this.state
        
        return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{description}</Card.Text>
            <Card.Text>{price}|{currency}</Card.Text>
            {viewOnly ? null : <Buttons loadYoutubePlayer={this.loadYoutubePlayer} requestId={request_id}/>}
            </Card.Body>
        </Card> );

        
    }
}
 
export default Request;