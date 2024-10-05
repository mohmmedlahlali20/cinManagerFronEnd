import { createBrowserRouter } from "react-router-dom";
import {
    DashboardAdmin,
    NotFound,
    Cinema,
    HomePage
} from "../pages/index.jsx";
import {
    Login,
    Register,
    ResetPassword,
    ForgotPassword
} from "../auth/index.jsx";

import {
    AddMovies,
    GetMovieById
} from "../movies/index.jsx";

import Layout from "../Layouts/Layout.jsx";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/DashboardAdmin",
                element: <DashboardAdmin />,
            },
            {
                path: "/add-movies",
                element: <AddMovies />,
            },
        ],
    },
    {
        path: "/GetMovie/:id",
        element: <GetMovieById />,
    },

    {
        path: "/cinema",
        element: <Cinema />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/forgot-password",
        element: <ForgotPassword />,
    },
    {
        path: "/reset-password/:token",
        element: <ResetPassword />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/*",
        element: <NotFound />,
    },
    {
        path: "/",
        element: <HomePage />,
    },
]);

export default router;
