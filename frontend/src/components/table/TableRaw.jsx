import React from 'react';
import DeleteModal from "../modal/DeleteModal";
import EditModal from "../modal/EditModal";

const TableRaw = ({user}) => {
    return (
        <tr>
            <td>{user.id}</td>
            <td>{user.userName}</td>
            <td>{user.email}</td>
            <td>{user.rolesNames}</td>
            <td>
                <EditModal user={user}/>
            </td>
            <td>
                <DeleteModal user={user}/>
            </td>
        </tr>
    );
};

export default TableRaw;