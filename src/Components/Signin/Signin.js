import React, { Component } from 'react';
import ManageProfile from '../ManageProfile/ManageProfile';

class Signin extends Component {
    state = {
        signedIn : false
     }

    signIn 

    render() { 
        return ( <div>
            
            {this.state.signedIn ? <ManageProfile /> : "sign in throught here"}
        </div> );
    }
}
 
export default Signin;