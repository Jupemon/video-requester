import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Accept from './Accept';
import Reject from './Reject';

class Buttons extends Component {
    state = { 
        accepted : undefined
     }

    cancel = () => { // Called by Accepted component, sets accepted to undefined
        this.setState({accepted : undefined})
    }

    render() { 
        const { accepted } = this.state

        if (accepted === true) {
            return <Accept loadYoutubePlayer={this.props.loadYoutubePlayer} cancel={this.cancel} requestId={this.props.requestId}/>
        }

        else if (accepted === false) {
            return <Reject rejectVideo={this.props.rejectVideo} cancel={this.cancel} requestId={this.props.requestId}/>
        }

        else {
            return ( <div style={{display:"flex"}}>
            <Button onClick={() => {this.setState({accepted : false})}} variant="danger">Reject</Button>
            <Button onClick={() => {this.setState({accepted : true})}} variant="success">Accept</Button>
            </div> );
        }
       
    }
}
 
export default Buttons;