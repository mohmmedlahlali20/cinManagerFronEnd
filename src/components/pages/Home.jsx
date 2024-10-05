import { useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Button } from '../UI/index.jsx';

function Home() {
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = Cookies.get('token');
    const path = import.meta.env.VITE_EXPRESS_BACK_END;

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                console.log(token);
                const response = await axios.get(`${path}/movies/getMovies`, {
                    headers: {
                        'accept': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data);

                if (response.data.length === 0) {
                    throw new Error('No movies found');
                }

                setFilteredMovies(response.data);
                setLoading(false);
            } catch (er) {
                console.error(er.message);
                setLoading(false);
            }
        };

        fetchMovies();
    }, [token, path]);




    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Films en Vedette</h2>

            {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : filteredMovies.length === 0 ? (
                <p className="text-center text-gray-500">No results found</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {filteredMovies.map((movie) => (
                        <div key={movie.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img src={movie.image || "/default-image.jpg"} alt={movie.title} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold">{movie.title}</h3>
                                <p className="text-gray-600">{movie.year}</p>
                                <p className="text-gray-600">{movie.genre}</p>
                                <Button className="mt-2 bg-teal-600 text-white py-2 px-4 rounded">
                                    Voir Détails
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;
