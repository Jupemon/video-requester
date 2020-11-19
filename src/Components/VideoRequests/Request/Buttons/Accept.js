import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Accept extends Component {
    state = { 
        placeHolder : "Enter a youtube URL",
        input : "",
        loading : false,
        file : ""
     }
    
    sendRequest = async (data) => {

        this.setState({ loading : true })
        
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/fulfillvideorequest`, {
            method : "POST",
            body : data
        })

        if (response.status === 200) {

            // Call updaterequests with the updated requests
            const updatedRequests = await response.json()

            this.setState({loading : false})

            this.props.updateRequests(updatedRequests)
        }

        else {
            this.setState({input : "", placeHolder : "Something went wrong", loading: false})
        }
    }


    handleClick = () => { // called by fulfill button, validate input & send fetch request

        const { requestId } = this.props
        const token_id =  window.localStorage.getItem('token_id')
        //const input = this.state.input
        const data = new FormData()

        data.append('video', this.state.file)
        data.append('name', "JOHNSON")
        data.append('requestId', requestId)
        data.append('token_id', token_id)

        this.sendRequest(data)

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
                <input disabled={loading} type="file" id="video" onChange={(e) => {this.setState({file : e.target.files[0]})}}/>
            </div>);
        }


    }
}
 
export default Accept;