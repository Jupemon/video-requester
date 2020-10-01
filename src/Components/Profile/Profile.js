import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

class Profile extends Component {
    state = {  }
    render() { 
        const {user_id} = this.props.profile

        return (
        
        <Row>
            <Col>
                <h1>Your Account :</h1>
            </Col>

            <Col>
                <ul className="list-group">
                    <li className="list-group-item">{`http://localhost:3000/viewprofile/${user_id}`}</li>
                </ul>
            </Col>
        </Row>
        );
    }
}

export default Profile;