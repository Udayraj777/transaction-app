const BottomWarning = ({label, buttonText, to}) => {
    return (
        <div className="text-center mt-4 text-sm text-gray-600">
            {label}
            <a href={to} className="underline ml-1 text-black">
                {buttonText}
            </a>
        </div>
    )
}

export default BottomWarning;