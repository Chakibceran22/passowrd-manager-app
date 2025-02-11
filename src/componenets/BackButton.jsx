const BackButton = ({ isDarkMode }) => {
    return (
        <button
            onClick={() => window.history.back()}
            className={`px-4 py-2 rounded-lg transform transition-all duration-300 ${isDarkMode
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-gray-200 hover:bg-gray-300'}`}
        >
            Back
        </button>
    )
}
export default BackButton;