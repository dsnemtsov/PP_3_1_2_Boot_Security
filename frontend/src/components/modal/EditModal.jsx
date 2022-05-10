import React, {useState} from 'react';
import MyButton from "../UI/button/MyButton";
import {Modal} from "react-bootstrap";
import MySelect from "../select/MySelect";

const EditModal = ({user}) => {
    const [updatedUser, setUpdatedUser] = useState({
        userName: user.userName,
        email: user.email,
        roles: [{
            id: 2,
            name: 'ROLE_USER'
        }
        ]}
        )

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const setUpdatedUserRole = (role) => {
        {role === 'admin'
            ? setUpdatedUser({...updatedUser,
                roles: [{
                    id: 1,
                    name: 'ROLE_ADMIN'
                },
                    {
                        id: 2,
                        name: 'ROLE_USER'
                    }
                ]})
            : setUpdatedUser({...updatedUser,
                roles: [{
                    id: 2,
                    name: 'ROLE_USER'
                }
                ]})
        }
    }

    const updateUser = (e) => {
        e.preventDefault()

        fetch('http://localhost:8080/user/' + user.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-Auth-Token': localStorage.getItem('token')
            },
            body: JSON.stringify(updatedUser)
        }).then(response => {
            setShow(false)
        })

    }

    return (
        <div>
            <MyButton onClick={handleShow} className="btn btn-info">
                Edit
            </MyButton>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-body text-center width-250 margin-auto">
                        <div className="form-group">
                            <label className="form-control-label bold-text">ID</label>
                            <input type="text" className="form-control" disabled value={user.id}/>
                        </div>
                        <div className="form-group">
                            <label className="form-control-label bold-text">Username</label>
                            <input type="text"
                                   className="form-control"
                                   value={updatedUser.userName}
                                   onChange={e => setUpdatedUser({...updatedUser, userName: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-control-label bold-text">Email</label>
                            <input
                                type="text"
                                className="form-control"
                                value={updatedUser.email}
                                onChange={e => setUpdatedUser({...updatedUser, email: e.target.value})}
                            />
                        </div>

                        <div className="padding-bottom-10">
                            <label className="bold-text">Role</label>

                            <MySelect
                                onChange={setUpdatedUserRole}
                                options={[
                                    {value: 'user', name: 'USER'},
                                    {value: 'admin', name: 'ADMIN'}
                                ]}/>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <MyButton className="btn btn-secondary" onClick={handleClose}>
                        Close
                    </MyButton>
                    <MyButton className="btn btn-info" onClick={updateUser}>
                        Edit
                    </MyButton>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default EditModal;