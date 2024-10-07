import { Button, Input } from '../UI/index.jsx';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Addseance() {
    const token = Cookies.get('token');
    const path = import.meta.env.VITE_EXPRESS_BACK_END;

    const [films, setFilms] = useState([]);
    const [salles, setSalles] = useState([]);
    const [formData, setFormData] = useState({
        filmId: '',
        salleId: '',
        price: '',
        date: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const getFilms = async () => {
            try {
                const response = await axios.get(`${path}/movies/getMovies`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setFilms(response.data);
            } catch (e) {
                console.log(e);
                setError('Erreur lors du chargement des films.');
            }
        };

        getFilms();
    }, [path, token]);

    useEffect(() => {
        const getSalles = async () => {
            try {
                const response = await axios.get(`${path}/salles/getSalles`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setSalles(response.data);
            } catch (e) {
                console.log(e);
                setError('Erreur lors du chargement des salles.');
            }
        };

        getSalles();
    }, [path, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${path}/seances/Create_Seance`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);
            setError('');
            alert('Séance ajoutée avec succès !');
        } catch (e) {
            console.log(e);
            setError('Erreur lors de l\'ajout de la séance.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
            <h1 className="text-2xl font-semibold mb-4 text-teal-600">Ajouter une séance</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Film selection */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Film</label>
                    <select
                        className="block w-full p-2 border rounded"
                        value={formData.filmId}
                        onChange={(e) => setFormData({ ...formData, filmId: e.target.value })}
                        required
                    >
                        <option value="">Sélectionner un film</option>
                        {films.map((film) => (
                            <option key={film._id} value={film._id}>
                                {film.title}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Salle selection */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Salle</label>
                    <select
                        className="block w-full p-2 border rounded"
                        value={formData.salleId}
                        onChange={(e) => setFormData({ ...formData, salleId: e.target.value })}
                        required
                    >
                        <option value="">Sélectionner une salle</option>
                        {salles.map((salle) => (
                            <option key={salle._id} value={salle._id}>
                                {salle.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Price input */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Prix</label>
                    <Input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        required
                    />
                </div>

                {/* Date input */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <Input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        required
                    />
                </div>

                {/* Submit button */}
                <div className="flex justify-end">
                    <Button type="submit" variant="primary">
                        Ajouter
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Addseance;
