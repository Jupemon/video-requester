import React from 'react';
import {GoogleLogin} from 'react-google-login';

const LoginButton = (props) => { // handles the google login 
    return (<GoogleLogin
        clientId={process.env.REACT_APP_CLIENT_ID}
        buttonText="Login"
        onSuccess={(googleUser) => {props.logIn(googleUser)}}
        onFailure={() => {props.logInFailure()}}
        cookiePolicy={'single_host_origin'}
      />)
}
 
export default LoginButton;