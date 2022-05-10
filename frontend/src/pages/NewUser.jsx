import React, {useEffect, useState} from "react";
import './../styles/App.css'
import AdminSidePanel from "../components/panel/AdminSidePanel";
import NewUserPanel from "../components/panel/NewUserPanel";
import Navbar from "../components/navbar/Navbar";


function NewUser() {
    const [users, setUsers] = useState([])

    const createUser = (result, err) => {
        if (err) {
            console.log(err)
        } else {
            setUsers([...users, result])
        }
    }

    return (

        <div className="App">
            <Navbar/>

            <div className="container-fluid" style={{padding: 0}}>
                <div className="row">
                    <AdminSidePanel/>
                    <NewUserPanel
                        users={users}
                        create={createUser}
                    />

                </div>
            </div>
        </div>
    );
}

export default NewUser;