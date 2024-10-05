import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from "js-cookie";
import { Button } from "../UI/index.jsx";

function GetMovieById() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const path = import.meta.env.VITE_EXPRESS_BACK_END;
    const token = Cookies.get('token');

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(`${path}/movies/getMovieById/${id}`, {
                    headers: {
                        'accept': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setMovie(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchMovie();
        }
    }, [id, path]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    if (!movie) {
        return <div>Movie not found</div>;
    }

    return (
        <section className="bg-teal-600 min-h-screen">
            <div className="container mx-auto px-4 py-8 ">
                <div>
                    <h1 className="text-3xl font-bold text-center">Détail du film <span
                        className="text-3xl">{movie.title}</span></h1>
                    <div className="flex justify-end">
                        <Link to="/Cinema"
                              className="px-6 py-3 m-3 rounded-full text-white bg-teal-900 hover:bg-teal-600 transition duration-200 flex items-center">
                            <span className="w-full text-xl">⭠</span>
                            <span className="ml-2">Retour</span>
                        </Link>
                    </div>

                </div>

                <div className="bg-white shadow-lg rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-10 gap-4">
                        <div className="md:col-span-3 p-4">
                            <img src={movie.image} alt={movie.title} className="w-full h-full object-cover rounded-lg" />
                        </div>

                        <div className="md:col-span-7 p-4 text-gray-950">
                            <h2 className="text-3xl font-bold text-gray-950 text-center m-2">{movie.title}</h2>
                            <p className="text-gray-950">{movie.description}</p>
                            <p className="text-gray-950">Genre: <strong>{movie.genre}</strong></p>
                            <p className="text-gray-950">Year: <strong>{movie.year}</strong></p>
                            <p className="text-gray-950">Rating: <strong className="text-red-500">{movie.rating}/10</strong></p>
                            <p className="">Director: <strong>{movie.director.username}</strong></p>
                            <div className="flex justify-end">
                                <Button>Reserve une seance</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default GetMovieById;
