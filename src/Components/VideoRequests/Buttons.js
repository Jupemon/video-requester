import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Accepted from './Accepted';
import Rejected from './Rejected';

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
            return <Accepted loadYoutubePlayer={this.props.loadYoutubePlayer} cancel={this.cancel} requestId={this.props.requestId}/>
        }

        else if (accepted === false) {
            return <Rejected cancel={this.cancel} requestId={this.props.requestId}/>
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