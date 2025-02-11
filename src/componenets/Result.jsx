const Result = ({isDarkMode,notice,copyToClipboard, setShowResult, showText, text }) => {
    return(
        <div className={`p-4 rounded-lg break-words transform transition-all duration-300 ${isDarkMode 
            ? 'bg-gray-700' 
            : 'bg-gray-100'}`}>
            <div className="flex justify-between items-center mb-2">
              <strong>{notice}</strong>
              <div className="flex space-x-2">
                <button 
                  onClick={copyToClipboard}
                  className={`px-2 py-1 rounded transform transition-all duration-300 ${isDarkMode 
                    ? 'bg-blue-700 hover:bg-blue-600' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                >
                  Copy
                </button>
                <button 
                  onClick={() => setShowResult(!showText)}
                  className={`px-2 py-1 rounded transform transition-all duration-300 ${isDarkMode 
                    ? 'bg-green-700 hover:bg-green-600' 
                    : 'bg-green-500 hover:bg-green-600 text-white'}`}
                >
                  {showText ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            <p className="break-all">
              {showText ? text : '*'.repeat(text.length)}
            </p>
          </div>
    )
}

export default Result