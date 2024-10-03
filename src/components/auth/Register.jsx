import  { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { Input, Button } from '../UI/index.jsx';
import axios from "axios";

function Register() {
    const path = import.meta.env.VITE_EXPRESS_BACK_END;
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const navigate = useNavigate()

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        setErrors({ ...errors, [e.target.name]: null });
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (formData.password !== formData.confirmPassword) {
            setErrors({ confirmPassword: 'Les mots de passe ne correspondent pas' });
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${path}/auth/register`, {
                username: formData.username,
                email: formData.email,
                password: formData.password
            });
            navigate('/login')
            console.log('Réponse :', response.data);



            console.log('Inscription réussie');
        } catch (error) {
            setErrors({ submit: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-200 to-teal-700">
            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <img
                        src="src/assets/image/cinemaLogo.png"
                        alt="Cinema Logo"
                        className="object-contain h-16"
                    />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Register</h2>

                {errors.submit && <p className="text-red-500 text-center mb-4">{errors.submit}</p>}
                {errors.confirmPassword && <p className="text-red-500 text-center mb-4">{errors.confirmPassword}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">Nom</label>
                        <Input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Entrez votre nom"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Entrez votre email"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Mot de passe</label>
                        <Input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Entrez votre mot de passe"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold mb-2">Confirmer le mot de passe</label>
                        <Input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Confirmez votre mot de passe"
                            required
                        />
                    </div>

                    <Button
                        type="submit"
                        className={`w-full py-3 text-white font-semibold rounded-lg transition duration-300 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Enregistrement...' : "S'inscrire"}
                    </Button>
                </form>

                <div className="mt-6 flex justify-center text-sm text-gray-600">
                    <Link to="/login" className="hover:underline">Vous avez déjà un compte ? Connexion</Link>
                </div>
            </div>
        </div>
    );
}

export default Register;
