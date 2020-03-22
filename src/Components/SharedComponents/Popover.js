import React from 'react';

const Popover = (props) => { // renders children, used to give more info about certain info data
    return ( <div>
    {props.children}
    </div> );
}
 
export default Popover;