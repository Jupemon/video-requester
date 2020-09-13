import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

class Profile extends Component {
    state = {  }
    render() { 
        return ( <div>
        
        <Row>
        <Col><h1>Your Account</h1></Col>
        <Col>
        <ul class="list-group">
        <a href="#" class="list-group-item list-group-item-action">
    Add Stripe account
  </a>
            <li class="list-group-item">Link : {"http://localhost:3000/profile/53"}</li>
            <li class="list-group-item">Custom video cost : {"50 EUR"}</li>
        </ul>
        </Col>
            </Row>
        </div> );
    }
}
/*serName={"jupemon@gmail.com"} user_id={"134"} price={"50"} currency={"EUR"} */
export default Profile;