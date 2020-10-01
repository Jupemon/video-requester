import React from 'react';

const Status = (props) => {
    const { status } = props
    return ( <div className="status">{status.toUpperCase()}</div> );
}
 
export default Status;