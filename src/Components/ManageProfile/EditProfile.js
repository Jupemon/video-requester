import React, { Component } from 'react';
import { Jumbotron, Button, OverlayTrigger, Popover, Row, Col, Dropdown, DropdownButton, Spinner } from 'react-bootstrap';


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
    this.props.changedData("video_price", this.state.input);
  }

  componentDidMount() {
    this.setState({currency : this.props.currency, price:this.props.price})
  }
  render() { 
    return ( 
    <OverlayTrigger onExit={() => {this.setState({input : ""})}} trigger="click" placement="top" overlay={<Popover id="popover-basic">
      <Popover.Title as="h3">Set video price</Popover.Title>
      <Popover.Content>
        <input type="number" min="0" max="500" value={this.state.input} onChange={(e) => {this.setState({input : e.currentTarget.value})}}/>
        <Button onClick={() => {this.setPrice()}}>Save</Button>
      </Popover.Content>
      </Popover>}>
        <Button disabled={this.props.disabled} variant="success"><h1>{this.state.input.length <= 0 ? this.state.price : this.state.input}</h1></Button>
    </OverlayTrigger> );
  }
}

class Currency extends Component {
  state = { 
    currentlySelected : this.props.currency.toUpperCase()
   }

  setCurrency = (cur) => {
    this.setState({currentlySelected : cur});
    this.props.changedData("currency", cur);
  }
  render() { 
    return ( 
      <DropdownButton disabled={this.props.disabled} id="dropdown-basic-button" title={this.state.currentlySelected} style={{display:"inline"}}>
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
    this.props.changedData("username", this.state.input);
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
        <Button disabled={this.props.disabled} variant="success"><h1>{this.state.input.length <= 0 ? this.state.userName : this.state.input}</h1></Button>
      </OverlayTrigger> );
  }
}


class EditProfile extends Component {
    state = { 
      infoText : "",
      loading : false,
      stripeAccount : true,
      changedData : {}
     }


     saveProfile = () => { // save changes on db
      this.setState({loading : true})
      const changedData = this.state.changedData;
       console.log(this.state.changedData, "CHANGED DATA YOU")
       fetch("https://requstenator-server.herokuapp.com/editprofile", {
         method : "POST",
         headers : {
          'Content-Type' : "application/json"
        },
         body : JSON.stringify({
           token_id : window.localStorage.getItem("token_id"),
           data : changedData
         })
       }).then(re => {
         re.json().then(d => {
           console.log("parsed data", d)
           this.setState({loading : false})
         })
       })
     }

    changedData = (type, value) => { // saves the changed user data
      const changedData = this.state.changedData
      changedData[type] = value
      this.setState({ changedData })
    }



    componentDidMount() {
      this.setState({userName : this.props.userName}) // set initial data
    }

    render() { 
      const {loading, infoText} = this.state
        return ( <div className="top-info">
              <Jumbotron>
              <h1><Username disabled={loading} userName={this.props.userName} changedData={this.changedData}/></h1>
  <Row>
  <Col md="6">
  <p>Tell your audience to send video requests here : <a target="blank" href={window.location.href + "viewprofile#" + this.props.user_id}>{window.location.href + "viewprofile#" + this.props.user_id}</a></p>
  {this.state.stripeAccount ? <p>You have integrated stripe to your profile!</p> : <p>Start charging money for video requests : <a href={`https://connect.stripe.com/express/oauth/authorize?client_id=${process.env.REACT_APP_STRIPE_CLIENT_ID}&state=${this.props.stripeState}.com`}>Create Stripe Account</a></p>}
  </Col>
  <Col>
  <p>Current video price is <VideoPrice disabled={loading} price={this.props.price} changedData={this.changedData}/> <Currency disabled={loading} currency={this.props.currency} changedData={this.changedData}/></p>
  <Button disabled={loading} onClick={() => {this.saveProfile()}}>{loading ? <Spinner animation="border" /> : "Save changes"}</Button>
  <p>{infoText}</p>
  </Col>
  </Row>
</Jumbotron>
        </div> );
    }
}
 
export default EditProfile;