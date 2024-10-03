
// eslint-disable-next-line react/prop-types
const Button = ({ children, onClick, type = 'button', variant = 'primary', className }) => {
    const baseStyle = "py-2 px-4 rounded transition ";
    const variantStyle = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-300 text-gray-700 hover:bg-gray-400",
        danger: "bg-red-600 text-white hover:bg-red-700",
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