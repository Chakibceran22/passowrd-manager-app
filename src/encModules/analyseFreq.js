import { decryptCeasar } from "./ceasar.js";

const frequencyAnalysis = (text) => {
    // Normalize: convert to uppercase and filter only A-Z letters
    const filteredText = text.toUpperCase().replace(/[^A-Z]/g, '');
    let frequencyMap = new Map();
    
    // Count frequency of each letter
    for (let char of filteredText) {
      frequencyMap.set(char, (frequencyMap.get(char) || 0) + 1);
    }
    
    // Convert counts to percentages based on the filtered text length
    for (let [key, value] of frequencyMap) {
      frequencyMap.set(key, (value / filteredText.length) * 100);
    }
    
    // Return a map sorted by descending frequency
    return new Map([...frequencyMap.entries()].sort((a, b) => b[1] - a[1]));
  };
  
  const languageFrequencies = {
    english: {
      'E': 12.02, 'T': 9.10, 'A': 8.12, 'O': 7.68, 'I': 7.31, 'N': 6.95, 'S': 6.28,
      'R': 6.02, 'H': 5.92, 'D': 4.32, 'L': 3.98, 'U': 2.88, 'C': 2.71, 'M': 2.61,
      'F': 2.30, 'Y': 2.11, 'W': 2.09, 'G': 2.03, 'P': 1.82, 'B': 1.49, 'V': 1.11,
      'K': 0.69, 'X': 0.17, 'Q': 0.11, 'J': 0.10, 'Z': 0.07
    },
    french: {
      'E': 14.72, 'A': 8.11, 'I': 7.58, 'S': 7.94, 'N': 7.10, 'R': 6.54, 'T': 7.00, 
      'U': 6.31, 'L': 5.46, 'O': 5.38, 'D': 3.66, 'C': 3.26, 'M': 2.97, 'P': 2.98,
      'É': 1.90, 'V': 1.83, 'H': 0.86, 'G': 1.06, 'F': 1.06, 'B': 0.90, 'Q': 1.36,
      'J': 0.54, 'À': 0.49, 'Z': 0.13, 'X': 0.39, 'K': 0.02, 'W': 0.04, 'Y': 0.31
    },
    german: {
      'E': 16.93, 'N': 9.78, 'I': 7.55, 'S': 7.27, 'R': 7.00, 'A': 6.51, 'T': 6.15,
      'D': 5.08, 'H': 4.76, 'U': 4.35, 'L': 3.44, 'C': 2.73, 'G': 3.01, 'M': 2.53,
      'O': 2.51, 'B': 1.89, 'W': 1.89, 'F': 1.66, 'K': 1.21, 'Z': 1.13, 'P': 0.79,
      'V': 0.67, 'J': 0.27, 'Y': 0.04, 'X': 0.03, 'Q': 0.02
    },
    spanish: {
      'E': 13.68, 'A': 12.53, 'O': 8.68, 'S': 7.98, 'R': 6.87, 'N': 7.01, 'I': 6.25,
      'D': 5.86, 'L': 5.56, 'T': 4.68, 'C': 4.68, 'U': 3.93, 'M': 3.15, 'P': 2.51,
      'B': 1.42, 'G': 1.01, 'V': 1.05, 'Y': 0.90, 'Q': 0.88, 'H': 0.70, 'F': 0.69,
      'Z': 0.52, 'J': 0.44, 'Ñ': 0.17, 'X': 0.22, 'K': 0.01, 'W': 0.01
    }
  };
  
  // Generates a decryption map by matching the sorted frequency
  // order of letters in the text with the known language frequencies.
  const frequencyTest = (text, language) => {
    let textFreq = frequencyAnalysis(text);
    let langFreq = new Map(Object.entries(languageFrequencies[language]));
  
    let sortedTextFreq = [...textFreq.entries()].sort((a, b) => b[1] - a[1]);
    let sortedLangFreq = [...langFreq.entries()].sort((a, b) => b[1] - a[1]);
  
    let decryptionMap = new Map();
    for (let i = 0; i < sortedTextFreq.length && i < sortedLangFreq.length; i++) {
      decryptionMap.set(sortedTextFreq[i][0], sortedLangFreq[i][0]);
    }
    return decryptionMap;
  };
  
  // Replaces characters in the original text using the decryption map.
  // This version preserves spaces, punctuation, and the original letter case.
  const replaceText = (text, decryptionMap) => {
    let newText = "";
    for (let char of text) {
      // Convert character to uppercase for mapping lookup
      let upperChar = char.toUpperCase();
      if (decryptionMap.has(upperChar)) {
        let decryptedChar = decryptionMap.get(upperChar);
        // Preserve original case: if original was lowercase, use lowercase result
        newText += (char === char.toLowerCase())
          ? decryptedChar.toLowerCase()
          : decryptedChar;
      } else {
        newText += char;
      }
    }
    return newText;
  };
  
  const encryptedText = "WKH TXLFN EURZQ IRA MXPSV RYHU WKH ODCB GRJ.";
  const decryptionMap = frequencyTest(encryptedText, "english");
console.log(decryptionMap)