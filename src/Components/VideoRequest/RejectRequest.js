import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class RejectRequest extends Component {
    state = {  }

    rejectRequest = () => {
        console.log("send the reject request here")
        fetch("https://requstenator-server.herokuapp.com/rejectrequest", {
            method : "POST",
            headers : {
              'Content-Type' : "application/json"
            },
            body : JSON.stringify({
              token_id : window.localStorage.getItem("token_id"),
              requestId : this.props.requestId
            })
    }).then(d => {
      if (d.status === 200) {
        console.log("succesfully removed from db, next delete it locally")
      }
    })}

    render() { 
        return ( <Button onClick={() => {this.rejectRequest()}}>X</Button> );
    }
}
 
export default RejectRequest