import React, {useContext} from 'react';
import {AppContext} from "../../context";
import './../../styles/App.css'


const User = () => {
    const {currentUser} = useContext(AppContext)

    return (

        <div className="container-fluid border rounded" style={{paddingLeft: 10, paddingRight: 10, paddingBottom: 0}}>
            <div className="row padding-left-10 background-antiquewhite">
                <h3>About user</h3>
            </div>
            <div className="row background-white">
                <table id="example" className="table table-striped" style={{margin: 0}}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr key={currentUser.id}>
                        <td>{currentUser.id}</td>
                        <td>{currentUser.userName}</td>
                        <td>{currentUser.email}</td>
                        <td>{currentUser.rolesNames}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default User;