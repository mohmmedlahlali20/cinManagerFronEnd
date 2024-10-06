import { Button, Input } from '../UI/index.jsx';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Addseance() {
    const token = Cookies.get('token');
    const path = import.meta.env.VITE_EXPRESS_BACK_END;
    const [films, setFilms] = useState([]);
    const [formData, setFormData] = useState({
        filmId: '',
        sessionDate: '',
        sessionTime: '',
        availableSeats: '',
    });

    useEffect(() => {
        const getFilms = async () => {
            try {
                const response = await axios.get(`${path}/movies/getMovies`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setFilms(response.data);
                console.log(response.data);
            } catch (e) {
                console.log(e);
            }
        };

        getFilms();
    }, [path, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div>
            <h1>Ajouter une séance</h1>
            <form onSubmit={handleSubmit}>
                <select
                    name="filmId"
                    value={formData.filmId}
                    onChange={handleChange}
                >
                    <option value="" disabled>Select a film</option>
                    {films.map((film) => (
                        <option key={film.id} value={film.id}>
                            {film.name}
                        </option>
                    ))}
                </select>
                <Input
                    type="date"
                    name="sessionDate"
                    placeholder="Date de la séance"
                    value={formData.sessionDate}
                    onChange={handleChange}
                />
                <Input
                    type="time"
                    name="sessionTime"
                    placeholder="Heure de la séance"
                    value={formData.sessionTime}
                    onChange={handleChange}
                />
                <Input
                    type="number"
                    name="availableSeats"
                    placeholder="Nombre de places disponibles"
                    value={formData.availableSeats}
                    onChange={handleChange}
                />
                <Button type="submit">Ajouter la séance</Button>
            </form>
        </div>
    );
}

export default Addseance;
