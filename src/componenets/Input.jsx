const Input = ({placeholder, password, isDarkMode ,setPassword}) => {
    return(
        <div>
            <label className="block mb-2">{placeholder}</label>
            <input 
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter encrypted text"
              className={`w-full p-3 rounded-lg border-2 ${isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-black'}`}
            />
          </div>
    )
}
export default Input;