
function SideBar() {
    return (
        <div className="h-screen w-64 bg-gray-900 text-white shadow-lg">
            <div className="p-4">
                <h2 className="text-2xl font-semibold text-center mb-6">Cinema Sidebar</h2>
            </div>
            <ul className="space-y-4">
                <li className="p-2 hover:bg-gray-700 rounded-md cursor-pointer flex items-center">
                    <span className="mr-3">🎬</span> Home
                </li>
                <li className="p-2 hover:bg-gray-700 rounded-md cursor-pointer flex items-center">
                    <span className="mr-3">📽️</span> Movies
                </li>
                <li className="p-2 hover:bg-gray-700 rounded-md cursor-pointer flex items-center">
                    <span className="mr-3">⭐</span> Trending
                </li>
                <li className="p-2 hover:bg-gray-700 rounded-md cursor-pointer flex items-center">
                    <span className="mr-3">🎟️</span> Tickets
                </li>
                <li className="p-2 hover:bg-gray-700 rounded-md cursor-pointer flex items-center">
                    <span className="mr-3">📞</span> Contact
                </li>
            </ul>
            <hr className="my-6 border-gray-700" />
            <div className="p-4">
                <p className="text-sm text-gray-400">© 2024 Cinema App</p>
            </div>
        </div>
    );
}

export default SideBar;
