import { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import { Button } from "../UI/index.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Cinema.css';

function Cinema() {
    const [querySearch, setQuerySearch] = useState('');
    const [movies, setMovies] = useState([]); // Original list of movies
    const [filteredMovies, setFilteredMovies] = useState([]); // Filtered list
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const path = import.meta.env.VITE_EXPRESS_BACK_END;
    const token = Cookies.get('token');

    const handleSearch = (e) => {
        e.preventDefault();
        const filtered = movies.filter(movie =>
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
                setMovies(response.data);
                setFilteredMovies(response.data);
            } catch (err) {
                if (err.response.status === 401) {
                    navigate('/login');
                } else {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchMovies();
        }
    }, [token, path, navigate]);

    const handleLogout = () => {
        Cookies.remove('token');
        navigate('/login');
    };

    const handleGetMovie = (movie) => {
        navigate(`/GetMovie/${movie._id}`);
    };
    ;

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

    if (error) return <div className="text-red-500 text-center">Error: {error}</div>;

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <section className="relative bg-teal-600">
                <div className="flex justify-end p-5">
                    <Button
                        onClick={handleLogout}
                        className="px-6 py-3 rounded-full bg-teal-600 text-white hover:bg-teal-700 transition duration-200"
                    >
                        <svg fill="#000000" height="1em" width="8em" version="1.1" id="Capa_1"
                             xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                             viewBox="0 0 384.971 384.972" xmlSpace="preserve">
                            <g>
                                <g id="Sign_Out">
                                    <path d="M180.455,360.91H24.061V24.061h156.394c6.641,0,12.03-5.39,12.03-12.03s-5.39-12.03-12.03-12.03H12.03
                                        C5.39,0.001,0,5.39,0,12.031V372.94c0,6.641,5.39,12.03,12.03,12.03h168.424c6.641,0,12.03-5.39,12.03-12.03
                                        C192.485,366.299,187.095,360.91,180.455,360.91z"/>
                                    <path d="M381.481,184.088l-83.009-84.2c-4.704-4.752-12.319-4.74-17.011,0c-4.704,4.74-4.704,12.439,0,17.179l62.558,63.46H96.279
                                                  c-6.641,0-12.03,5.438-12.03,12.151c0,6.713,5.39,12.151,12.03,12.151h247.74l-62.558,63.46c-4.704,4.752-4.704,12.439,0,17.179
                                        c4.704,4.752,12.319,4.752,17.011,0l82.997-84.2C386.113,196.588,386.161,188.756,381.481,184.088z"/>
                                </g>
                            </g>
                        </svg>
                    </Button>
                </div>
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
                        {filteredMovies.length > 0 ? (
                            filteredMovies.map((movie, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                                    <img
                                        src={movie.image}
                                        alt={movie.title}
                                        className="w-full h-64 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-xl font-bold mb-2">titel : {movie.title}</h3>
                                        <p className="text-gray-400">genre : {movie.genre}</p>
                                        <p className="text-gray-400">the date of the advertisement : {movie.year}</p>
                                    </div>
                                    <Button
                                        onClick={() => handleGetMovie(movie)}
                                        className="w-50 m-2 align-baseline text-white bg-teal-600 rounded-full py-2 px-4 hover:bg-teal-700 transition duration-200"
                                    >
                                        Details
                                    </Button>
                                </div>
                            ))
                        ) : (
                            <div>
                                <div className="flex flex-col items-center justify-center h-64 bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                                    <img
                                        src="src/assets/404.png"
                                        alt="Loading..."
                                        className="w-24 h-24 object-cover mb-4 transition-transform transform hover:scale-125"
                                    />
                                    <h3 className="text-2xl font-bold text-white mb-2">Loading Movies...</h3>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Cinema;
