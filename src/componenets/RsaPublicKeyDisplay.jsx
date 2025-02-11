const RsaPublicKeyDisplay = ({ isDarkMode, copyToClipboard, generatedPublicKey, generatedPrivaetKey }) => {
    return (
        <>
            <div className={`p-4 rounded-lg break-words transform transition-all duration-300 ${isDarkMode 
              ? 'bg-gray-700' 
              : 'bg-gray-100'}`}>
              <div className="flex justify-between items-center mb-2 transform transition-all duration-300">
                <strong>Public Key:</strong>
                <button 
                  onClick={() => copyToClipboard(generatedPublicKey)}
                  className={`px-2 py-1 rounded transform transition-all duration-300 ${isDarkMode 
                    ? 'bg-blue-700 hover:bg-blue-600' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                >
                  Copy
                </button>
              </div>
              <p className="break-all text-sm font-mono">
                {generatedPublicKey}
              </p>
            </div>
            <div className={`p-4 rounded-lg break-words transform transition-all duration-300 ${isDarkMode 
              ? 'bg-gray-700' 
              : 'bg-gray-100'}`}>
              <div className="flex justify-between items-center mb-2">
                <strong>Private Key(Keep it a secret):</strong>
                <button 
                  onClick={() => copyToClipboard(generatedPrivaetKey)}
                  className={`px-2 py-1 rounded transform transition-all duration-300 ${isDarkMode 
                    ? 'bg-blue-700 hover:bg-blue-600' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                >
                  Copy
                </button>
              </div>
              <p className="break-all text-sm font-mono">
                {generatedPrivaetKey}
              </p>
            </div>
            </>
    );
}
export default RsaPublicKeyDisplay;