import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Button } from '../UI/index.jsx';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

function DashboardAdmin() {
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const token = Cookies.get('token');
    const path = import.meta.env.VITE_EXPRESS_BACK_END;

    const genres = ['Action', 'Drama', 'Thriller', 'Comedy', 'Fantasy'];

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(`${path}/movies/getMovies`, {
                    headers: {
                        'accept': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.length === 0) {
                    throw new Error('No movies found');
                }

                setFilteredMovies(response.data);
            } catch (error) {
                console.error(error.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to load movies. Please try again later.',
                    confirmButtonText: 'OK',
                });
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [token, path]);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won’t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`${path}/movies/delete-movie/${id}`, {
                    headers: {
                        'accept': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                setFilteredMovies(prevMovies => prevMovies.filter((movie) => movie._id !== id));

                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Movie deleted successfully!',
                    confirmButtonText: 'OK',
                });
            } catch (error) {
                console.error("Error deleting movie:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to delete the movie. Please try again.',
                    confirmButtonText: 'OK',
                });
            }
        }
    };

    const handleEdit = (movie) => {
        setSelectedMovie(movie);
        setShowModal(true);
    };

    const handleUpdate = async () => {
        if (!selectedMovie) return;

        const formData = new FormData();
        formData.append('title', selectedMovie.title);
        formData.append('genre', selectedMovie.genre);
        formData.append('description', selectedMovie.description);
        formData.append('rating', selectedMovie.rating);
        formData.append('year', selectedMovie.year);
        if (selectedMovie.imageFile) {
            formData.append('image', selectedMovie.imageFile);
        }

        try {
            const response = await axios.put(`${path}/movies/update-movie/${selectedMovie._id}`, formData, {
                headers: {
                    'accept': 'application/json',
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Updated Movie Response:', response.data);

            setFilteredMovies(prevMovies =>
                prevMovies.map(movie => (movie._id === selectedMovie._id ? response.data : movie))
            );
            setShowModal(false);
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Movie updated successfully!',
                confirmButtonText: 'OK',
            });
        } catch (error) {
            console.error("Error updating movie:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to update the movie. Please try again.',
                confirmButtonText: 'OK',
            });
        }
    };

    const handleFileChange = (e) => {
        setSelectedMovie({ ...selectedMovie, imageFile: e.target.files[0] });
    };

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
                        <div key={movie._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img src={movie.image || "/default-image.jpg"} alt={movie.title} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold">{movie.title}</h3>
                                <p className="text-gray-600">{movie.year}</p>
                                <p className="text-gray-600">{movie.genre}</p>
                                <div className="space-y-2">
                                    <Button onClick={() => handleDelete(movie._id)} variant="danger">
                                        Delete
                                    </Button>
                                    <Button onClick={() => handleEdit(movie)} variant="primary">
                                        Edit
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-4 w-11/12 md:w-1/3">
                        <h3 className="text-xl font-semibold mb-4">Update Movie</h3>
                        <div className="flex space-x-2">
                            <div className="flex-1">
                                <label>Title</label>
                                <input
                                    type="text"
                                    value={selectedMovie.title}
                                    onChange={(e) => setSelectedMovie({ ...selectedMovie, title: e.target.value })}
                                    className="border border-gray-300 rounded w-full p-2 mb-2"
                                />
                            </div>
                            <div className="flex-1">
                                <label>Genre</label>
                                <select
                                    value={selectedMovie.genre}
                                    onChange={(e) => setSelectedMovie({ ...selectedMovie, genre: e.target.value })}
                                    className="border border-gray-300 rounded w-full p-2 mb-2"
                                >
                                    {genres.map((genre) => (
                                        <option key={genre} value={genre}>{genre}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label>Description</label>
                            <textarea
                                value={selectedMovie.description}
                                onChange={(e) => setSelectedMovie({ ...selectedMovie, description: e.target.value })}
                                className="border border-gray-300 rounded w-full p-2 mb-2"
                            />
                        </div>
                        <div>
                            <label>Image Upload</label>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="border border-gray-300 rounded w-full p-2 mb-2"
                            />
                        </div>
                        <div className="flex space-x-2">
                            <div className="flex-1">
                                <label>Rating</label>
                                <input
                                    type="number"
                                    value={selectedMovie.rating}
                                    onChange={(e) => setSelectedMovie({ ...selectedMovie, rating: e.target.value })}
                                    className="border border-gray-300 rounded w-full p-2 mb-2"
                                />
                            </div>
                            <div className="flex-1">
                                <label>Year</label>
                                <input
                                    type="number"
                                    value={selectedMovie.year}
                                    onChange={(e) => setSelectedMovie({ ...selectedMovie, year: e.target.value })}
                                    className="border border-gray-300 rounded w-full p-2 mb-2"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button onClick={handleUpdate} variant="primary">
                                Update
                            </Button>
                            <Button onClick={() => setShowModal(false)} variant="secondary">
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DashboardAdmin;
