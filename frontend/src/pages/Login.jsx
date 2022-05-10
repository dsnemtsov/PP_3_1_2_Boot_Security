import React, {useContext, useState} from 'react';
import './../styles/App.css'
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router";
import {AppContext} from "../context";

const Login = () => {
    const {setCurrentUser} = useContext(AppContext)
    const [credentials, setCredentials] = useState({username: '', password: ''})
    const navigate = useNavigate();

    const login = event => {
        event.preventDefault();
        const data = {
            username: credentials.username,
            password: credentials.password
        }
        fetch("http://localhost:8080/sec/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then(response => {
            return response.json()

        })
            .then(body => {
                localStorage.setItem('token', body.token)

                let userData = {
                    'id': body.principal.id,
                    'userName': body.principal.username,
                    'email': body.principal.email,
                    'rolesNames': body.principal.roles
                }
                localStorage.setItem('currentUser', JSON.stringify(userData))
                setCurrentUser(userData)
                {
                    body.principal.roles === 'ADMIN USER'
                        ? navigate("/admin")
                        : navigate("/user")
                }
            })
    }


    return (
        <form onSubmit={login} className="login">
            <h2 className="font-weight-bold text-left">Please sign in</h2>

            <input value={credentials.username}
                   onChange={e => setCredentials({...credentials, username: e.target.value})}
                   type="text"
                   placeholder="Username"
                   className="form-control"
            />

            <input value={credentials.password}
                   onChange={e => setCredentials({...credentials, password: e.target.value})}
                   type="password"
                   placeholder="Password"
                   className="form-control"
            />

            <div className="d-grid gap-2">
                <Button type="submit" className="btn btn-primary margin-top-10">
                    Sign in
                </Button>
            </div>
        </form>
    );
};

export default Login;