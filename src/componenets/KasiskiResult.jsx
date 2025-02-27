const KasiskiResult = ({ isDarkMode, analysisData}) => {
    return (
        <div className={`rounded-lg border transform transition-all duration-300 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
          }`}>
          <div className={`p-4 mb-2 border-b ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}>
            <div className="text-sm font-medium">Likely Key Length</div>
            <div className="text-2xl font-bold">{analysisData.possibleKeyLengths || 'Unknown'}</div>
            <div className={`mt-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Based on the greatest common divisor of the distances between repeating sequences
            </div>
          </div>

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
                {analysisData.sequences.map((row, rowIndex) => (
                  <tr key={rowIndex} className={`${rowIndex % 2 === 0
                    ? (isDarkMode ? 'bg-gray-700' : 'bg-gray-50')
                    : ''}`}>
                    <td className="px-3 py-2 text-sm font-mono">{row.sequence}</td>
                    <td className="px-3 py-2 text-sm">{row.length}</td>
                    <td className="px-3 py-2 text-sm">{row.positions}</td>
                    <td className="px-3 py-2 text-sm">{row.distances}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={`p-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <p>The Kasiski examination looks for repeating sequences in the ciphertext.</p>
            <p>The distances between repetitions can reveal the key length in polyalphabetic ciphers like Vigenère.</p>
          </div>
        </div>
      );
}
export default KasiskiResult