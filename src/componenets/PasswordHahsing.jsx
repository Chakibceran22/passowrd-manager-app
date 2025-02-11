import React, { useEffect, useState } from 'react';
import { ShieldIcon, KeyIcon, LockIcon, EyeIcon, EyeOffIcon } from './SecurityIcons';
import DarkModeToggle from './ToggleButton';
import Button from './Button';
import SaltInput from './SaltInput';
import PasswordInput from './PasswordInput';
import BackButton from './BackButton';
const PasswordHasher = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [password, setPassword] = useState('');
  const [hashedPassword, setHashedPassword] = useState('');
  const [hashType, setHashType] = useState('base64');
  const [showPassword, setShowPassword] = useState(false);
  const [salt, setSalt] = useState('');
  useEffect(() => {
    document.title = 'Password Hasher';
  })
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
    <div className={`min-h-screen flex items-center justify-center transform transition-all duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className={`w-full max-w-md p-8 rounded-xl shadow-2xl border-2 transform transition-all duration-300 ${isDarkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'}`}>
        <div className="flex items-center mb-6">
          <ShieldIcon className={`mr-4 w-12 h-12 transform transition-all duration-300 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
          <h1 className="text-3xl font-bold transform transition-all duration-300">Secure Hash Generator</h1>
          <BackButton isDarkMode={isDarkMode} />
        </div>

        <div className="space-y-4">
          {/* Password Input */}
          <PasswordInput showPassword={showPassword} isDarkMode={isDarkMode} password={password} setPassword={setPassword} setShowPassword={setShowPassword} />

          {/* Salt Input */}
          <SaltInput salt={salt} setSalt={setSalt} isDarkMode={isDarkMode} />

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
          <Button handleEvent={handleHash} word="Hash" isDarkMode={isDarkMode} password={password} />

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
        <DarkModeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </div>
    </div>
  );
};

export default PasswordHasher;