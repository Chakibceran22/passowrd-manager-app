import React, { useState } from 'react';
import { ShieldIcon, KeyIcon } from './SecurityIcons';
import {calculatePublicKey, calculatePrivateKey, encryptMessage, decryptMessage,  n, totient } from '../encModules/rsa';
import Button from './Button';
import Input from './Input';
import SelectionDropDown from './SelectionDropDown';
import RsaPublicKeyDisplay from './RsaPublicKeyDisplay';
import DarkModeToggle from './ToggleButton';
import KeyInput from './KeyInput';
import BackButton from './BackButton';
import PasswordInput from './PasswordInput';

const PasswordEncryptor = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [plainPassword, setPlainPassword] = useState('');
  const [encryptionType, setEncryptionType] = useState('ROT13');
  const [encryptionKey, setEncryptionKey] = useState('');
  const [encryptedPassword, setEncryptedPassword] = useState('');
  const [generatedPublicKey, setGeneratedPublicKey] = useState(''); 
  const [generatedPrivaetKey, setGeneratedPrivateKey] = useState(''); 
  const [showPassword, setShowPassword] = useState(false);

  const [showEncrypted, setShowEncrypted] = useState(false);

  const encryptionMethods = [
    { value: 'ROT13', label: 'ROT 13', requiresKey: false },
    { value: 'xorCipher', label: 'XOR Cipher', requiresKey: true },
    { value: 'base64', label: 'Base64', requiresKey: false },
    { value: 'vigenere', label: 'Vigenère Cipher', requiresKey: true },
    { value: 'RSA', label:"RSA" , requiresKey: true},
    { value: "Affine" , label: "Affine Cipher", requiresKey: true},
  ];

  const handleEncrypt = () => {
    let result = '';

    switch (encryptionType) {
      case 'RSA':
        const publicKey = calculatePublicKey(totient, n)
        const privateKey = calculatePrivateKey(publicKey, totient)
        const encryptedMessage = encryptMessage(plainPassword, publicKey, n)
        const decryptedMessage = decryptMessage(encryptedMessage, privateKey, n)
        console.log(publicKey, decryptedMessage)
        setGeneratedPrivateKey(`(${privateKey}, ${n})`);
        setGeneratedPublicKey(`(${publicKey}, ${n})`);
        result = btoa(JSON.stringify(encryptedMessage));
        break;
      case 'ROT13':
        
        result = plainPassword.split('').map(char => {
            if( char >= 'a' && char <= 'z' ) {
                return String.fromCharCode((char.charCodeAt(0) - 'a'.charCodeAt(0) + 13) % 26 + 'a'.charCodeAt(0));
            }
            else if (char >= 'A' && char <= 'Z') {
                return String.fromCharCode((char.charCodeAt(0) - 'A'.charCodeAt(0) + 13) % 26 + 'A'.charCodeAt(0));
            }
            return char;
        }).join('');
        const resultdecrcypher = result.split('').map(char => {
            if( char >= 'a' && char <= 'z' ) {
                return String.fromCharCode(( char.charCodeAt(0) - 'a'.charCodeAt(0) + 13) % 26 + 'a'.charCodeAt(0));
            }
            else if (char >= 'A' && char <= 'Z') {
                return String.fromCharCode(( char.charCodeAt(0) - 'A'.charCodeAt(0) + 13) % 26 + 'A'.charCodeAt(0));
            }
            
            return char;
        }).join('');
        console.log(resultdecrcypher)
        break;

      case 'xorCipher':
        if (!encryptionKey) {
          result = 'Key required for XOR Cipher';
          break;
        }
        result = btoa(plainPassword.split('').map((char, index) => {
            return String.fromCharCode(char.charCodeAt(0) ^ encryptionKey.charCodeAt(index % encryptionKey.length));
        })
        .join(''));

        break;

      case 'base64':
        try {
          result = btoa(plainPassword);
        } catch {
          result = 'Base64 encryption failed';
        }
        break;

      case 'vigenere':
        if (!encryptionKey) {
          result = 'Key required for Vigenère Cipher';
          break;
        }

        result = plainPassword.split('').map((char, index) => {
          if(char.match(/[a-z]/i)) {
            const base  = char <= 'Z' ? 65 : 97;
            const pNum = char.charCodeAt(0)
            const kNum = encryptionKey.charCodeAt(index % encryptionKey.length);
            return String.fromCharCode(((pNum - base) + (kNum - base)) % 26 + base);
          }
        }).join('');

        break;

      default:
        result = 'Invalid encryption method';
        console.log(encryptionType)
    }

    setEncryptedPassword(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(encryptedPassword);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className={`w-full max-w-md p-8 rounded-xl shadow-2xl border-2 ${isDarkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'}`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <ShieldIcon className={`mr-4 w-12 h-12 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
            <h1 className="text-3xl font-bold">Advanced Encryption Tool</h1>
          </div>
          <BackButton isDarkMode={isDarkMode}/>
        </div>

        <div className="space-y-4">
          {/* Encryption Method Selector */}
          <SelectionDropDown encryptionType={encryptionType} encryptionMethods={encryptionMethods} isDarkMode={isDarkMode} setEncryptionKey={setEncryptionKey} setEncryptionType={setEncryptionType} setGeneratedPublicKey={setGeneratedPublicKey} notice={"Encryption Method"}/>
          <PasswordInput isDarkMode={isDarkMode} setPassword={setPlainPassword} password={plainPassword} showPassword={showPassword} setShowPassword={setShowPassword}/>
          {/* Non-RSA Key Input */}
          {encryptionType !== 'RSA' && encryptionMethods.find(m => m.value === encryptionType)?.requiresKey && (
            <KeyInput isDarkMode={isDarkMode} setKey={setEncryptionKey} Key={encryptionKey} notice={"Encryption Key"} />
          )}

          <Button handleEvent={handleEncrypt} password={plainPassword} word={"Encrypt"} isDarkMode={isDarkMode}></Button>

          {/* RSA Public Key Display */}
          {encryptionType === 'RSA' && generatedPublicKey && (
            <RsaPublicKeyDisplay isDarkMode={isDarkMode} copyToClipboard={copyToClipboard} generatedPublicKey={generatedPublicKey} generatedPrivaetKey={generatedPrivaetKey} />
          )}

          {/* Encrypted Result */}
          {encryptedPassword && (
            <div className={`p-4 rounded-lg break-words ${isDarkMode 
              ? 'bg-gray-700' 
              : 'bg-gray-100'}`}>
              <div className="flex justify-between items-center mb-2">
                <strong>Encrypted Result:{(encryptionType == 'RSA'|| encryptionType == 'xorCipher') && <p>Note: Result in Base64</p>}</strong>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => copyToClipboard(encryptedPassword)}
                    className={`px-2 py-1 rounded ${isDarkMode 
                      ? 'bg-blue-700 hover:bg-blue-600' 
                      : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                  >
                    Copy
                  </button>
                  <button 
                    onClick={() => setShowEncrypted(!showEncrypted)}
                    className={`px-2 py-1 rounded ${isDarkMode 
                      ? 'bg-green-700 hover:bg-green-600' 
                      : 'bg-green-500 hover:bg-green-600 text-white'}`}
                  >
                    {showEncrypted ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
              <p className="break-all">
                {showEncrypted ? encryptedPassword : '*'.repeat(encryptedPassword.length)}
              </p>
            </div>
          )}
        </div>

        {/* Mode Toggle */}
        <DarkModeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}></DarkModeToggle>
      </div>
    </div>
  );
};

export default PasswordEncryptor;