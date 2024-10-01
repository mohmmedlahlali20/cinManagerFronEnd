import SideBar from "./SideBar.jsx";
import {Outlet} from "react-router-dom";
import Footer from "./Footer.jsx";

function Layout() {
    return (
        <div className="grid grid-cols-[250px_1fr] h-screen">
            <SideBar/>

            <div className="flex flex-col justify-between bg-gray-100">
                <main className="flex-grow p-8">
                    <Outlet/>
                </main>

                <Footer/>
            </div>
        </div>
    );
}

export default Layout;