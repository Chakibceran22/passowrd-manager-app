const Footer = ({isDarkMode}) => {
    return (
        <footer className={`p-6 text-center ${isDarkMode
            ? 'bg-gray-800 border-t border-gray-700'
            : 'bg-white shadow-lg'
            }`}>
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                © 2025 Chakibceran22. All rights reserved.
            </p>
        </footer>
    )
}
export default Footer;