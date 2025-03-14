import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldIcon, LockIcon, KeyIcon } from '../componenets/SecurityIcons';
import FeatureCard from '../componenets/FeatureCard';
import Footer from '../componenets/Footer';
import Header from '../componenets/Header';
import SecurityWarning from '../componenets/SecurityWarning';
const SecurityLandingPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Security Tools"
  })
 

  return (
    <div className={`min-h-screen transform transition-all duration-300 ${isDarkMode
        ? 'bg-gray-900 text-white'
        : 'bg-gray-100 text-black'
      }`}>
      {/* Header */}
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}></Header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">
            Secure Your Digital Secrets
          </h2>
          <p className={`max-w-2xl mx-auto transform transition-all duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
            Powerful tools for password management and encryption.
            Protect your sensitive information with advanced security techniques.
          </p>
        </section>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <FeatureCard
            icon={KeyIcon}
            isDarkMode={isDarkMode}
            navigate={navigate}
            title="Password Encryptor"
            description="Encrypt text using various key-based methods. Supports multiple encryption techniques."
            route="/encrypt"
          />
          
          <FeatureCard
            icon={KeyIcon}
            isDarkMode={isDarkMode}
            navigate={navigate}
            title="Password Decryptor"
            description="Decrypt encrypted text using various key-based methods. Supports multiple encryption techniques."
            route="/decrypt"
          />
          <FeatureCard
            icon={LockIcon}
            isDarkMode={isDarkMode}
            navigate={navigate}
            title="Password Hasher"
            description="Transform your passwords using multiple hashing methods. Add salt for extra security."
            route="/hash"
          />
          <FeatureCard
            icon={ShieldIcon}
            isDarkMode={isDarkMode}
            navigate={navigate}
            title="Frequency Analysis"
            description="Analyze the frequency of characters in a given text. Useful for decryption."
            route="/frequency"
            />

        </div>

        {/* Security Warning */}
        <SecurityWarning isDarkMode={isDarkMode}/>
      </main>

      {/* Footer */}
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default SecurityLandingPage;