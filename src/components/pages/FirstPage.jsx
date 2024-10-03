import { useState } from 'react';
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react"

function FirstPage() {
    const [querySearch, setQuerySearch] = useState('');
    const navigate = useNavigate()

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Searching for:", querySearch);
    };


    useEffect(() => {
        const token = Cookies.get('token')
        console.log(token)
        if(!token){
            navigate('/login')
        }
    }, []);
    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <section className="relative bg-teal-600">

            </section>

            <section className="py-16 bg-gray-800">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8 text-center">Featured Movies</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        <div
                            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                            <img
                                src="https://via.placeholder.com/300x400"
                                alt="Movie Poster"
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-bold mb-2">Movie Title 1</h3>
                                <p className="text-gray-400">Description of the movie goes here. It&#39;s an amazing
                                    movie!</p>
                            </div>
                        </div>

                        <div
                            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                            <img
                                src="https://via.placeholder.com/300x400"
                                alt="Movie Poster"
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-bold mb-2">Movie Title 2</h3>
                                <p className="text-gray-400">Description of the movie goes here. It&#39;s an amazing
                                    movie!</p>
                            </div>
                        </div>
                        <div
                            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                            <img
                                src="https://via.placeholder.com/300x400"
                                alt="Movie Poster"
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-bold mb-2">Movie Title 3</h3>
                                <p className="text-gray-400">Description of the movie goes here. It&#39;s an amazing
                                    movie!</p>
                            </div>
                        </div>

                        <div
                            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                            <img
                                src="https://via.placeholder.com/300x400"
                                alt="Movie Poster"
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-bold mb-2">Movie Title 4</h3>
                                <p className="text-gray-400">Description of the movie goes here. It&#39;s an amazing
                                    movie!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}

export default FirstPage;