import React, { Component } from 'react';
import { Jumbotron, Button, OverlayTrigger, Popover } from 'react-bootstrap';

class Username extends Component {
  state = { 
    input :  "", 
    userName : "",
    saved : false
  }

  componentDidMount() {
    this.setState({userName : this.props.userName})
  }
  render() { 
    return ( <OverlayTrigger onExit={() => {this.setState({input : ""})}} trigger="click" placement="right" overlay={<Popover id="popover-basic">
    <Popover.Title as="h3">Rename username</Popover.Title>
        <Popover.Content>
        <input maxLength="25" type="text" value={this.state.input} onChange={(e) => {this.setState({input : e.currentTarget.value})}}/>
        <Button onClick={() => {this.setState({userName : this.state.input})}}>Save</Button>
        </Popover.Content>
      </Popover>}>
        <Button variant="success"><h1>{this.state.input.length <= 0 ? this.state.userName : this.state.input}</h1></Button>
      </OverlayTrigger> );
  }
}


class EditProfile extends Component {
    state = {  }
    render() { 
        return ( <div>
              <Jumbotron>
  <div className="headline">
  {/*<Username userName={this.props.userName} />*/}
  <h1>{this.props.userName}</h1>
  <p>Tell your audience to send video requests here : <a target="blank" href={window.location.href + "viewprofile#" + this.props.user_id}>{window.location.href + "viewprofile#" + this.props.user_id}</a></p>
  <p>Start charging money for video requests : <a href={`https://connect.stripe.com/express/oauth/authorize?client_id=${process.env.REACT_APP_STRIPE_CLIENT_ID}&state=${this.props.stripeState}.com`}>Create Stripe Account</a></p>
  </div>
</Jumbotron>
        </div> );
    }
}
 
export default EditProfile;