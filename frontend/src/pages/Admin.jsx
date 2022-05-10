import React, {useContext, useEffect} from "react";
import './../styles/App.css'
import AdminMainPanel from "../components/panel/AdminMainPanel";
import AdminSidePanel from "../components/panel/AdminSidePanel";
import Navbar from "../components/navbar/Navbar";
import {AppContext} from "../context";

function Admin() {
    const {users, setUsers} = useContext(AppContext)

    useEffect(() => {
        fetchUsers()
    }, [])

    async function fetchUsers() {
        fetch("http://localhost:8080/users", {
                headers: {
                'X-Auth-Token': localStorage.getItem('token')
            }
        })
            .then(response => {
            return response.json()
        })
            .then(body => {
            setUsers(body)
            })
    }

    return (

        <div className="App">
            <Navbar/>

            <div className="container-fluid" style={{padding: 0}}>
                <div className="row">
                    <AdminSidePanel/>
                    <AdminMainPanel
                        users={users}
                    />

                </div>
            </div>

        </div>
    );
}

export default Admin;