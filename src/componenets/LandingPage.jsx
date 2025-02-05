import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldIcon, LockIcon, KeyIcon } from './SecurityIcons';

const SecurityLandingPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const navigate = useNavigate();

  const FeatureCard = ({ icon: Icon, title, description, route }) => (
    <div 
      onClick={() => navigate(route)}
      className={`cursor-pointer transform transition-all duration-300 hover:scale-105 p-6 rounded-xl shadow-lg space-y-4 ${
        isDarkMode 
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
        <span className={`font-semibold ${
          isDarkMode 
            ? 'text-green-400 hover:text-green-300' 
            : 'text-green-600 hover:text-green-500'
        }`}>
          Use Tool →
        </span>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${
      isDarkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-gray-100 text-black'
    }`}>
      {/* Header */}
      <header className={`p-6 flex justify-between items-center ${
        isDarkMode 
          ? 'bg-gray-800 border-b border-gray-700' 
          : 'bg-white shadow-sm'
      }`}>
        <div className="flex items-center space-x-4">
          <ShieldIcon className={`w-10 h-10 ${
            isDarkMode ? 'text-green-400' : 'text-green-600'
          }`} />
          <h1 className="text-3xl font-bold">SecureTools</h1>
        </div>
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`p-2 rounded flex items-center ${
            isDarkMode 
              ? 'bg-gray-700 hover:bg-gray-600 text-white' 
              : 'bg-gray-200 hover:bg-gray-300 text-black'
          }`}
        >
          {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">
            Secure Your Digital Secrets
          </h2>
          <p className={`max-w-2xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Powerful tools for password management and encryption. 
            Protect your sensitive information with advanced security techniques.
          </p>
        </section>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <FeatureCard 
            icon={LockIcon}
            title="Password Hasher"
            description="Transform your passwords using multiple hashing methods. Add salt for extra security."
            route="/hash"
          />
          <FeatureCard 
            icon={KeyIcon}
            title="Password Decryptor"
            description="Decrypt encrypted text using various key-based methods. Supports multiple encryption techniques."
            route="/decrypt"
          />
          <FeatureCard 
            icon={KeyIcon}
            title="Password Encryptor"
            description="Encrypt text using various key-based methods. Supports multiple encryption techniques."
            route="/encrypt"
          />
        </div>

        {/* Security Warning */}
        <div className={`mt-16 p-6 rounded-xl text-center ${
          isDarkMode 
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
      </main>

      {/* Footer */}
      <footer className={`p-6 text-center ${
        isDarkMode 
          ? 'bg-gray-800 border-t border-gray-700' 
          : 'bg-white shadow-lg'
      }`}>
        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
          © 2025 Chakibceran22. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default SecurityLandingPage;