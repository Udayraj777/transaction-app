const Button = ({label, onClick}) => {
    return (
        <button 
            onClick={onClick}
            className="w-full bg-black text-white py-3 px-4 rounded-md font-medium hover:bg-gray-800 mt-6"
        >
            {label}
        </button>
    )
}

export default Button;