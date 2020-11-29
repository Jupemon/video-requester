import React, { Component } from 'react';
import { Button, Dropdown, DropdownButton, Form, FormControl, InputGroup } from 'react-bootstrap';


class Price extends Component {
    constructor(props) {

        super(props)

        const {video_price, currency} = this.props

        this.state = {
            inputPrice : video_price,
            loading : false,
            video_price : video_price,
            currency : currency
        }
    }
    
    editPrice = async (body) => {

        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/editprice`, {
            method : "POST",
            headers : {
              'Content-Type' : "application/json"
    
            },
            body : JSON.stringify(body)
        })

        if (response.status === 201) {

            const data = await response.json()

            const {video_price, currency} = data

            this.setState({video_price, currency})
        }

        this.setState({loading : false})
    }

    handleClick = () => {

        this.setState({loading : true})

        const { inputPrice } = this.state

        const { user_id } = this.props

        const token_id = window.localStorage.getItem('token_id')

        const body = {
            token_id : token_id,
            updatedPrice : Number.parseInt(this.state.inputPrice),
            user_id : user_id
        }

        this.editPrice(body)
        
    }
    
    render() { 

        const {inputPrice, video_price, currency, loading} = this.state

        return ( 
        <div>
            <p>
                the price for leaving a custom video request is currently : <b>{video_price}{" "}{currency}</b>
            </p>
            <DropdownButton disabled={loading}  title={loading ? "Loading.." : "Edit Price"} id="bg-nested-dropdown">
                <div style={{display : "flex"}}>
                    <InputGroup className="mb-3">
                        <FormControl
                        type="number"
                        min="0"
                        onChange={(e) => {this.setState({ inputPrice : e.target.value })}}
                        value={inputPrice}
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        />
                    <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">{currency.toUpperCase()}</InputGroup.Text>
                    </InputGroup.Prepend>
                    </InputGroup>

                    <Dropdown.Item onClick={() => {this.handleClick()}} eventKey="1">Save</Dropdown.Item>
                </div>
            </DropdownButton>
        </div> );
    }
}
 
export default Price;