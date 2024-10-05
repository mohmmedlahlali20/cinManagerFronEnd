import SideBar from "./SideBar.jsx";
import { Outlet} from "react-router-dom";
import Footer from "./Footer.jsx";
import { useState } from "react";
import ProtectedRoute from "../Route/ProtectedRoute.jsx";

function Layout() {
    const [, setSearchTerm] = useState('');

    const handleSearch = (term) => {
        setSearchTerm(term);
    };




    return (
        <ProtectedRoute >
        <div className="flex bg-gray-50 min-h-screen">
            <SideBar onSearch={handleSearch} />
            <div className="flex-grow flex flex-col justify-between bg-white shadow-md">
                <main className="flex-grow p-6 md:p-8">
                    <Outlet  />
                </main>
                <Footer />
            </div>
        </div>
        </ProtectedRoute>
    );
}

export default Layout;
