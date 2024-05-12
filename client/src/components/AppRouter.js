import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import { SHOP_ROUTE } from "../utils/consts";
import {Context} from "../index"

const AppRouter = () => {
    const {client} = useContext(Context);

    console.log(client);
    return (
        <Routes>
            {client.isAuth === true &&
                authRoutes.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} exact />
                ))};
            {publicRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} exact />
            ))};
            <Route path='*' key={'*'} element={<Navigate to={SHOP_ROUTE} />} exact />
        </Routes>
    );
};

export default AppRouter;