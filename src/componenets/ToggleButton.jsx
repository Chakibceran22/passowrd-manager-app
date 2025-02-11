const DarkModeToggle = ({isDarkMode, setIsDarkMode}) => {
    return(
        <div className="mt-4 flex justify-end">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded flex items-center transform transition-all duration-300 ${isDarkMode 
              ? 'bg-gray-700 hover:bg-gray-600 text-white' 
              : 'bg-gray-200 hover:bg-gray-300 text-black'}`}
          >
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
    )
}
export default DarkModeToggle;