import React, { useState, useEffect } from 'react';
import {
  Lock,
  Hash,
  Copy,
  Check,
  Sun,
  Moon,
  AlertTriangle,
  ShieldCheck,
  Info
} from 'lucide-react';

const PasswordHasher = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hashedPassword, setHashedPassword] = useState('');
  const [hashMethod, setHashMethod] = useState('sha256');
  const [copied, setCopied] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [selectedMethodDetails, setSelectedMethodDetails] = useState(null);

  // Hash methods with metadata
  const hashMethods = [
    {
      id: 'sha256',
      name: 'SHA-256',
      description: 'Secure, widely-used cryptographic hash with 256-bit output.',
      complexity: 'Medium'
    },
    {
      id: 'bcrypt',
      name: 'BCrypt',
      description: 'Adaptive hash with salt, designed specifically for password hashing.',
      complexity: 'High'
    },
    {
      id: 'sha512',
      name: 'SHA-512',
      description: 'Advanced cryptographic hash with 512-bit output, providing extensive security.',
      complexity: 'High'
    },
    {
      id: 'argon2',
      name: 'Argon2',
      description: 'Modern, memory-hard hashing algorithm winning the Password Hashing Competition.',
      complexity: 'Very High'
    }
  ];

  // Previous password strength and validation methods remain the same...
  const checkPasswordStrength = (pwd) => {
    if (pwd.length === 0) return '';
    if (pwd.length < 8) return 'Weak';

    const hasUppercase = /[A-Z]/.test(pwd);
    const hasLowercase = /[a-z]/.test(pwd);
    const hasNumbers = /[0-9]/.test(pwd);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);

    const strengthCount =
      [hasUppercase, hasLowercase, hasNumbers, hasSpecialChar]
        .filter(Boolean).length;

    if (strengthCount <= 2) return 'Weak';
    if (strengthCount === 3) return 'Medium';
    return 'Strong';
  };

  const validatePasswords = () => {
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    setPasswordError('');
    return true;
  };

  // Simulate hashing (previous implementation)
  const simulateHashing = () => {
    if (!validatePasswords()) return;

    const hashSimulations = {
      'sha256': `sha256:${btoa(password).slice(0, 64)}`,
      'bcrypt': `bcrypt:${btoa(password).slice(0, 60)}`,
      'sha512': `sha512:${btoa(password).slice(0, 128)}`,
      'argon2': `argon2:${btoa(password).slice(0, 96)}`
    };

    setHashedPassword(hashSimulations[hashMethod]);
    setPasswordStrength(checkPasswordStrength(password));
  };

  // Clipboard copy method remains the same...
  const copyToClipboard = () => {
    navigator.clipboard.writeText(hashedPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Dark mode toggle remains the same...
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className={`min-h-screen ${darkMode
        ? 'bg-gray-900 text-gray-100'
        : 'bg-gray-100 text-gray-900'
      } flex items-center justify-center p-4 transition-colors duration-300`}>
      {/* Dark Mode Toggle */}
      {/* <button
        onClick={() => setDarkMode(!darkMode)}
        className={`absolute top-4 right-4 p-2 rounded-full ${darkMode
            ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          } transition-colors`}
      >
        {darkMode ? <Sun /> : <Moon />}
      </button> */}

      <div className={`w-full max-w-md p-8 rounded-lg shadow-lg ${darkMode
          ? 'bg-gray-800 border border-gray-700'
          : 'bg-white'
        } transition-colors duration-300`}>
        <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
          <Lock className="mr-2" /> Password Hasher
        </h2>

        {/* Password Input */}
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'
              } mb-2`}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-3 py-2 rounded-md ${darkMode
                  ? 'bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-600'
                  : 'bg-white border-gray-300 focus:ring-blue-500'
                } border shadow-sm focus:outline-none focus:ring-2`}
              placeholder="Enter password"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'
              } mb-2`}>
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full px-3 py-2 rounded-md ${darkMode
                  ? 'bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-600'
                  : 'bg-white border-gray-300 focus:ring-blue-500'
                } border shadow-sm focus:outline-none focus:ring-2`}
              placeholder="Confirm password"
            />
          </div>

          {/* Password Error */}
          {passwordError && (
            <div className="flex items-center text-red-500 text-sm">
              <AlertTriangle className="mr-2" size={16} />
              {passwordError}
            </div>
          )}

          {/* Password Strength */}
          {password && (
            <div className="flex items-center text-sm">
              <ShieldCheck className="mr-2" />
              Strength:
              <span className={`ml-2 font-semibold ${passwordStrength === 'Weak' ? 'text-red-500' :
                  passwordStrength === 'Medium' ? 'text-yellow-500' :
                    'text-green-500'
                }`}>
                {passwordStrength}
              </span>
            </div>
          )}
        </div>

        {/* Hashing Method Selection */}
        <div className="mt-4">
          <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'
            } mb-2`}>
            Hashing Method
          </label>
          <div className="grid grid-cols-2 gap-2">
            {hashMethods.map((method) => (
              <div
                key={method.id}
                className="relative"
              >
                <button
                  onClick={() => {
                    setHashMethod(method.id);
                    setSelectedMethodDetails(method);
                  }}
                  className={`w-full px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center ${hashMethod === method.id
                      ? (darkMode
                        ? 'bg-blue-700 text-white'
                        : 'bg-blue-500 text-white')
                      : (darkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300')
                    }`}
                >
                  <Hash className="inline-block mr-1 -mt-1" size={16} />
                  {method.name}
                  <Info
                    size={16}
                    className="ml-2 opacity-50 hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMethodDetails(method);
                    }}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Method Details Modal */}
        {selectedMethodDetails && (
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 ${darkMode ? 'bg-opacity-70' : ''
              }`}
            onClick={() => setSelectedMethodDetails(null)}
          >
            <div
              className={`w-full max-w-sm p-6 rounded-lg shadow-xl ${darkMode
                  ? 'bg-gray-800 text-gray-100'
                  : 'bg-white text-gray-900'
                }`}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-3 flex items-center">
                <Hash className="mr-2" /> {selectedMethodDetails.name}
              </h3>
              <p className="text-sm mb-2">
                {selectedMethodDetails.description}
              </p>
              <div className="mt-4 flex items-center">
                <span className="font-semibold mr-2">Complexity:</span>
                <span className={`
                  ${selectedMethodDetails.complexity === 'Weak' ? 'text-red-500' :
                    selectedMethodDetails.complexity === 'Medium' ? 'text-yellow-500' :
                      selectedMethodDetails.complexity === 'High' ? 'text-green-500' :
                        'text-blue-500'}
                `}>
                  {selectedMethodDetails.complexity}
                </span>
              </div>
              <button
                onClick={() => setSelectedMethodDetails(null)}
                className={`mt-4 w-full py-2 rounded-md ${darkMode
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
              >
                Close
              </button>
            </div>
          </div>
        )}

        <button
          onClick={simulateHashing}
          disabled={!password || !confirmPassword}
          className={`w-full mt-4 py-2 rounded-md flex items-center justify-center transition-colors ${(!password || !confirmPassword)
              ? (darkMode
                ? 'bg-gray-600 text-gray-400'
                : 'bg-gray-400 text-gray-200')
              : (darkMode
                ? 'bg-green-700 text-white hover:bg-green-600'
                : 'bg-green-500 text-white hover:bg-green-600')
            }`}
        >
          <Hash className="mr-2" /> Hash Password
        </button>

        {/* Hashed Result */}
        {hashedPassword && (
          <div className={`mt-4 p-3 rounded-md flex items-center ${darkMode
              ? 'bg-gray-700 border-gray-600'
              : 'bg-gray-50 border-gray-200'
            } border`}>
            <input
              type="text"
              readOnly
              value={hashedPassword}
              className={`flex-grow bg-transparent outline-none ${darkMode ? 'text-gray-100' : 'text-gray-800'
                }`}
            />
            <button
              onClick={copyToClipboard}
              className={`${darkMode
                  ? 'text-blue-400 hover:text-blue-300'
                  : 'text-blue-500 hover:text-blue-700'
                }`}
            >
              {copied ? <Check size={20} /> : <Copy size={20} />}
            </button>
          </div>
        )}

        <p className={`text-xs mt-4 text-center ${darkMode ? 'text-gray-500' : 'text-gray-500'
          }`}>
          Secure hashing should always be performed on the backend.
        </p>
      </div>
    </div>
  );
};

export default PasswordHasher;