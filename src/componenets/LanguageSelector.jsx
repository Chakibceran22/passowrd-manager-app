const LanuageSelector = ({referenceLanguage, isDarkMode, languageOptions, setReferenceLanguage}) => {
    return (
        <div className={`p-3 rounded-lg border-2 transform transition-all duration-300 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
        }`}>
        <label className="block text-sm font-medium mb-2">Reference Language</label>
        <select
          value={referenceLanguage}
          onChange={(e) => setReferenceLanguage(e.target.value)}
          className={`w-full p-2 rounded transform transition-all duration-300 ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-gray-100 text-black'
            }`}
        >
          {languageOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    )
}
export default LanuageSelector;