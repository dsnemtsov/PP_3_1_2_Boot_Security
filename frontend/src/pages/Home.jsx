import React from 'react';
import './../styles/App.css'
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <div className="margin-auto width-66">
            <Link to="/login" className="btn btn-primary">Login</Link>
        </div>
    );
};

export default Home;