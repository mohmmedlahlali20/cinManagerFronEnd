import React from 'react';

export default function Input({ label, type = 'text', value, onChange, placeholder, required = false, name }) {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
                type={type}
                value={value}
                name={name}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
        </div>
    );
}