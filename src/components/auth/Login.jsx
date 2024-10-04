import { useState, useEffect } from 'react';
import {jwtDecode} from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { Input, Button } from '../UI/index.jsx';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

function Login() {
    const path = import.meta.env.VITE_EXPRESS_BACK_END;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setError(null);
        if (e.target.name === 'email') setEmail(e.target.value);
        if (e.target.name === 'password') setPassword(e.target.value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${path}/auth/login`, { email, password });
            console.log('Logged in:', response.data);
            Cookies.set('token', response.data.token, { expires: 7 });

            const token = Cookies.get('token');
            if (token) {
                const user = jwtDecode(token);
                console.log(user);

                if (user.userRole === 'admin') {
                    navigate('/home');
                } else if (user.userRole === 'client') {
                    navigate('/cinema');
                }
            } else {
                setError('No token found. Please try logging in again.');
            }
        } catch (error) {
            setError(error.response?.data?.msg || 'An error occurred during login.');
        }
    };

    useEffect(() => {
        const token = Cookies.get('token');

        if (token) {
            try {
                const user = jwtDecode(token);
                if (user.userRole === 'admin') {
                    navigate('/home');
                } else {
                    navigate('/cinema');
                }
            } catch (error) {
                console.error("Error decoding token:", error);
                setError('Invalid token. Please log in again.');
            }
        }
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-200 to-teal-700">
            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <img
                        src="/assets/image/cinemaLogo.png"
                        alt="Cinema Logo"
                        className="object-contain h-16"
                    />
                </div>

                <form onSubmit={handleLogin}>
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
                        <Input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    <Button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Login
                    </Button>
                </form>

                <div className="mt-6 flex justify-around items-center text-sm text-gray-600">
                    <Link to="/forgot-password" className="hover:underline mb-2">Forgot Password?</Link>
                    <Link to="/register" className="hover:underline mb-2">Create an Account</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
