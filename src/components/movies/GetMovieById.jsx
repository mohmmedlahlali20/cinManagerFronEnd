import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from "js-cookie";
import { Button } from "../UI/index.jsx";
import { jwtDecode } from "jwt-decode";
import Swal from 'sweetalert2';

function GetMovieById() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [seances, setSeances] = useState([]);
    const [chairs, setChairs] = useState([]);
    const [loadingChairs, setLoadingChairs] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedSeanceId, setSelectedSeanceId] = useState(null); // Add this line

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

        const getSeances = async () => {
            try {
                const response = await axios.get(`${path}/seances/GetSeanceByFilmId/${id}`, {
                    headers: {
                        'accept': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setSeances(response.data);
            } catch (err) {
                setError(err.message);
            }
        };

        if (id) {
            fetchMovie();
            getSeances();
        }
    }, [id, path, token]);

    const getChairsBySalleId = async (salleId, seanceId) => {
        setSelectedSeanceId(seanceId); // Set the selected seance id here
        setLoadingChairs(true);
        try {
            const response = await axios.get(`${path}/chairs/get/${salleId}`, {
                headers: {
                    'accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            setChairs(response.data);
            console.log(response.data)
            setShowModal(true);
        } catch (e) {
            console.error('Erreur lors de la récupération des chaises:', e);
            setError(e.message);
        } finally {
            setLoadingChairs(false);
        }
    };

    const handleChairClick = async (chair) => {
        if (chair.available) {
            const user = jwtDecode(token);
            try {
                const response = await axios.post(`${path}/reservations/create`, {
                    seanceId: selectedSeanceId,
                    userId: user.user.userId,
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                    },
                });

                console.log('Reservation created:', response.data);

                Swal.fire({
                    title: 'Réservation réussie!',
                    text: 'Votre réservation a été créée avec succès.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } catch (error) {
                console.error('Error creating reservation:', error);
                setError(error.message);
            }
        }  else {
            console.log('Désolé, cette chaise n\'est pas disponible.');

            Swal.fire({
                title: 'Chaise non disponible!',
                text: 'Désolé, cette chaise n\'est pas disponible.',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
        }
    };




    if (!movie) {
        return <div>Movie not found</div>;
    }

    return (
        <section className="bg-teal-600 min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <div>
                    <h1 className="text-3xl font-bold text-center">
                        Détail du film <span className="text-3xl">{movie.title}</span>
                    </h1>
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
                            <img src={movie.image} alt={movie.title} className="w-full h-full object-cover rounded-lg"/>
                        </div>

                        <div className="md:col-span-7 p-4 text-gray-950">
                            <h2 className="text-3xl font-bold text-gray-950 text-center m-2">{movie.title}</h2>
                            <p className="text-gray-950">{movie.description}</p>
                            <p className="text-gray-950">Genre: <strong>{movie.genre}</strong></p>
                            <p className="text-gray-950">Year: <strong>{movie.year}</strong></p>
                            <p className="text-gray-950">Rating: <strong
                                className="text-red-500">{movie.rating}/10</strong></p>
                            <p className="">Director: <strong>{movie.director.username}</strong></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 py-8">
                {/* Your existing JSX for displaying seances */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {seances.length > 0 ? (
                        seances.map((seance) => (
                            <div key={seance._id}
                                 className="bg-gray-100 rounded-lg p-4 shadow-md transition-transform transform hover:scale-105">
                                <div className="flex flex-col items-center">
                                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                                        Date: <strong>{new Date(seance.date).toLocaleDateString('fr-FR')}</strong>
                                    </h2>
                                    <p className="text-lg text-gray-600 mb-4">
                                        Heure: <strong>{new Date(seance.date).toLocaleTimeString('fr-FR', {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}</strong>
                                    </p>
                                    <div>
                                        <Button
                                            onClick={() => getChairsBySalleId(seance.salleId._id, seance._id)} // Pass the seance id
                                            className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition duration-200">
                                            Voir les chaises
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-950">Aucune séance disponible pour ce film</p>
                    )}
                </div>
            </div>
            {showModal ? (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div
                        className="bg-white shadow-2xl rounded-lg p-8 max-w-md w-full transform transition-transform duration-300 scale-100">
                        <h3 className="text-xl font-bold mb-4">Chaises du salle: {movie.title}</h3>
                        {loadingChairs ? (
                            <p className="text-gray-700">Chargement des chaises...</p>
                        ) : (
                            <div className="grid grid-cols-4 gap-4">
                                {chairs.map((chair, index) => (
                                    <div
                                        key={index}
                                        className={`rounded-lg flex justify-center items-center 
                                        ${chair.available ? 'bg-green-400 cursor-pointer' : 'bg-red-400'}`}
                                        onClick={() => handleChairClick(chair)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="currentColor"
                                             className="w-16 h-16">
                                            <g>
                                                <path
                                                    d="M48 4h-8v16h8c1.1 0 2 .9 2 2v16H14V22c0-1.1.9-2 2-2h8V4h-8C9.1 4 4 9.1 4 16v40c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-6h40v6c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2V16c0-6.9-5.1-12-12-12zM24 4h16v16H24V4zm32 52H8V22h48v34z"/>
                                                <path d="M10 46h44v4H10zM10 38h44v4H10z"/>
                                            </g>
                                        </svg>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="flex justify-end mt-4">
                            <Button
                                onClick={() => setShowModal(false)}
                                className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition duration-200">
                                Fermer
                            </Button>
                        </div>
                    </div>
                </div>
            ) : null}
        </section>
    );
}

export default GetMovieById;
