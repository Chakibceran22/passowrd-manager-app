import React, { useState } from 'react';
import { ShieldIcon, KeyIcon, LockIcon, EyeIcon, EyeOffIcon } from './SecurityIcons';

const PasswordHasher = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [password, setPassword] = useState('');
  const [hashedPassword, setHashedPassword] = useState('');
  const [hashType, setHashType] = useState('base64');
  const [showPassword, setShowPassword] = useState(false);
  const [salt, setSalt] = useState('');

  const hashingMethods = [
    { value: 'base64', label: 'Base64 Encoding' },
    { value: 'simple', label: 'Simple Hash' },
    { value: 'rot13', label: 'ROT13 Cipher' }
  ];

  const handleHash = () => {
    let result = '';
    const saltedPassword = salt ? `${salt}${password}` : password;

    switch (hashType) {
      case 'base64':
        result = btoa(saltedPassword);
        break;
      case 'simple':
        // Very basic hash (NOT secure!)
        result = saltedPassword.split('').reduce((hash, char) => 
          ((hash << 5) - hash) + char.charCodeAt(0), 0).toString(16);
        break;
      case 'rot13':
        result = saltedPassword.replace(/[a-zA-Z]/g, char => {
          const base = char <= 'Z' ? 65 : 97;
          return String.fromCharCode((char.charCodeAt(0) - base + 13) % 26 + base);
        });
        break;
      default:
        result = 'Invalid hash method';
    }

    setHashedPassword(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hashedPassword);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className={`w-full max-w-md p-8 rounded-xl shadow-2xl border-2 ${isDarkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'}`}>
        <div className="flex items-center mb-6">
          <ShieldIcon className={`mr-4 w-12 h-12 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
          <h1 className="text-3xl font-bold">Secure Hash Generator</h1>
        </div>

        <div className="space-y-4">
          {/* Password Input */}
          <div className="relative">
            <label className="block mb-2 flex items-center">
              <KeyIcon className="mr-2 w-5 h-5" />
              Password
            </label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password to hash"
                className={`w-full p-3 rounded-lg border-2 pr-10 ${isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-black'}`}
              />
              <button 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? 
                  <EyeOffIcon className="w-6 h-6 text-gray-500" /> : 
                  <EyeIcon className="w-6 h-6 text-gray-500" />
                }
              </button>
            </div>
          </div>

          {/* Salt Input */}
          <div>
            <label className="block mb-2 flex items-center">
              <LockIcon className="mr-2 w-5 h-5" />
              Salt (Optional)
            </label>
            <input 
              type="text"
              value={salt}
              onChange={(e) => setSalt(e.target.value)}
              placeholder="Add extra security with a salt"
              className={`w-full p-3 rounded-lg border-2 ${isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-black'}`}
            />
          </div>

          {/* Hash Method Selector */}
          <div>
            <label className="block mb-2">Hash Method</label>
            <select 
              value={hashType}
              onChange={(e) => setHashType(e.target.value)}
              className={`w-full p-3 rounded-lg border-2 ${isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-black'}`}
            >
              {hashingMethods.map(method => (
                <option key={method.value} value={method.value}>
                  {method.label}
                </option>
              ))}
            </select>
          </div>

          {/* Hash Button */}
          <button 
            onClick={handleHash}
            disabled={!password}
            className={`w-full p-3 rounded-lg transition duration-300 ${
              password 
                ? (isDarkMode 
                  ? 'bg-green-700 hover:bg-green-600 text-white' 
                  : 'bg-green-500 hover:bg-green-600 text-white')
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Generate Hash
          </button>

          {/* Hashed Result */}
          {hashedPassword && (
            <div className={`p-4 rounded-lg break-words ${isDarkMode 
              ? 'bg-gray-700' 
              : 'bg-gray-100'}`}>
              <div className="flex justify-between items-center mb-2">
                <strong>Hashed Result:</strong>
                <button 
                  onClick={copyToClipboard}
                  className={`px-2 py-1 rounded ${isDarkMode 
                    ? 'bg-blue-700 hover:bg-blue-600' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                >
                  Copy
                </button>
              </div>
              <p className="break-all">{hashedPassword}</p>
            </div>
          )}
        </div>

        {/* Mode Toggle */}
        <div className="mt-4 flex justify-end">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded flex items-center ${isDarkMode 
              ? 'bg-gray-700 hover:bg-gray-600 text-white' 
              : 'bg-gray-200 hover:bg-gray-300 text-black'}`}
          >
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordHasher;