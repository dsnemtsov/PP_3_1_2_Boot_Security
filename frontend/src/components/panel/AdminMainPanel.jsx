import React from 'react';
import Users from "../table/Users";
import './../../styles/App.css'
import {Link} from "react-router-dom";

const AdminMainPanel = ({users}) => {
    return (
        <div className="col vh-100 background-blanchedalmond">
            <h2>Admin panel</h2>

            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <Link to="/admin" className="nav-link active" >Users table</Link>
                </li>
                <li className="nav-item">
                    <Link to="/new" className="nav-link">New User</Link>
                </li>
            </ul>

            {users.length !== 0
                ? <Users users={users}/>
                : <h2 className="text-center">
                    Users not found!
                </h2>
            }
        </div>
    );
};

export default AdminMainPanel;