import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ element: Component }) => {
    const token = Cookies.get('token');

    if (!token) {
        return <Navigate to="/login" />;
    }

    try {
        const user = jwtDecode(token);
        console.log(user.userRole)
        if (user.userRole === 'admin') {
            return <Component />;
        } else {
            return <Navigate to="/notFound" />;
        }
    } catch (error) {
        console.error("Erreur lors du décodage du token :", error);
        return <Navigate to="/login" />;
    }
};

export default ProtectedRoute;
