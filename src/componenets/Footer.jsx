const Footer = ({isDarkMode}) => {
    return (
        <footer className={`p-6 text-center transform transition-all duration-300 ${isDarkMode
            ? 'bg-gray-800 border-t border-gray-700'
            : 'bg-white shadow-lg'
            }`}>
            <p className={`transform transition-all duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                © 2025 Chakibceran22. All rights reserved.
            </p>
        </footer>
    )
}
export default Footer;