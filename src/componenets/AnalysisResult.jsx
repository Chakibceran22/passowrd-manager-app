const AnalysisResult = ({analysisData, copyToClipboard, isDarkMode, renderResultTable}) => {
    return (
        analysisData && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">{analysisData.title}</h2>
                <button
                  onClick={copyToClipboard}
                  className={`p-1 rounded transform transition-all duration-300 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                    }`}
                  title="Copy results"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>

              {renderResultTable()}
            </div>
          )
    )
}
export default AnalysisResult