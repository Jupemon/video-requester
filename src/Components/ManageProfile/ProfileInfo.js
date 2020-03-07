import React, { Component } from 'react';
import { Jumbotron, Button } from 'react-bootstrap';

class ProfileInfo extends Component {
    state = {  }
    render() { 
        return ( <div>
              <Jumbotron>
  <div className="headline">
  <Button><h1>{this.props.firstName}</h1></Button>
  <p>
    Basic info about {this.props.firstName}
  </p>
  <p>Suggest videos to this link <a target="blank" href={window.location.href + "viewprofile#" + this.props.user_id}>{window.location.href + "viewprofile#" + this.props.user_id}</a></p>
  </div>
</Jumbotron>
        </div> );
    }
}
 
export default ProfileInfo;