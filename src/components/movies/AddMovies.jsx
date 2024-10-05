import React, { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2'; // Import SweetAlert

function AddMovies() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        year: '',
        genre: '',
        rating: '',
        image: null,
    });
    const path = import.meta.env.VITE_EXPRESS_BACK_END;

    const genres = ['Action', 'Drama', 'Thriller', 'Comedy', 'Fantasy'];

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'file' ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = Cookies.get('token');
        let userId;

        if (token) {
            try {
                const user = jwtDecode(token);
                userId = user.userId;
            } catch (error) {
                console.error('Failed to decode token:', error);
                return;
            }
        } else {
            console.error('No token found');
            return;
        }

        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });
        data.append('director', userId);

        try {
            const response = await axios.post(`${path}/movies/create-movies`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });

            // Show success alert
            Swal.fire({
                title: 'Film Added!',
                text: 'The film has been successfully added.',
                icon: 'success',
                confirmButtonText: 'OK',
            });

            // Reset form fields
            setFormData({
                title: '',
                description: '',
                year: '',
                genre: '',
                rating: '',
                image: null,
            });

            console.log('Film added:', response.data);
        } catch (error) {
            // Show error alert
            Swal.fire({
                title: 'Error!',
                text: error.response ? error.response.data.msg : error.message,
                icon: 'error',
                confirmButtonText: 'OK',
            });

            console.error('Error adding film:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-8 bg-gray-800 text-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Add New Film</h2>
            <form onSubmit={handleSubmit} className="space-y-6">

                <div>
                    <label className="block text-sm font-medium text-gray-300">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Enter film title"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Enter film description"
                        rows="3"
                        required
                    ></textarea>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300">Year</label>
                    <input
                        type="number"
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Enter release year"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300">Genre</label>
                    <select
                        name="genre"
                        value={formData.genre}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                        required
                    >
                        <option value="" disabled>Select genre</option>
                        {genres.map((genre) => (
                            <option key={genre} value={genre}>{genre}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300">Rating</label>
                    <input
                        type="number"
                        name="rating"
                        value={formData.rating}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Enter rating (0-10)"
                        min="0"
                        max="10"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300">Image</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                        required
                    />
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-md shadow-lg transition duration-300"
                    >
                        Add Film
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddMovies;
