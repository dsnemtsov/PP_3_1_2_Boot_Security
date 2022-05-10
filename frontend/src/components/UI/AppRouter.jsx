import React, {useContext} from 'react';
import {Route, Routes} from "react-router";
import {adminRoutes, publicRoutes, userRoutes} from "../../router/routes";
import {AppContext} from "../../context";

const AppRouter = () => {
    const {currentUser} = useContext(AppContext)

    let result;
    switch (currentUser.rolesNames) {
        case 'ADMIN USER':
            result = <Routes>
                {adminRoutes.map(route =>
                    <Route
                        path={route.path}
                        element={route.component}
                        key={route.path}
                    />
                )}
                {userRoutes.map(route =>
                    <Route
                        path={route.path}
                        element={route.component}
                        key={route.path}
                    />
                )}
                {publicRoutes.map(route =>
                    <Route
                        path={route.path}
                        element={route.component}
                        key={route.path}
                    />
                )}
            </Routes>
            break;

        case 'USER':
            result = <Routes>
                {userRoutes.map(route =>
                    <Route
                        path={route.path}
                        element={route.component}
                        key={route.path}
                    />
                )}
                {publicRoutes.map(route =>
                    <Route
                        path={route.path}
                        element={route.component}
                        key={route.path}
                    />
                )}
            </Routes>
            break;

        default:
            result = <Routes>
                {publicRoutes.map(route =>
                    <Route
                        path={route.path}
                        element={route.component}
                        key={route.path}
                    />
                )}
            </Routes>

    }

    return result;
};

export default AppRouter;