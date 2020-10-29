import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';

class Profile extends Component {
    state = {  }
    render() {
        
        const {user_id, onboarding_completed} = this.props.profile

        const token_id = window.localStorage.getItem("token_id")
        
        return (
        
        <Row>
            <Col>
                <h1>Your Account :</h1>
            </Col>

            <Col>
                
                <ul className="list-group">
                    <Button disabled={onboarding_completed} href={`http://localhost:3001/handle-onboarding/${token_id}`}>Integrade stripe</Button>
                    <li className="list-group-item">{`http://localhost:3000/viewprofile/${user_id}`}</li>
                </ul>
            </Col>
        </Row>
        );
    }
}

export default Profile;