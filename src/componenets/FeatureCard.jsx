 const FeatureCard = ({ icon: Icon, title, description, route, isDarkMode,navigate }) => (
    <div
      onClick={() => navigate(route)}
      className={`cursor-pointer transform transition-all duration-300 hover:scale-105 p-6 rounded-xl shadow-lg space-y-4 ${isDarkMode
          ? 'bg-gray-800 hover:bg-gray-700 text-white'
          : 'bg-white hover:bg-gray-100 text-black'
        }`}
    >
      <div className="flex items-center space-x-4">
        <Icon className={`w-12 h-12 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>
      <p className="text-gray-500">{description}</p>
      <div className="text-right">
        <span className={`font-semibold ${isDarkMode
            ? 'text-green-400 hover:text-green-300'
            : 'text-green-600 hover:text-green-500'
          }`}>
          Use Tool →
        </span>
      </div>
    </div>
  );
  export default FeatureCard;