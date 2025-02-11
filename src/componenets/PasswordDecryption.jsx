import React, { useState } from 'react';
import { ShieldIcon, KeyIcon } from './SecurityIcons';
import { decryptMessage } from '../encModules/rsa';
import Button from './Button';
import Input from './Input';
import SelectionDropDown from './SelectionDropDown';
import DarkModeToggle from './ToggleButton';
import KeyInput from './KeyInput';
import BackButton from './BackButton';
import { decryptAffine } from '../encModules/affine';
import { useEffect } from 'react';
import Result from './Result';
import { decryptRot13 } from '../encModules/rot13';

const PasswordDecryptor = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [encryptedPassword, setEncryptedPassword] = useState('');
  const [decryptionKey, setDecryptionKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [modulus, setModulus] = useState('');
  const [decryptedPassword, setDecryptedPassword] = useState('');
  const [decryptionType, setDecryptionType] = useState('ROT13');
  const [showDecrypted, setShowDecrypted] = useState(false);
  useEffect(() => {
    document.title = "Advanced Decryption Tool"
  })
  const decryptionMethods = [
    { value: 'ROT13', label: 'ROT 13', requiresKey: false },
    { value: 'xorCipher', label: 'XOR Cipher', requiresKey: true },
    { value: 'base64', label: 'Base64', requiresKey: false },
    { value: 'vigenere', label: 'Vigenère Cipher', requiresKey: true },
    { value: 'rsa', label: 'RSA', requiresKey: true },
    {value : "Affine", label: "Affine Cipher", requiresKey: true},
  ];

  const handleDecrypt = () => {
    let result = '';

    switch (decryptionType) {
      case 'rsa':
        if (!privateKey || !modulus) {
          result = 'Both private key and modulus are required for RSA';
          break;
        }
        // Add RSA decryption logic here using privateKey and modulus
        try{
          const d = parseInt(privateKey);
          const n = parseInt(modulus);
          const decryptedMessage = decryptMessage(JSON.parse(atob(encryptedPassword)), d, n);
          result = decryptedMessage;          
        break;
        }catch(err){
          result = 'RSA decryption failed';
          console.log(err)
          break;
        }

      case 'ROT13':
        result = decryptRot13(encryptedPassword);
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
          if( char.match(/[a-z]/i) ) {
            const cNum = char.charCodeAt(0);
            const kNum = decryptionKey.charCodeAt(index % decryptionKey.length);
            const base = char <= 'Z' ? 65 : 97;
            return String.fromCharCode((cNum - kNum + 26) % 26 + base);
          }
          return char;
        }).join('');
        break;
        case 'Affine':{
          if(!decryptionKey){
            result = 'Key required for Affine Cipher';
            break;
          }
          else{
            const [a, b] = decryptionKey.split(',').map(Number);
            if(isNaN(a) || isNaN(b)){
              result = 'Invalid key for Affine Cipher';
              break;
            }
            result = decryptAffine(encryptedPassword, a, b);
            break;
            
          }
        }

      default:
        result = 'Invalid decryption method';
    }

    setDecryptedPassword(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(decryptedPassword);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center transform transition-all duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className={`w-full max-w-md p-8 rounded-xl shadow-2xl border-2 transform transition-all duration-300 ${isDarkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'}`}>
        <div className="flex items-center mb-6">
          <ShieldIcon className={`mr-4 w-12 h-12 transform transition-all duration-300 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
          <h1 className="text-3xl font-bold">Advanced Decryption Tool</h1>
          <BackButton isDarkMode={isDarkMode}/>
        </div>

        <div className="space-y-4">
          <Input placeholder={"Encrypted Text"} password={encryptedPassword} setPassword={setEncryptedPassword} isDarkMode={isDarkMode}></Input>

          <SelectionDropDown encryptionType={decryptionType} encryptionMethods={decryptionMethods} isDarkMode={isDarkMode} setEncryptionKey={setDecryptionKey} setEncryptionType={setDecryptionType} setGeneratedPublicKey={setPrivateKey} notice={"Deryption Method"}/>


          {/* RSA-specific inputs */}
          {decryptionType === 'rsa' && (
            <div className="space-y-4">
              <div>
                <label className="block mb-2 flex items-center ">
                  <KeyIcon className="mr-2 w-5 h-5 transform transition-all duration-300" />
                  Private Key (d)
                </label>
                <input 
                  type="number"
                  value={privateKey}
                  onChange={(e) => setPrivateKey(e.target.value)}
                  placeholder="Enter private key"
                  className={`w-full p-3 rounded-lg border-2 transform transition-all duration-300 ${isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-black'}`}
                />
              </div>
              <div>
                <label className="block mb-2 flex items-center">
                  <KeyIcon className="mr-2 w-5 h-5" />
                  Modulus (n)
                </label>
                <input 
                  type="number"
                  value={modulus}
                  onChange={(e) => setModulus(e.target.value)}
                  placeholder="Enter modulus"
                  className={`w-full p-3 rounded-lg border-2 transform transition-all duration-300 ${isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-black'}`}
                />
              </div>
            </div>
          )}

          {/* Conditional Key Input for other methods */}
          {decryptionType !== 'rsa' && decryptionType!=="Affine" && decryptionMethods.find(m => m.value === decryptionType)?.requiresKey && (
            <KeyInput isDarkMode={isDarkMode} setKey={setDecryptionKey} Key={decryptionKey} notice={"Decryption Key"} />
          )}
          {decryptionType === "Affine" && (
            <KeyInput isDarkMode={isDarkMode} setKey={setDecryptionKey} Key={decryptionKey} notice={"Enter a and b for the affine cipher seperate by , "} />
          )}

          <Button handleEvent={handleDecrypt} password={encryptedPassword} word={"Decrypt"} isDarkMode={isDarkMode}></Button>
          

          {/* Decrypted Result */}
          {decryptedPassword && (
            <Result isDarkMode={isDarkMode} notice={"Decrypted Password"} copyToClipboard={copyToClipboard} setShowResult={setShowDecrypted} showText={showDecrypted} text={decryptedPassword} />
          )}
        </div>

        {/* Mode Toggle */}
        <DarkModeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}></DarkModeToggle>
      </div>
    </div>
  );
};

export default PasswordDecryptor;