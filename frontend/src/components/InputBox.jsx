const InputBox = ({label, placeholder, type = "text",onChange}) => {
    return (
        <div className="mb-4">
            <div className="text-sm font-medium mb-2 text-left">
                {label}
            </div>
            <input 
                onChange={onChange}
                type={type}
                placeholder={placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    )
}

export default InputBox;