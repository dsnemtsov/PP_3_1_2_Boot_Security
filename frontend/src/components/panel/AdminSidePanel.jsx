import React from 'react';
import './../../styles/App.css'
import {Link} from "react-router-dom";

const AdminSidePanel = () => {
    return (
        <div className="col vh-100 width-150" style={{padding: 0, maxWidth: 150}}>
            <ul className="nav nav-pills flex-column margin-top-10">

                <li className="nav-item">
                    <Link to="/admin" className="nav-link active">Admin</Link>
                </li>

                <li className="nav-item">
                    <Link to="/user" className="nav-link">User</Link>
                </li>
            </ul>
        </div>
    );
};

export default AdminSidePanel;