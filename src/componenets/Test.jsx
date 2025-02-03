import React, { useState } from 'react';

// Custom SVG Icons
const HashIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

const DecryptIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

// Shared Layout Component
const ToolLayout = ({ title, icon: Icon, children, isDarkMode, toggleDarkMode }) => (
  <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
    <div className={`w-full max-w-md p-8 rounded-xl shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="flex items-center mb-6">
        <Icon className={`mr-4 w-10 h-10 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      {children}
      <div className="mt-4 flex justify-end">
        <button 
          onClick={toggleDarkMode} 
          className={`p-2 rounded ${isDarkMode 
            ? 'bg-gray-700 hover:bg-gray-600 text-white' 
            : 'bg-gray-200 hover:bg-gray-300 text-black'}`}
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </div>
  </div>
);

// Password Hashing Component
const PasswordHasher = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [password, setPassword] = useState('');
  const [hashedPassword, setHashedPassword] = useState('');

  const handleHash = () => {
    // Note: This is a placeholder. In a real app, you'd use a proper hashing library
    const simpleHash = btoa(password);
    setHashedPassword(simpleHash);
  };

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <ToolLayout 
      title="Password Hasher" 
      icon={HashIcon} 
      isDarkMode={isDarkMode} 
      toggleDarkMode={toggleDarkMode}
    >
      <div>
        <input 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password to hash"
          className={`w-full p-2 rounded border ${isDarkMode 
            ? 'bg-gray-700 border-gray-600 text-white' 
            : 'bg-white border-gray-300 text-black'}`}
        />
        <button 
          onClick={handleHash}
          className={`w-full mt-4 p-2 rounded ${isDarkMode 
            ? 'bg-blue-700 hover:bg-blue-600 text-white' 
            : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
        >
          Hash Password
        </button>
        {hashedPassword && (
          <div className={`mt-4 p-3 rounded break-words ${isDarkMode 
            ? 'bg-gray-700' 
            : 'bg-gray-100'}`}>
            <strong>Hashed Password:</strong>
            <p>{hashedPassword}</p>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

// Password Decryption Component
const PasswordDecryptor = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [encryptedPassword, setEncryptedPassword] = useState('');
  const [decryptedPassword, setDecryptedPassword] = useState('');

  const handleDecrypt = () => {
    // Note: This is a placeholder. In a real app, you'd use proper decryption
    try {
      const decrypted = atob(encryptedPassword);
      setDecryptedPassword(decrypted);
    } catch {
      setDecryptedPassword('Decryption failed');
    }
  };

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <ToolLayout 
      title="Password Decryptor" 
      icon={DecryptIcon} 
      isDarkMode={isDarkMode} 
      toggleDarkMode={toggleDarkMode}
    >
      <div>
        <input 
          type="text"
          value={encryptedPassword}
          onChange={(e) => setEncryptedPassword(e.target.value)}
          placeholder="Enter encrypted password"
          className={`w-full p-2 rounded border ${isDarkMode 
            ? 'bg-gray-700 border-gray-600 text-white' 
            : 'bg-white border-gray-300 text-black'}`}
        />
        <button 
          onClick={handleDecrypt}
          className={`w-full mt-4 p-2 rounded ${isDarkMode 
            ? 'bg-green-700 hover:bg-green-600 text-white' 
            : 'bg-green-500 hover:bg-green-600 text-white'}`}
        >
          Decrypt Password
        </button>
        {decryptedPassword && (
          <div className={`mt-4 p-3 rounded break-words ${isDarkMode 
            ? 'bg-gray-700' 
            : 'bg-gray-100'}`}>
            <strong>Decrypted Password:</strong>
            <p>{decryptedPassword}</p>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

// Export both components
export { PasswordHasher, PasswordDecryptor };