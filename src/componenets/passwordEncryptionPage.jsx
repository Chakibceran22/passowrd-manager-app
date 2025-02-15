import React, { useState } from 'react';
import { ShieldIcon } from './SecurityIcons';
import { calculatePublicKey, calculatePrivateKey, encryptMessage, decryptMessage, n, totient } from '../encModules/rsa';
import { encryptAffine } from '../encModules/affine';
import { useEffect } from 'react';
import Button from './Button';
import SelectionDropDown from './SelectionDropDown';
import RsaPublicKeyDisplay from './RsaPublicKeyDisplay';
import DarkModeToggle from './ToggleButton';
import KeyInput from './KeyInput';
import BackButton from './BackButton';
import PasswordInput from './PasswordInput';
import Result from './Result';
import { encryptRot13 } from '../encModules/rot13';
import { encryptXor } from '../encModules/xorCypher';
import { encryptVigener } from '../encModules/vigenere';
import { encryptCeasar } from '../encModules/ceasar';


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
  useEffect(() => {
    document.title = "Advanced Encryption Tool"
  })
  const encryptionMethods = [
    { value: 'ROT13', label: 'ROT 13', requiresKey: false },
    { value: 'xorCipher', label: 'XOR Cipher', requiresKey: true },
    { value: 'base64', label: 'Base64', requiresKey: false },
    { value: 'vigenere', label: 'Vigenère Cipher', requiresKey: true },
    { value: 'RSA', label: "RSA", requiresKey: true },
    { value: "Affine", label: "Affine Cipher", requiresKey: true },
    { value: "Ceasar", label: "Ceasar Cipher", requiresKey: true },
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
        result = encryptRot13(plainPassword);
        break;

      case 'xorCipher':
        if (!encryptionKey) {
          result = 'Key required for XOR Cipher';
          break;
        }
        result = btoa(encryptXor(plainPassword, encryptionKey));

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
        result = encryptVigener(plainPassword, encryptionKey);
        break;
      case 'Affine':
        if (!encryptionKey) {
          result = 'Key required for Affine Cipher';
          break;
        }
        else {
          const [a, b] = encryptionKey.split(',').map(Number);
          if (isNaN(a) || isNaN(b)) {
            result = 'Invalid key for Affine Cipher';
            break;
          }
          result = encryptAffine(plainPassword, a, b);
          break
        }
      case 'Ceasar':
        const key = parseInt(encryptionKey);
        if (isNaN(key)) {
          console.log("im here")
          result = 'Invalid key for Ceasar Cipher';
          break;
        }
        try {
          result = encryptCeasar(plainPassword,key );
          break;
        }
        catch (err) {
          result = 'Ceasar encryption failed';
          console.log(err)
          break;
        }

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
    <div className={`min-h-screen flex items-center justify-center transform transition-all duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className={`w-full max-w-md p-8 rounded-xl shadow-2xl border-2 transform transition-all duration-300 ${isDarkMode
        ? 'bg-gray-800 border-gray-700'
        : 'bg-white border-gray-200'}`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <ShieldIcon className={`mr-4 w-12 h-12 transform transition-all duration-300 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
            <h1 className="text-3xl font-bold">Advanced Encryption Tool</h1>
          </div>
          <BackButton isDarkMode={isDarkMode} />
        </div>

        <div className="space-y-4">
          {/* Encryption Method Selector */}
          <SelectionDropDown encryptionType={encryptionType} encryptionMethods={encryptionMethods} isDarkMode={isDarkMode} setEncryptionKey={setEncryptionKey} setEncryptionType={setEncryptionType} setGeneratedPublicKey={setGeneratedPublicKey} notice={"Encryption Method"} />
          <PasswordInput isDarkMode={isDarkMode} setPassword={setPlainPassword} password={plainPassword} showPassword={showPassword} setShowPassword={setShowPassword} />
          {/* Non-RSA Key Input */}
          {encryptionType !== 'RSA' && encryptionType !== "Affine" && encryptionMethods.find(m => m.value === encryptionType)?.requiresKey && (
            <KeyInput isDarkMode={isDarkMode} setKey={setEncryptionKey} Key={encryptionKey} notice={"Encryption Key"} />
          )}
          {/*Affine Key Display */}
          {encryptionType === 'Affine' && (
            <KeyInput isDarkMode={isDarkMode} setKey={setEncryptionKey} Key={encryptionKey} notice={"Enter a and b for the affine cipher seperate by , "} />
          )}
          <Button handleEvent={handleEncrypt} password={plainPassword} word={"Encrypt"} isDarkMode={isDarkMode}></Button>

          {/* RSA Public Key Display */}
          {encryptionType === 'RSA' && generatedPublicKey && (
            <RsaPublicKeyDisplay isDarkMode={isDarkMode} copyToClipboard={copyToClipboard} generatedPublicKey={generatedPublicKey} generatedPrivaetKey={generatedPrivaetKey} />
          )}


          {/* Encrypted Result */}
          {encryptedPassword && (
            <Result isDarkMode={isDarkMode} notice={"Encrypted Password"} copyToClipboard={copyToClipboard} setShowResult={setShowEncrypted} showText={showEncrypted} text={encryptedPassword} />
          )}
        </div>

        {/* Mode Toggle */}
        <DarkModeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}></DarkModeToggle>
      </div>
    </div>
  );
};

export default PasswordEncryptor;