# Encryption & Decryption Application
A robust encryption and decryption application implementing multiple classical and modern cryptographic algorithms with advanced cryptanalysis tools.

## 🔐 Features

### Implemented Ciphers
- **Hill Cipher**: Matrix-based encryption technique
- **Caesar Cipher**: Classic substitution cipher with fixed shift
- **Vigenère Cipher**: Polyalphabetic substitution using a keyword
- **ROT13**: Special case of Caesar cipher with 13-position shift
- **Affine Cipher**: Mathematical function-based substitution cipher
- **XOR Cipher**: Bitwise operation-based encryption
- **RSA**: Public-key cryptography implementation

### Cryptanalysis Tools
- **Letter Frequency Analysis**: Statistical tool to analyze character distribution in ciphertext
- **Kasiski Examination**: Technique for finding the key length in polyalphabetic substitution ciphers
- **Index of Coincidence**: Mathematical tool to measure the unevenness of letter distribution in a text

## 🚀 Getting Started

### Prerequisites
- [List your prerequisites here]
- [Any specific versions needed]

### Installation
1. Clone the repository:
```bash
git clone https://github.com/Chakibceran22/passowrd-manager-app.git
```
2. Navigate to the project directory:
```bash
cd passowrd-manager-app
```
3. Install dependencies:
```bash
npm install  # or your specific install command
```

## 💻 Usage

### RSA Key Configuration
You can modify the RSA keys in the `encModules` file located in the frontend directory. Adjust the keys according to your security requirements.

### Cipher Implementations
All cipher implementations can be found and tested in the `encModules` folder. Each cipher has its own dedicated file for easy maintenance and testing.

### Using Analysis Tools
The cryptanalysis tools are available in the `analysisTools` directory:

- **Letter Frequency Analysis**: Helps break simple substitution ciphers by comparing character frequencies with known language patterns
```javascript
import { letterFrequencyAnalyzer } from './analysisTools/letterFrequency';
const analysis = letterFrequencyAnalyzer(ciphertext);
```

- **Kasiski Examination**: Identifies repeated sequences in ciphertext to determine potential key lengths
```javascript
import { kaskiskiExamination } from './analysisTools/kasiski';
const potentialKeyLengths = kaskiskiExamination(ciphertext);
```

- **Index of Coincidence**: Measures randomness in text to distinguish between monoalphabetic and polyalphabetic ciphers
```javascript
import { calculateIC } from './analysisTools/indexOfCoincidence';
const ic = calculateIC(ciphertext);
```

## 🗺️ Roadmap

### Future Features
- [ ] MD5 Hashing
- [ ] SHA-256 Implementation
- [ ] Bcrypt Integration
- [ ] Additional Hash Functions
- [ ] Automated Cryptanalysis for Common Ciphers
- [ ] Machine Learning-Based Cipher Detection

## 🤝 Contributing
We welcome contributions! Here's how you can help:
1. Fork the repository
2. Create your feature branch:
```bash
git checkout -b feature/AmazingFeature
```
3. Commit your changes:
```bash
git commit -m 'Add some AmazingFeature'
```
4. Push to the branch:
```bash
git push origin feature/AmazingFeature
```
5. Open a Pull Request

### Contribution Guidelines
- Write clean, documented code
- Follow the existing code style
- Add tests for new features
- Update documentation as needed





## 📚 Documentation
Detailed documentation for each cipher implementation and analysis tool can be found in their respective files within the `encModules` and `analysisTools` directories.

## ⚠️ Security Notice
While this application implements various encryption algorithms, some (like Caesar Cipher) are for educational purposes and should not be used for securing sensitive data in production environments. The analysis tools provided are meant for educational purposes and cryptanalysis learning.

## 📞 Contact
Your Name - [Email](grabahchakib008@gmail.com)
Project Link: [https://github.com/Chakibceran22/passowrd-manager-app](https://github.com/Chakibceran22/passowrd-manager-app)

## ✨ Acknowledgments
- List any acknowledgments here
- Credit any resources or inspirations
- Thank contributors
