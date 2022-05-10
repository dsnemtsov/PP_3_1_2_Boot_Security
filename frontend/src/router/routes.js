import Admin from "../pages/Admin";
import Home from "../pages/Home";
import NewUser from "../pages/NewUser";
import Login from "../pages/Login";
import User from "../pages/User";

export const adminRoutes = [
    {path: '/admin', component: <Admin/>},
    {path: '/new', component: <NewUser/>}
]

export const userRoutes = [
    {path: '/user', component: <User/>}
]

export const publicRoutes = [
    {path: '/', component: <Home/>},
    {path: '/login', component: <Login/>},
]