import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { authRoutes, publicRoutes, unauthRoutes } from "../routes";
import { SHOP_ROUTE } from "../utils/consts";
import { Context } from "../index"

const AppRouter = () => {
    const { client } = useContext(Context);

    //console.log(client);
    return (
        <Routes>
            {localStorage.getItem('token')!=null &&
                authRoutes.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} exact />
                ))};
            {
                localStorage.getItem('token')==null && unauthRoutes.map(({ path, Component }) => (
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