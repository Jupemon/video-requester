import React, { Component } from 'react';

class Price extends Component {
    state = {  }

    
    render() { 

        const {video_price, currency} = this.props

        return ( 
        <div>
            <b>{video_price} {currency}</b> | Edit Price
        </div> );
    }
}
 
export default Price;