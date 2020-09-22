import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Accepted extends Component {
    state = { 
        placeHolder : "Enter a youtube URL",
        input : "",
        loading : false
     }
    
    sendRequest = async (token_id, videoUrl, requestId) => {

        this.setState({loading : true, placeHolder : "Loading..."})

        const response = await fetch("http://localhost:3001/fulfillvideorequest", {
            method : "POST",
            headers : {
            'Content-Type' : "application/json"
            },
            body : JSON.stringify({
            token_id : token_id,
            videoUrl : videoUrl,
            requestId : requestId
            })
        })

        if (response.status === 200) {
            this.setState({input : "", loading: false})
            this.props.loadYoutubePlayer(videoUrl)
        }

        else {
            this.setState({input : "", placeHolder : "Something went wrong", loading: false})
        }
    }


    validateYoutubeUrl = (url) => { // validate youtube Url and return the video ID
        const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = url.match(regExp);

        if (match && match[2].length == 11) {
          return match[2];
        }

        else {
          return false
        }
      }


    handleClick = () => { // called by fulfill button, validate input & send fetch request
        const input = this.state.input
        const validUrl = this.validateYoutubeUrl(input)

        if (validUrl) {
            const { requestId } = this.props
            const token_id =  window.localStorage.getItem('token_id')

            this.sendRequest(token_id, validUrl, requestId)
        }

        else {
            this.setState({input : "", placeHolder : "Not a valid URL"})
        }
    }

    render() { 
        const {input, placeHolder, loading} = this.state


        if (loading) {
            return <div>
                <Button disabled={true}>Loading...</Button>
            </div>
        }

        else {
            return (<div >
                <Button disabled={loading} onClick={() => {this.props.cancel()}} variant="danger">Cancel</Button>
                <Button disabled={loading} variant="success" onClick={() => {this.handleClick()}}>Fulfill</Button>
                <input disabled={loading} type="text" placeholder={placeHolder} value={input} onChange={(e) => {this.setState({input : e.target.value})}}/>    
            </div>);
        }


    }
}
 
export default Accepted;