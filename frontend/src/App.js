import React, {useState} from "react";
import './styles/App.css'
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/UI/AppRouter";
import {AppContext} from "./context";
import axios from "axios";

axios.interceptors.request.use((request) => {
    if (localStorage.getItem('token') != null) {
        request.headers.common['X-Auth-Token'] = localStorage.getItem('token')
    }
    return request;
}, (error) => {
    console.log(error)
})


function App() {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(() => {
        if (localStorage.getItem('currentUser') != null) {
            return JSON.parse(localStorage.getItem('currentUser'))
        }
        return {role: "ROLE_GUEST"}
    })

    return (
        <AppContext.Provider value={{
            currentUser,
            setCurrentUser,
            users,
            setUsers
        }}>
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        </AppContext.Provider>
    )
}

export default App;
