import React, {useState} from 'react';
import './../../styles/App.css'
import MyButton from "../UI/button/MyButton";
import MyInput from "../UI/input/MyInput";
import MySelect from "../select/MySelect";
import {useNavigate} from "react-router";

const NewUser = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        userName: '',
        password: '',
        email: '',
        roles: [{
            id: 2,
            name: 'ROLE_USER'
        }
        ]})

    const addNewUser = (e) => {
        e.preventDefault()

        fetch("http://localhost:8080/user", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-Auth-Token': localStorage.getItem('token')
            },
            body: JSON.stringify(user)
        }).then(response => {
            setUser({
                userName: '',
                password: '',
                email: '',
                roles: [{
                    id: 2,
                    name: 'ROLE_USER'
                }
                ]})

            navigate("/admin")
        })
    }

    const setUserRole = (role) => {
        {role === 'admin'
            ? setUser({...user,
                roles: [{
                    id: 1,
                    name: 'ROLE_ADMIN'
                },
                    {
                    id: 2,
                    name: 'ROLE_USER'
                }
                ]})
            : setUser({...user,
                roles: [{
                    id: 2,
                    name: 'ROLE_USER'
                }
                ]})
        }
    }

    return (
        <div className="container-fluid border rounded" style={{paddingLeft: 10, paddingRight: 10, paddingBottom: 0}}>
            <div className="row padding-left-10 background-antiquewhite">
                <h3>Add new user</h3>
            </div>
            <div className="row background-white content-center  text-center">
                <form className="padding-top-bottom-10" style={{maxWidth: 300}}>
                    <div className="padding-bottom-10">
                        <label className="bold-text">Username</label>
                        <MyInput className="form-control"
                                 value={user.userName}
                                 onChange={e => setUser({...user, userName: e.target.value})}
                                 type="text"/>
                    </div>

                    <div className="padding-bottom-10">
                        <label className="bold-text">Password</label>
                        <MyInput className="form-control"
                                 value={user.password}
                                 onChange={e => setUser({...user, password: e.target.value})}
                                 type="password"/>
                    </div>

                    <div className="padding-bottom-10">
                        <label className="bold-text">Email</label>
                        <MyInput className="form-control"
                                 value={user.email}
                                 onChange={e => setUser({...user, email: e.target.value})}
                                 type="text"/>
                    </div>

                    <div className="padding-bottom-10">
                        <label className="bold-text">Role</label>

                        <MySelect
                            onChange={setUserRole}
                            options={[
                                {value: 'user', name: 'USER'},
                                {value: 'admin', name: 'ADMIN'}
                            ]}
                        />
                    </div>

                    <MyButton onClick={addNewUser} className="btn btn-success">Add new user</MyButton>
                </form>
            </div>
        </div>

    );
};

export default NewUser;