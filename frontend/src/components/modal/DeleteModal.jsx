import React, {useContext, useState} from 'react';
import {Modal} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import MyButton from "../UI/button/MyButton";
import {AppContext} from "../../context";


const DeleteModal = ({user}) => {
    const [show, setShow] = useState(false);
    const {users, setUsers} = useContext(AppContext)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const removeUser = (e) => {
        e.preventDefault()

        fetch('http://localhost:8080/user/' + user.id, {
            method: 'DELETE',
            headers: {
                'X-Auth-Token': localStorage.getItem('token')
            }
        })

        setUsers(users.filter(u => u.id !== user.id))
        setShow(false)

    }


    return (
        <div>
            <MyButton onClick={handleShow} className="btn btn-danger">
                Delete
            </MyButton>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-body text-center width-250 margin-auto">
                        <div className="form-group">
                            <label className="form-control-label bold-text">ID</label>
                            <input type="text" className="form-control" disabled value={user.id}/>
                        </div>
                        <div className="form-group">
                            <label className="form-control-label bold-text">Username</label>
                            <input type="text" className="form-control" disabled value={user.userName}/>
                        </div>
                        <div className="form-group">
                            <label className="form-control-label bold-text">Email</label>
                            <input type="text" className="form-control" disabled value={user.email}/>
                        </div>

                        <div className="padding-bottom-10">
                            <label className="bold-text">Role</label>

                            <Form.Select disabled aria-label="Default select example">
                                <option>USER</option>
                                <option>ADMIN</option>
                            </Form.Select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <MyButton className="btn btn-secondary" onClick={handleClose}>
                        Close
                    </MyButton>
                    <MyButton className="btn btn-danger" onClick={removeUser}>
                        Delete
                    </MyButton>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default DeleteModal;