import React, { Component } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import DropZone from './DropZone/DropZone';
import './HandleRequest.css'

class HandleRequest extends Component { // Allows fulfilling / rejecting a request, only available for manageprofile
    state = {
        loading : false
    }

    rejectRequest = async (token_id, requestId) => { // Set videorequest status to rejected

        this.setState({ loading: true })

        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/rejectvideorequest`, {
            method : "POST",
            headers : {
            'Content-Type' : "application/json"
            },
            body : JSON.stringify({
            token_id : token_id,
            requestId : requestId
            })
        })

        if (response.status===200) {


            const updatedData = await response.json()

            this.props.updateVideoRequests(updatedData)
            this.props.updateRequestStatus("rejected")

            this.setState({ loading: false })

        }

        else {
            this.setState({ loading: false, error : "Failed to update" })
        }

    }

    handleReject = () => {

        const token_id = window.localStorage.getItem('token_id')

        const { requestId } = this.props
        
        this.rejectRequest(token_id, requestId)
    }


    fulfillRequest = async (data) => { // Attempt to fulfill a videorequest, 

        this.setState({ loading : true })
        
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/fulfillvideorequest`, {
            method : "POST",
            body : data
        })

        if (response.status === 200) {

            const updatedData = await response.json() // Response is an updated list of videorequests & their status info

            this.props.updateVideoRequests(updatedData)

            this.props.updateRequestStatus("uploading")

            this.setState({loading : false})
        }

        else {
            this.setState({input : "", placeHolder : "Something went wrong", loading: false})
        }
    }

    handleFileUpload = (file) => {

        const { requestId } = this.props

        const token_id = window.localStorage.getItem('token_id')

        const data = new FormData()

        data.append('video', file)

        data.append('requestId', requestId)

        data.append('token_id', token_id)

        this.fulfillRequest(data)
    }

    render() { 
        const {loading} = this.state

        if (loading) {
            return (<div>
                <Spinner className="handle-request-spinner" animation="border"/>
            </div>
            )
        }

        else {
            return (<div>
                <Button onClick={() => {this.handleReject()}} className="reject-request" variant="danger">Reject</Button>
                <DropZone handleFileUpload={this.handleFileUpload}/>
                </div>);
        }

    }
}
 
export default HandleRequest;