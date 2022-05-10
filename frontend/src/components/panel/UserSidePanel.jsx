import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {AppContext} from "../../context";

const UserSidePanel = () => {
    const {currentUser} = useContext(AppContext)

    return (
        <div className="col vh-100 width-150" style={{padding: 0, maxWidth: 150}}>
            <ul className="nav nav-pills flex-column margin-top-10">
                {currentUser.rolesNames === 'ADMIN USER'
                ? <li className="nav-item">
                        <Link to="/admin" className="nav-link">Admin</Link>
                    </li>
                : ''}

                <li className="nav-item">
                    <Link to="/user" className="nav-link active">User</Link>
                </li>
            </ul>
        </div>
    );
};

export default UserSidePanel;