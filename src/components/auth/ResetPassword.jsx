import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';  // useParams to get token from URL
import axios from 'axios';

const ResetPassword = () => {
    const { token } = useParams();  // Extract token from URL

    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const path = import.meta.env.VITE_EXPRESS_BACK_END;

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        if (newPassword.length < 8) {
            setError('Password must be at least 8 characters long.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${path}/auth/reset-password/${token}`, { newPassword });
            console.log('Password reset:', response.data);
            navigate('/login');
        } catch (err) {
            const errorMsg = err.response?.data?.msg || 'An error occurred while resetting the password.';
            setError(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Reset Password</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleResetPassword}>
                    <div className="mb-6">
                        <label htmlFor="newPassword" className="block text-gray-700 font-semibold mb-2">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your new password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full py-2 px-4 text-white font-semibold rounded-lg transition duration-300 ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
