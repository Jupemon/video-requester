import { Spinner } from "react-bootstrap"
import React from 'react';

const Loading = () => {
    return ( <div className="top-content">
        <Spinner animation="border" role="status">
  <span className="sr-only">Loading...</span>
</Spinner>
    </div> );
}
 
export default Loading;