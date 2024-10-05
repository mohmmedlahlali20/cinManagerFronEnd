const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '' }) => {
    const baseStyle = "py-2 px-4 rounded transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variantStyle = {
        primary: "bg-teal-600 text-white hover:bg-teal-700 focus:ring-teal-500",
        secondary: "bg-gray-300 text-gray-700 hover:bg-gray-400 focus:ring-gray-400",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseStyle} ${variantStyle[variant]} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
