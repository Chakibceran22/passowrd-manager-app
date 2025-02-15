const HillMatrixInput = ({hillMatrix, isDarkMode, handleHillMatrixChange }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium">Enter 2x2 Matrix Key:</label>
      <div className="grid grid-cols-2 gap-2">
        {[0, 1].map(row => (
          <div key={row} className="flex space-x-2">
            {[0, 1].map(col => (
              <input
                key={`${row}-${col}`}
                type="number"
                value={hillMatrix[row][col]}
                onChange={(e) => handleHillMatrixChange(row, col, e.target.value)}
                className={`w-16 p-2 rounded border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-black'
                }`}
                placeholder={`${row+1}${col+1}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
  export default HillMatrixInput;