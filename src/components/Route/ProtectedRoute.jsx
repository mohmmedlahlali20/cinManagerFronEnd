import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const ProtectedRoute = ({ children }) => {
    const token = Cookies.get('token');

    if (!token) {
        return <Navigate to="/login" />;
    }

    try {
        const user = jwtDecode(token);
        if (user.userRole === 'admin') {
            return children;
        } else {
            return <Navigate to="/notFound" />;
        }
    } catch (error) {
        console.error("Erreur lors du décodage du token :", error);
        return <Navigate to="/login" />;
    }
};

export default ProtectedRoute;
