const LetterFrequencyResult = ({ isDarkMode, analysisData}) => {
    return (
        <div className={`rounded-lg border transform transition-all duration-300 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
          }`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                  {analysisData.headers.map((header, index) => (
                    <th key={index} className="px-3 py-2 text-left text-sm font-medium">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {analysisData.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className={`${rowIndex % 2 === 0
                    ? (isDarkMode ? 'bg-gray-700' : 'bg-gray-50')
                    : ''}`}>
                    <td className="px-3 py-2 text-sm">{row.letter}</td>
                    <td className="px-3 py-2 text-sm">{row.count}</td>
                    <td className="px-3 py-2 text-sm">{row.percentage}%</td>
                    <td className="px-3 py-2 text-sm">{row.refPercentage}%</td>
                    <td className={`px-3 py-2 text-sm ${parseFloat(row.difference) > 0
                        ? 'text-green-500'
                        : parseFloat(row.difference) < 0
                          ? 'text-red-500'
                          : ''
                      }`}>
                      {row.difference > 0 ? `+${row.difference}` : row.difference}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={`p-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Total characters analyzed: {analysisData.totalItems}
          </div>
        </div>
      );
}
export default LetterFrequencyResult;