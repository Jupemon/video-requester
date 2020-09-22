import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import EditProfile from './EditProfile';

class Profile extends Component {
    state = {  }
    render() { 
        const {video_price, currency, user_id} = this.props.profile

        return ( <div>
        
        <Row>
            <Col>
                <h1>Your Account :</h1>
            </Col>

            <Col>
                <ul className="list-group">
                    <a href="#" className="list-group-item list-group-item-action">
                        Add Stripe account
                    </a>
                    
                    <li className="list-group-item">{`http://localhost:3000/profile/${user_id}`}</li>
                    <li className="list-group-item">Custom video cost : {video_price} | {currency}</li>
                    <EditProfile/>
                </ul>
            </Col>
        </Row>
        </div> );
    }
}

export default Profile;