import { ShieldIcon } from './SecurityIcons';
const Header = ({ isDarkMode, setIsDarkMode }) => {
    return(
        <header className={`p-6 flex justify-between items-center transform transition-all duration-300 ${isDarkMode
                  ? 'bg-gray-800 border-b border-gray-700'
                  : 'bg-white shadow-sm'
                }`}>
                <div className="flex items-center space-x-4 transform transition-all duration-300">
                  <ShieldIcon className={`w-10 h-10 transform transition-all duration-300 ${isDarkMode ? 'text-green-400' : 'text-green-600'
                    }`} />
                  <h1 className="text-3xl font-bold">SecureTools</h1>
                </div>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`p-2 rounded flex items-center transform transition-all duration-300 ${isDarkMode
                      ? 'bg-gray-700 hover:bg-gray-600 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-black'
                    }`}
                >
                  {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                </button>
              </header>
    )
}

export default Header;