import React, { useState } from 'react';
import { ShieldIcon, KeyIcon } from '../componenets/SecurityIcons'; 
import { decryptMessage } from '../encModules/rsa';
import Button from '../componenets/Button';
import Input from '../componenets/Input';
import SelectionDropDown from '../componenets/SelectionDropDown';
import DarkModeToggle from '../componenets/ToggleButton';
import KeyInput from '../componenets/KeyInput';
import BackButton from '../componenets/BackButton';
import { decryptAffine } from '../encModules/affine';
import { useEffect } from 'react';
import Result from '../componenets/Result';
import { decryptXor } from '../encModules/xorCypher';
import { decryptRot13 } from '../encModules/rot13';
import { decryptVigener } from '../encModules/vigenere';
import { decryptCeasar } from '../encModules/ceasar';
import { decryptHill } from '../encModules/hiil';
import { matrix, reshape } from 'mathjs';
import HillMatrixInput from '../componenets/HillMatrixInput';
import { decryptionRandomShuffle } from '../encModules/randomShuffle';
import { decryptPlayfair } from '../encModules/playfair';


const PasswordDecryptor = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [encryptedPassword, setEncryptedPassword] = useState('');
  const [decryptionKey, setDecryptionKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [modulus, setModulus] = useState('');
  const [decryptedPassword, setDecryptedPassword] = useState('');
  const [decryptionType, setDecryptionType] = useState('ROT13');
  const [showDecrypted, setShowDecrypted] = useState(false);
  const [hillMatrix, setHillMatrix] = useState([
    ['', ''],
    ['', '']
  ]);
  useEffect(() => {
    document.title = "Advanced Decryption Tool"
  })
  const decryptionMethods = [
    { value: 'ROT13', label: 'ROT 13', requiresKey: false },
    { value: 'xorCipher', label: 'XOR Cipher', requiresKey: true },
    { value: 'base64', label: 'Base64', requiresKey: false },
    { value: 'vigenere', label: 'Vigenère Cipher', requiresKey: true },
    { value: 'rsa', label: 'RSA', requiresKey: true },
    { value: "Affine", label: "Affine Cipher", requiresKey: true },
    { value: "Ceasar", label: "Ceasar Cipher", requiresKey: true },
    { value: "Hill", label: "Hill Cipher", requiresKey: true },
    { value: "Random Shuffle", label: "Random Shuffle", requiresKey: true },
    { value: "Playfair", label: "Playfair Cipher", requiresKey: true },
  ];
  const handleHillMatrixChange = (row, col, value) => {
    const newMatrix = [...hillMatrix];
    newMatrix[row][col] = value;
    setHillMatrix(newMatrix);
  } 

  const handleDecrypt = () => {
    let result = '';

    switch (decryptionType) {
      case 'rsa':
        if (!privateKey || !modulus) {
          result = 'Both private key and modulus are required for RSA';
          break;
        }
        // Add RSA decryption logic here using privateKey and modulus
        try {
          const d = parseInt(privateKey);
          const n = parseInt(modulus);
          const decryptedMessage = decryptMessage(JSON.parse(atob(encryptedPassword)), d, n);
          result = decryptedMessage;
          break;
        } catch (err) {
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
        result = decryptXor(atob(encryptedPassword), decryptionKey);
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
        result = decryptVigener(encryptedPassword, decryptionKey);
        break;
      case 'Affine': {
        if (!decryptionKey) {
          result = 'Key required for Affine Cipher';
          break;
        }
        else {
          const [a, b] = decryptionKey.split(',').map(Number);
          if (isNaN(a) || isNaN(b)) {
            result = 'Invalid key for Affine Cipher';
            break;
          }
          result = decryptAffine(encryptedPassword, a, b);
          break;
        }
      }
      case 'Ceasar': {
        const key = parseInt(decryptionKey);
        if( isNaN(key)){
          result = 'Invalid key for Ceasar Cipher';
          break;
        }
        try{
          result = decryptCeasar(encryptedPassword, key);
          break;
        }catch(err){
          result = 'Ceasar decryption failed';
          console.log(err)
          break
        }
      }
      case 'Hill': {
        try{
          const hillKey = matrix(reshape(hillMatrix.map(row => row.map(cell => parseInt(cell))), [2, 2]));
          result = decryptHill(encryptedPassword, hillKey);
          break;
        }
        catch(err){
          result = 'Hill decryption failed';
          console.log(err)
          break;
        }
        
      }
      case 'Random Shuffle': {
        if (!decryptionKey) {
          result = 'Random shuffle table required';
        } else {
          try {
            const shuffledAlphabetArray = decryptionKey.split('');
            result = decryptionRandomShuffle(encryptedPassword, shuffledAlphabetArray);
          } catch (err) {
            result = 'Random shuffle decryption failed';
            console.log(err);
          }
        }
        break; 
      }
      case 'Playfair': {
        if (!decryptionKey) {
            result = 'Key required for Playfair Cipher';
        } else {
          try {
            result = decryptPlayfair(encryptedPassword, decryptionKey);
          } catch (err) {
            result = 'Playfair decryption failed';
            console.log(err);
          }
        }
        break;
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
          <BackButton isDarkMode={isDarkMode} />
        </div>

        <div className="space-y-4">
          <Input placeholder={"Decryption Text:"} password={encryptedPassword} isDarkMode={isDarkMode} setPassword={setEncryptedPassword} />
          <SelectionDropDown encryptionType={decryptionType} encryptionMethods={decryptionMethods} isDarkMode={isDarkMode} setEncryptionKey={setDecryptionKey} setEncryptionType={setDecryptionType} setGeneratedPublicKey={setPrivateKey} notice={"Deryption Method"} />
          {decryptionType === 'Hill' && (
            <HillMatrixInput hillMatrix={hillMatrix} isDarkMode={isDarkMode} handleHillMatrixChange={handleHillMatrixChange} />
          )}

          {/* RSA-specific inputs */}
          {decryptionType === 'rsa' && (
            <div className="space-y-4">
              <div>
                <label className=" mb-2 flex items-center ">
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
                <label className=" mb-2 flex items-center">
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
          {decryptionType !== 'rsa' && decryptionType !== "Affine" && decryptionType !=='Hill' && decryptionMethods.find(m => m.value === decryptionType)?.requiresKey && (
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