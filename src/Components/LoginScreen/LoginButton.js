import React from 'react';
import {GoogleLogin} from 'react-google-login';

const LoginButton = (props) => { // handles the google login 
    return (<GoogleLogin
        disabled={props.isLoading}
        clientId={process.env.REACT_APP_CLIENT_ID}
        buttonText={props.isLoading ? "Loading..." : "Login"}
        onSuccess={(googleUser) => {props.logIn(googleUser)}}
        onFailure={(er) => {props.logInFailure(er)}}
        cookiePolicy={'single_host_origin'}
      />)
}
 
export default LoginButton;