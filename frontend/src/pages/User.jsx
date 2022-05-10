import React from 'react';
import Navbar from "../components/navbar/Navbar";
import UserSidePanel from "../components/panel/UserSidePanel";
import UserMainPanel from "../components/panel/UserMainPanel";
import './../styles/App.css'

const User = () => {
    return (
        <div className="App">
            <Navbar/>

            <div className="container-fluid" style={{padding: 0}}>
                <div className="row">
                    <UserSidePanel/>
                    <UserMainPanel/>
                </div>
            </div>

        </div>
    );
};

export default User;