import { createBrowserRouter } from "react-router-dom";
import { Home, NotFound , Cinema , Firstpage } from "../pages/index.jsx";
import { Login , Register } from "../auth/index.jsx";
import Layout from "../Layouts/Layout.jsx";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/Home",
                element: <Home  />,
            },

        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/Register",
        element: <Register/>
    },

    {
        path: "/*",
        element: <NotFound />,
    },
    {
      path: "/",
        element: <Firstpage />,
    },
    {
        path: "/cinema",
        element: <Cinema />,
    },
]);

export default router;
