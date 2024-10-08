import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useEffect, useState } from "react";

function Profile() {
    const token = Cookies.get('token');
    const [reservations, setReservations] = useState([]);
    const path = import.meta.env.VITE_EXPRESS_BACK_END;

    if (!token) {
        return <p className="text-center text-red-500">No token found. Please log in.</p>;
    }

    const decodedToken = jwtDecode(token);
    const { userId, username, email } = decodedToken.user;

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get(`${path}/reservations/rese_user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setReservations(response.data);
            } catch (error) {
                console.error("Error fetching reservations:", error);
            }
        };

        fetchReservations();
    }, [path, userId, token]);

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="container mx-auto px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg overflow-hidden">
                    <div className="px-6 py-8 bg-gradient-to-r from-blue-500 to-indigo-600">
                        <div className="flex flex-wrap justify-center">
                            <div className="w-full lg:w-3/12 px-4 flex justify-center m-8">
                                <div className="relative">
                                    <img
                                        alt="Profile"
                                        src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
                                        className="shadow-xl rounded-full h-auto align-middle border-none max-w-[150px]"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="text-center text-white">
                            <h3 className="text-4xl font-semibold leading-normal mb-2">{username}</h3>
                            <div className="mb-2 flex justify-center items-center">
                                <i className="fas fa-envelope mr-2 text-lg"></i>
                                <span>{email}</span>
                            </div>
                        </div>
                    </div>

                    <div className="px-6 py-4">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Mes Réservations</h2>
                        {reservations.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {reservations.map(reservation => (
                                    <div key={reservation._id}
                                         className="bg-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105">
                                        <p className="text-gray-700"><strong>Date de la réservation:</strong> {new Date(reservation.date).toLocaleString()}</p>
                                        <p className="text-gray-700">
                                            <strong>Film:</strong> {reservation.seanceId.filmId.title}</p>
                                        <p className="text-gray-700">
                                            <strong>Salle:</strong> {reservation.seanceId.salleId.name}</p>
                                        <p className="text-gray-700"><strong>Prix:</strong> {reservation.seanceId.price} MAD
                                        </p>
                                        <p className={`text-gray-700 ${reservation.isDeleted ? 'text-red-600' : 'text-green-600'}`}>
                                            <strong>Statut:</strong> {reservation.isDeleted ? "Annulée" : "Active"}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-700">Aucune réservation trouvée.</p>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Profile;
