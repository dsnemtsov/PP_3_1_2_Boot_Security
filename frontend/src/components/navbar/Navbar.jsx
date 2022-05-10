import React, {useContext} from 'react';
import './../../styles/App.css'
import {AppContext} from "../../context";
import {Link} from "react-router-dom";

const Navbar = () => {
    const {currentUser, setCurrentUser} = useContext(AppContext)

    const logout = () => {

        setCurrentUser({...currentUser, rolesNames: 'ROLE_GUEST'})
        localStorage.clear()
    }

    return (
        <nav className="navbar navbar-dark bg-dark padding-left-right-10">
            <div className="text-white">
                <span className="bold-text">{currentUser.email}</span>
                <span> with roles: </span>
                <span>{currentUser.rolesNames}</span>
            </div>

            <Link to={"/"} className="text-gray text-decoration-none logout" onClick={logout}>Logout</Link>
        </nav>
    );
};

export default Navbar;