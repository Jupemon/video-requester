import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import SetupProfile from './SetupProfile';

class Profile extends Component {
    state = {  }
    render() {
        
        const {channel_name, user_id, onboarding_completed} = this.props.profile

        const token_id = window.localStorage.getItem("token_id")
        console.log(token_id, "TOKEN BABY")
        
        return (
        <div>
        <SetupProfile onboarding_completed={false} google_consent={false} token_id={token_id}/>
        
        <Row>
            <Col>
                <h1>Your Account :</h1>
            </Col>

            <Col>
                <div>Channel name : {channel_name}</div>
                <ul className="list-group">
                    <Button disabled={onboarding_completed} href={`http://localhost:3001/handle-onboarding/${token_id}`}>Integrade stripe</Button>
                    <li className="list-group-item">{`http://localhost:3000/viewprofile/${user_id}`}</li>
                </ul>
            </Col>
        </Row>
        </div>
        );
    }
}

export default Profile;