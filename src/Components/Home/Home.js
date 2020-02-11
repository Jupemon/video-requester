import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return ( <div>
        Log in and register
        <div><Link to="/signin">sign in</Link></div>
        <Link to="/register">register</Link>
    </div> );
}
 
export default Home;