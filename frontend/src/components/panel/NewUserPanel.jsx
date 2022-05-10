import React from 'react';
import NewUser from "../form/NewUser";
import {Link} from "react-router-dom";

const NewUserPanel = ({create}) => {
    return (
        <div className="col vh-100 background-blanchedalmond">
            <h2>Admin panel</h2>

            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <Link to="/admin" className="nav-link">Users table</Link>
                </li>
                <li className="nav-item">
                    <Link to="/new" className="nav-link active">New User</Link>
                </li>
            </ul>

            <NewUser create={create}/>

        </div>
    );
};

export default NewUserPanel;