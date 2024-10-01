import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Layout from "../Layouts/Layout.jsx";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/home",
                exact: true,
                element: <Home /> 
            }
        ]
    }
]);

export default router;
