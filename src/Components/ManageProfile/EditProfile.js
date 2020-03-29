import React, { Component } from 'react';
import { Jumbotron, Button, OverlayTrigger, Popover, Row, Col, Container, Dropdown, DropdownButton } from 'react-bootstrap';


const currencyTypes = ["USD", "EUR", "GBP"]

class VideoPrice extends Component {
  state = { 
    input :  "", 
    currency : "",
    price :"",
    saved : false
  }

  setPrice = () => {
    this.setState({ price : this.state.input})
    this.props.changedData("price", this.state.input);
  }

  componentDidMount() {
    this.setState({currency : this.props.currency, price:this.props.price})
  }
  render() { 
    return ( <OverlayTrigger onExit={() => {this.setState({input : ""})}} trigger="click" placement="top" overlay={<Popover id="popover-basic">
    <Popover.Title as="h3">Set video price</Popover.Title>
        <Popover.Content>
        <input type="number" min="1" max="500" value={this.state.input} onChange={(e) => {this.setState({input : e.currentTarget.value})}}/>
        <Button onClick={() => {this.setPrice()}}>Save</Button>
        </Popover.Content>
      </Popover>}>
        <Button variant="success"><h1>{this.state.input.length <= 0 ? this.state.price : this.state.input}</h1></Button>
      </OverlayTrigger> );
  }
}

class Currency extends Component {
  state = { 
    currentlySelected : "EUR"
   }

  setCurrency = (cur) => {
    this.setState({currentlySelected : cur});
    this.props.changedData("currency", cur);
  }
  render() { 
    return ( 
      <DropdownButton id="dropdown-basic-button" title={this.state.currentlySelected} style={{display:"inline"}}>
    {currencyTypes.map(cur => {
    return <Dropdown.Item key={cur} onClick={() => {this.setCurrency(cur)}}>{cur}</Dropdown.Item>
    })}
  </DropdownButton>
  );
  }
}

class Username extends Component {
  state = { 
    editingProfile : false,
    input :  "", 
    userName : "",
    saved : false
  }

  setUsername = () => {
    this.setState({userName : this.state.input})
    this.props.changedData("userName", this.state.input);
  }

  componentDidMount() {
    this.setState({userName : this.props.userName})
  }
  render() { 
    return ( <OverlayTrigger onExit={() => {this.setState({input : ""})}} trigger="click" placement="top" overlay={<Popover id="popover-basic">
    <Popover.Title as="h3">Rename username</Popover.Title>
        <Popover.Content>
        <input maxLength="25" type="text" value={this.state.input} onChange={(e) => {this.setState({input : e.currentTarget.value})}}/>
        <Button onClick={() => {this.setUsername()}}>Save</Button>
        </Popover.Content>
      </Popover>}>
        <Button variant="success"><h1>{this.state.input.length <= 0 ? this.state.userName : this.state.input}</h1></Button>
      </OverlayTrigger> );
  }
}


class EditProfile extends Component {
    state = { 
      stripeAccount : true,
      changedData : {}
     }


     saveProfile = () => {
       console.log(this.state.changedData, "CHANGED DATA YOU")
     }

    changedData = (type, value) => { // saves the changed user data
      const changedData = this.state.changedData
      changedData[type] = value
      this.setState({ changedData })
    }



    componentDidMount() {
      this.setState({userName : this.props.userName})
    }

    render() { 
        return ( <div className="top-info">
              <Jumbotron>
              <h1><Username userName="JP. morgan" changedData={this.changedData}/></h1>
  <Row>
  <Col md="6">
  <p>Tell your audience to send video requests here : <a target="blank" href={window.location.href + "viewprofile#" + this.props.user_id}>{window.location.href + "viewprofile#" + this.props.user_id}</a></p>
  {this.state.stripeAccount ? <p>You have integrated stripe to your profile!</p> : <p>Start charging money for video requests : <a href={`https://connect.stripe.com/express/oauth/authorize?client_id=${process.env.REACT_APP_STRIPE_CLIENT_ID}&state=${this.props.stripeState}.com`}>Create Stripe Account</a></p>}
  </Col>
  <Col>
  <p>Current video price is <VideoPrice price="50" changedData={this.changedData}/> <Currency currency="eur" changedData={this.changedData}/></p>
  <Button onClick={() => {this.saveProfile()}}>Save changes</Button>
  </Col>
  </Row>
</Jumbotron>
        </div> );
    }
}
 
export default EditProfile;