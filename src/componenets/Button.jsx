import React from "react"

const Button = ({ handleEvent, password, word, isDarkMode }) => {

    return (
        <button
            onClick={handleEvent}
            disabled={!password}
            className={`w-full p-3 rounded-lg transform transition-all duration-300 ${password
                    ? (isDarkMode
                        ? 'bg-purple-700 hover:bg-purple-600 text-white'
                        : 'bg-purple-500 hover:bg-purple-600 text-white')
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
        >
            {word}
        </button>
    )
}
export default Button