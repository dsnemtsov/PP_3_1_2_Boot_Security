import React from 'react';
import './../../styles/App.css'
import TableRaw from "./TableRaw";

const Users = ({users}) => {
    return (
        <div className="container-fluid border rounded" style={{paddingLeft: 10, paddingRight: 10, paddingBottom: 0}}>
            <div className="row padding-left-10 background-antiquewhite">
                <h3>All users</h3>
            </div>
            <div className="row background-white">
                <table id="example" className="table table-striped" style={{margin: 0}}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user =>
                        <TableRaw user={user} key={user.id}/>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;