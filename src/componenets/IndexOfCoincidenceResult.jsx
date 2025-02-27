const IndexOfCoincidenceResult = ({ isDarkMode, analysisData}) => {
    return (
        <div className={`p-4 rounded-lg border transform transition-all duration-300 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
          }`}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-sm font-medium">Text IC</div>
              <div className="text-2xl font-bold">{analysisData.value}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm font-medium">{analysisData.language} Expected</div>
              <div className="text-2xl font-bold">{analysisData.expectedValue}</div>
            </div>
          </div>

          <div className={`mt-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <p>Values near {analysisData.expectedValue} suggest a monoalphabetic cipher.</p>
            <p>Values near 0.04 suggest a polyalphabetic cipher.</p>
          </div>
        </div>
      );
}
export default IndexOfCoincidenceResult;