import React from 'react';
import {GoogleLogin} from 'react-google-login';

const LoginButton = (props) => { // handles the google login 
    return (<GoogleLogin
        clientId="317396825022-qi6q964ae2t2mv5vbg3eg9lu32hkuba5.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={() => {props.logIn()}}
        onFailure={() => {props.logInFailure()}}
        cookiePolicy={'single_host_origin'}
      />)
}
 
export default LoginButton;