import { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Cinema.css'

function Cinema() {
    const [querySearch, setQuerySearch] = useState('');
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const path = import.meta.env.VITE_EXPRESS_BACK_END;
    const token = Cookies.get('token');

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Searching for:", querySearch);
        const filtered = filteredMovies.filter(movie =>
            movie.title.toLowerCase().includes(querySearch.toLowerCase())
        );
        setFilteredMovies(filtered);
    };

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${path}/movies/getMovies`, {
                    headers: {
                        'accept': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                setFilteredMovies(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchMovies();
        } else {
            navigate('/login');
        }
    }, [token, path, navigate]);

    if (loading) {
        return (
            <div className="newtons-cradle">
                <div className="newtons-cradle__dot"></div>
                <div className="newtons-cradle__dot"></div>
                <div className="newtons-cradle__dot"></div>
                <div className="newtons-cradle__dot"></div>
            </div>
        );
    }


    if (error) return <div>Error: {error}</div>;

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <section className="relative bg-teal-600">
            <div className="container mx-auto px-4 py-16 text-center">
                    <h1 className="text-5xl font-bold mb-4 animate-fadeInUp">
                        Welcome to MovieTime
                    </h1>
                    <p className="text-lg mb-8 animate-fadeInUp delay-200">
                        Find your next favorite movie here!
                    </p>
                    <div className="flex justify-center items-center animate-fadeInUp delay-400">
                        <form onSubmit={handleSearch} className="relative w-full max-w-lg">
                            <input
                                type="text"
                                className="w-full px-6 py-3 rounded-full bg-gray-800 text-gray-300 focus:outline-none focus:ring-4 focus:ring-teal-400"
                                placeholder="Search for movies..."
                                value={querySearch}
                                onChange={(e) => setQuerySearch(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="absolute right-0 top-0 mt-1 mr-1 p-2 bg-teal-600 rounded-full hover:bg-teal-700 transition duration-200"
                            >
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gray-800">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8 text-center">Featured Movies</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {filteredMovies.map((movie, index) => (
                            <div
                                key={index}
                                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                                <img
                                    src={movie.image}
                                    alt={movie.title}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
                                    <p className="text-gray-400">{movie.description || "Description of the movie goes here."}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Cinema;
