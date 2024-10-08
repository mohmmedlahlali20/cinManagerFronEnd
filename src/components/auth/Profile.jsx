import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

function Profile() {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const path = import.meta.env.VITE_EXPRESS_BACK_END;
    const token = Cookies.get('token');
    const user = token ? jwtDecode(token) : null;

    const getProfile = async () => {
        try {
            const response = await axios.get(`${path}/auth/me/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setUserDetails(response.data);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.msg || 'An error occurred');
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user && user.userId) {
            getProfile();
        }
    }, [user]);

    if (loading) return <p>Enlargement du profile...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Profil Utilisateur</h1>
            {userDetails ? (
                <div>
                    <p><strong>Nom:</strong> {userDetails.username}</p>
                    <p><strong>Email:</strong> {userDetails.email}</p>
                    <p><strong>ID:</strong> {userDetails.role}</p>
                </div>
            ) : (
                <p>Aucun utilisateur trouvé</p>
            )}
        </div>
    );
}

export default Profile;
