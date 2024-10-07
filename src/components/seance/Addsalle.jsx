import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Button, Input } from "../UI/index.jsx";

function Addsalle() {
    const path = import.meta.env.VITE_EXPRESS_BACK_END;
    const [name, setName] = useState('');
    const [capacite, setCapacite] = useState('0');
    const [typeSalle, setTypeSalle] = useState('Standard')
    const token = Cookies.get('token');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name') setName(value);
        if (name === 'capacite') setCapacite(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${path}/salles/create-salle`, {
                name,
                capacite,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log('Salle added:', response.data);
            setName('');
            setCapacite('0');
            setTypeSalle('Standard');
        } catch (error) {
            console.error('Error adding salle:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-teal-500 rounded-lg shadow-lg p-8 max-w-md w-full">
                <h1 className="text-2xl font-semibold text-center text-gray-900">Add New Salle</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Salle Name:</label>
                        <Input
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="capacite" className="block text-sm font-medium text-gray-700">Capacity:</label>
                        <Input
                            type="number"
                            name="capacite"
                            id="capacite"
                            value={capacite}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                        />
                    </div>

                    <Button type="submit" className="w-full mt-4 bg-teal-600 text-white font-semibold py-2 rounded-md hover:bg-teal-700 transition duration-200">Add Salle</Button>
                </form>
            </div>
        </div>
    );
}

export default Addsalle;
