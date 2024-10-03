import { useState } from 'react';

function SideBar({ onSearch }) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        onSearch(term);
    };

    return (
        <>
            <button
                onClick={toggleSidebar}
                className="md:hidden flex flex-col items-center justify-center w-10 h-10 bg-teal-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            >
                <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H4ZM7 12C7 11.4477 7.44772 11 8 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H8C7.44772 13 7 12.5523 7 12ZM13 18C13 17.4477 13.4477 17 14 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H14C13.4477 19 13 18.5523 13 18Z"
                        fill="#ffffff"
                    />
                </svg>
            </button>

            <div className={`fixed md:relative inset-0 md:inset-auto bg-teal-600 h-screen md:h-auto text-white shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 md:translate-x-0 md:w-64 w-64 z-40`}>
                <div className="p-4 flex justify-center">
                    <img className="h-16" src="src/assets/image/cinemaLogo.png" alt="Cinema Logo" />
                </div>

                <ul className="space-y-4 px-2">
                    <div className="flex items-center p-4 rounded-md">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                className="w-full border border-gray-300 text-gray-600 p-2 rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                placeholder="Search movies..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <li className="p-2 hover:bg-teal-500 rounded-md cursor-pointer flex items-center transition-colors">
                        <span className="ml-2">Dashboard</span>
                    </li>
                </ul>
            </div>

            {isOpen && (
                <div className="fixed inset-0 bg-black opacity-50 md:hidden z-30" onClick={toggleSidebar} />
            )}
        </>
    );
}

export default SideBar;
