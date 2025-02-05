import React, { useState } from 'react';
import { ShieldIcon, KeyIcon } from './SecurityIcons';

const PasswordDecryptor = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [encryptedPassword, setEncryptedPassword] = useState('');
  const [decryptionKey, setDecryptionKey] = useState('');
  const [decryptedPassword, setDecryptedPassword] = useState('');
  const [decryptionType, setDecryptionType] = useState('caesarCipher');
  const [showDecrypted, setShowDecrypted] = useState(false);

  const decryptionMethods = [
    { value: 'caesarCipher', label: 'Caesar Cipher', requiresKey: false },
    { value: 'xorCipher', label: 'XOR Cipher', requiresKey: true },
    { value: 'base64', label: 'Base64', requiresKey: false },
    { value: 'vigenere', label: 'Vigenère Cipher', requiresKey: true }
  ];

  const handleDecrypt = () => {
    let result = '';

    switch (decryptionType) {
      case 'caesarCipher':
        const shift = parseInt(decryptionKey) || 3;
        result = encryptedPassword.split('').map(char => {
          if (char.match(/[a-z]/i)) {
            const base = char <= 'Z' ? 65 : 97;
            return String.fromCharCode((char.charCodeAt(0) - base - shift + 26) % 26 + base);
          }
          return char;
        }).join('');
        break;

      case 'xorCipher':
        if (!decryptionKey) {
          result = 'Key required for XOR Cipher';
          break;
        }
        result = atob(encryptedPassword).split('').map((char, index) => {
          const keyChar = decryptionKey[index % decryptionKey.length];
          return String.fromCharCode(char.charCodeAt(0) ^ keyChar.charCodeAt(0));
        }).join('');
        break;

      case 'base64':
        try {
          result = atob(encryptedPassword);
        } catch {
          result = 'Base64 decryption failed';
        }
        break;

      case 'vigenere':
        if (!decryptionKey) {
          result = 'Key required for Vigenère Cipher';
          break;
        }
        result = encryptedPassword.split('').map((char, index) => {
          if (char.match(/[a-z]/i)) {
            const base = char <= 'Z' ? 65 : 97;
            const keyChar = decryptionKey[index % decryptionKey.length];
            const keyBase = keyChar <= 'Z' ? 65 : 97;
            const keyShift = keyChar.charCodeAt(0) - keyBase;
            return String.fromCharCode((char.charCodeAt(0) - base - keyShift + 26) % 26 + base);
          }
          return char;
        }).join('');
        break;

      default:
        result = 'Invalid decryption method';
    }

    setDecryptedPassword(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(decryptedPassword);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className={`w-full max-w-md p-8 rounded-xl shadow-2xl border-2 ${isDarkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'}`}>
        <div className="flex items-center mb-6">
          <ShieldIcon className={`mr-4 w-12 h-12 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
          <h1 className="text-3xl font-bold">Advanced Decryption Tool</h1>
        </div>

        <div className="space-y-4">
          {/* Encrypted Input */}
          <div>
            <label className="block mb-2">Encrypted Text</label>
            <input 
              type="text"
              value={encryptedPassword}
              onChange={(e) => setEncryptedPassword(e.target.value)}
              placeholder="Enter encrypted text"
              className={`w-full p-3 rounded-lg border-2 ${isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-black'}`}
            />
          </div>

          {/* Decryption Method Selector */}
          <div>
            <label className="block mb-2">Decryption Method</label>
            <select 
              value={decryptionType}
              onChange={(e) => {
                setDecryptionType(e.target.value);
                setDecryptionKey(''); // Reset key when method changes
              }}
              className={`w-full p-3 rounded-lg border-2 ${isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-black'}`}
            >
              {decryptionMethods.map(method => (
                <option key={method.value} value={method.value}>
                  {method.label}
                </option>
              ))}
            </select>
          </div>

          {/* Conditional Key Input */}
          {decryptionMethods.find(m => m.value === decryptionType)?.requiresKey && (
            <div>
              <label className="block mb-2 flex items-center">
                <KeyIcon className="mr-2 w-5 h-5" />
                Decryption Key
              </label>
              <input 
                type="text"
                value={decryptionKey}
                onChange={(e) => setDecryptionKey(e.target.value)}
                placeholder="Enter decryption key"
                className={`w-full p-3 rounded-lg border-2 ${isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-black'}`}
              />
            </div>
          )}

          {/* Decrypt Button */}
          <button 
            onClick={handleDecrypt}
            disabled={!encryptedPassword}
            className={`w-full p-3 rounded-lg transition duration-300 ${
              encryptedPassword 
                ? (isDarkMode 
                  ? 'bg-purple-700 hover:bg-purple-600 text-white' 
                  : 'bg-purple-500 hover:bg-purple-600 text-white')
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Decrypt
          </button>

          {/* Decrypted Result */}
          {decryptedPassword && (
            <div className={`p-4 rounded-lg break-words ${isDarkMode 
              ? 'bg-gray-700' 
              : 'bg-gray-100'}`}>
              <div className="flex justify-between items-center mb-2">
                <strong>Decrypted Result:</strong>
                <div className="flex space-x-2">
                  <button 
                    onClick={copyToClipboard}
                    className={`px-2 py-1 rounded ${isDarkMode 
                      ? 'bg-blue-700 hover:bg-blue-600' 
                      : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                  >
                    Copy
                  </button>
                  <button 
                    onClick={() => setShowDecrypted(!showDecrypted)}
                    className={`px-2 py-1 rounded ${isDarkMode 
                      ? 'bg-green-700 hover:bg-green-600' 
                      : 'bg-green-500 hover:bg-green-600 text-white'}`}
                  >
                    {showDecrypted ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
              <p className="break-all">
                {showDecrypted ? decryptedPassword : '*'.repeat(decryptedPassword.length)}
              </p>
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

export default PasswordDecryptor;