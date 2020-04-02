import React from 'react';
import loader from '../../loader.gif'

const Loading = () => {
    return ( <div style={{width:"350px", height:"360px", backgroundColor:"#ffc107"}}>
    <img alt="loader" src={loader} width="100%" height="100%"/>
    </div>
  );
}
 
export default Loading;



/*<div className="top-content">
        <Spinner animation="border" role="status">
  <span className="sr-only">Loading...</span>
</Spinner>

    </div>  */