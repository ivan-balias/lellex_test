import {createBrowserRouter} from "react-router-dom";
import Users, {UsersLoader} from "./pages/Users/users";
import User, {UserLoader} from "./pages/Users/user";
import React from "react";
import CreateUser from "./pages/Users/create";
import Followed from "./pages/Users/followed";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Users/>,
        loader: UsersLoader,
    },
    {
        path: '/user/new',
        element: <CreateUser/>
    },
    {
        path: '/user/:id',
        element: <User/>,
        loader: UserLoader,
    },

    {
        path: '/user/followed',
        element: <Followed/>,
    },

])

export default router
