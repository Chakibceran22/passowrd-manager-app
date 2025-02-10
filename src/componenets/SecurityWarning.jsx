const SecurityWarning = ({isDarkMode}) => {
    return(
        <div className={`mt-16 p-6 rounded-xl text-center ${isDarkMode
            ? 'bg-red-900 bg-opacity-30 text-red-300'
            : 'bg-red-100 text-red-700'
          }`}>
          <h3 className="text-2xl font-bold mb-4">⚠️ Security Notice</h3>
          <p>
            These tools are for demonstration purposes only.
            Do NOT use them for storing or managing real sensitive information.
            Always use professional cryptographic libraries in production.
          </p>
        </div>
    )
}

export default SecurityWarning;