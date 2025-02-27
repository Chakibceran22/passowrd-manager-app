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
 // Calculate letter frequency
//  const analyzeLetterFrequency = (text) => {
//   const cleanText = text.toUpperCase().replace(/[^A-Z]/g, '');
//   const charCount = {};
//   let total = cleanText.length;
  
//   // Count each letter
//   for (let i = 0; i < cleanText.length; i++) {
//     const char = cleanText[i];
//     if (!charCount[char]) charCount[char] = 0;
//     charCount[char]++;
//   }
  
//   // Calculate percentages and prepare for display
//   const frequencies = {};
//   for (let char in charCount) {
//     frequencies[char] = (charCount[char] / total * 100).toFixed(2);
//   }
  
//   // Sort by frequency
//   const sortedChars = Object.keys(frequencies).sort(
//     (a, b) => parseFloat(frequencies[b]) - parseFloat(frequencies[a])
//   );
  
//   let result = "Letter Frequency Analysis:\n\n";
//   result += "| Letter | Count | % | Expected % |\n";
//   result += "|--------|-------|----|------------|\n";
  
//   sortedChars.forEach(char => {
//     const expectedFreq = languageFrequencies[referenceLanguage][char] 
//       ? languageFrequencies[referenceLanguage][char].toFixed(2) + "%" 
//       : "-";
//     result += `| ${char} | ${charCount[char]} | ${frequencies[char]}% | ${expectedFreq} |\n`;
//   });
  
//   // Common English language substitutions based on frequency
//   if (referenceLanguage === 'english' && sortedChars.length > 5) {
//     result += "\nPossible substitutions based on frequency:\n\n";
//     const commonLetters = ['E', 'T', 'A', 'O', 'I', 'N', 'S', 'H', 'R', 'D', 'L', 'U'];
    
//     for (let i = 0; i < Math.min(8, sortedChars.length); i++) {
//       if (commonLetters[i]) {
//         result += `${sortedChars[i]} might be ${commonLetters[i]}\n`;
//       }
//     }
//   }
  
//   return result;
// };

// // Analyze bigrams (two-letter sequences)
// const analyzeBigrams = (text) => {
//   const cleanText = text.toUpperCase().replace(/[^A-Z]/g, '');
//   const bigramCount = {};
//   let total = 0;
  
//   // Count bigrams
//   for (let i = 0; i < cleanText.length - 1; i++) {
//     const bigram = cleanText.substring(i, i + 2);
//     if (!bigramCount[bigram]) bigramCount[bigram] = 0;
//     bigramCount[bigram]++;
//     total++;
//   }
  
//   // Sort by frequency
//   const sortedBigrams = Object.keys(bigramCount).sort(
//     (a, b) => bigramCount[b] - bigramCount[a]
//   );
  
//   // English common bigrams for reference
//   const commonEnglishBigrams = ['TH', 'HE', 'IN', 'ER', 'AN', 'RE', 'ND', 'ON', 'EN', 
//                               'AT', 'ES', 'OR', 'TE', 'OF', 'ED', 'IS', 'IT', 'AL', 'AR', 'ST'];
  
//   let result = "Bigram Analysis:\n\n";
//   result += "| Bigram | Count | % | Common in English |\n";
//   result += "|--------|-------|----|-----------------|\n";
  
//   sortedBigrams.slice(0, 20).forEach(bigram => {
//     const percent = (bigramCount[bigram] / total * 100).toFixed(2);
//     const isCommon = commonEnglishBigrams.includes(bigram) ? "Yes" : "No";
//     result += `| ${bigram} | ${bigramCount[bigram]} | ${percent}% | ${isCommon} |\n`;
//   });
  
//   return result;
// };

// // Calculate Index of Coincidence
// const calculateIC = (text) => {
//   const cleanText = text.toUpperCase().replace(/[^A-Z]/g, '');
//   const counts = {};
//   const length = cleanText.length;
  
//   // Count character occurrences
//   for (let i = 0; i < length; i++) {
//     const char = cleanText[i];
//     if (!counts[char]) counts[char] = 0;
//     counts[char]++;
//   }
  
//   // Calculate sum of n(n-1)
//   let sum = 0;
//   for (let char in counts) {
//     const n = counts[char];
//     sum += n * (n - 1);
//   }
  
//   // Calculate IC: sum / (N(N-1))
//   const ic = sum / (length * (length - 1));
  
//   // Common IC values for reference
//   const icReference = {
//     'english': 0.067,
//     'french': 0.078,
//     'german': 0.076,
//     'spanish': 0.072,
//     'random': 0.038
//   };
  
//   let result = "Index of Coincidence Analysis:\n\n";
//   result += `Calculated IC: ${ic.toFixed(4)}\n\n`;
//   result += "Reference IC values:\n";
//   result += "| Language | IC |\n";
//   result += "|----------|----|\n";
//   result += "| English | 0.067 |\n";
//   result += "| French | 0.078 |\n";
//   result += "| German | 0.076 |\n";
//   result += "| Spanish | 0.072 |\n";
//   result += "| Random | 0.038 |\n\n";
  
//   // Interpretation
//   result += "Interpretation:\n";
//   if (ic > 0.060) {
//     result += "- High IC suggests a monoalphabetic substitution cipher\n";
//     result += "  (Caesar, simple substitution, etc.)\n";
//   } else if (ic < 0.045) {
//     result += "- Low IC suggests a polyalphabetic cipher, transposition cipher,\n";
//     result += "  or homophonic substitution\n";
//   } else {
//     result += "- Medium IC might indicate a polyalphabetic cipher with\n";
//     result += "  a small key (like Vigenère)\n";
//   }
  
//   return result;
// };

// // Chi-Squared test for language detection
// const calculateChiSquared = (text) => {
//   const cleanText = text.toUpperCase().replace(/[^A-Z]/g, '');
//   const observed = {};
//   const length = cleanText.length;
  
//   // Count observed frequencies
//   for (let i = 0; i < length; i++) {
//     const char = cleanText[i];
//     if (!observed[char]) observed[char] = 0;
//     observed[char]++;
//   }
  
//   // Calculate chi-squared against each language
//   const results = {};
  
//   for (let lang in languageFrequencies) {
//     let chiSquared = 0;
    
//     for (let char in languageFrequencies[lang]) {
//       // Expected count based on reference frequency
//       const expected = length * (languageFrequencies[lang][char] / 100);
      
//       // Observed count (0 if character not present)
//       const observedCount = observed[char] || 0;
      
//       // Add to chi-squared sum
//       chiSquared += Math.pow(observedCount - expected, 2) / expected;
//     }
    
//     results[lang] = chiSquared;
//   }
  
//   // Sort languages by chi-squared value (lower is better match)
//   const sortedLangs = Object.keys(results).sort(
//     (a, b) => results[a] - results[b]
//   );
  
//   let result = "Chi-Squared Analysis:\n\n";
//   result += "Lower values indicate better match to the language frequency profile.\n\n";
//   result += "| Language | Chi-Squared Value |\n";
//   result += "|----------|-----------------|\n";
  
//   sortedLangs.forEach(lang => {
//     result += `| ${lang.charAt(0).toUpperCase() + lang.slice(1)} | ${results[lang].toFixed(2)} |\n`;
//   });
  
//   result += "\nInterpretation:\n";
//   result += `- Best match: ${sortedLangs[0].charAt(0).toUpperCase() + sortedLangs[0].slice(1)}\n`;
//   result += "- Chi-squared test helps identify the possible plaintext language\n";
//   result += "- Can help narrow down substitution cipher possibilites\n";
  
//   return result;
// };

// // Find repeating patterns
// const findRepeatingPatterns = (text) => {
//   const cleanText = text.toUpperCase();
//   const patterns = {};
  
//   // Search for patterns from 3 to 7 characters
//   for (let len = 3; len <= 7; len++) {
//     for (let i = 0; i <= cleanText.length - len; i++) {
//       const pattern = cleanText.substr(i, len);
//       if (pattern.match(/[^A-Z]/)) continue; // Skip patterns with non-alphabetic chars
      
//       if (!patterns[pattern]) {
//         patterns[pattern] = {
//           positions: [],
//           count: 0
//         };
//       }
      
//       patterns[pattern].positions.push(i);
//       patterns[pattern].count++;
//     }
//   }
  
//   // Filter to patterns that appear at least twice
//   const repeatingPatterns = {};
//   for (let pattern in patterns) {
//     if (patterns[pattern].count >= 2) {
//       repeatingPatterns[pattern] = patterns[pattern];
//     }
//   }
  
//   // Calculate spacings between occurrences
//   for (let pattern in repeatingPatterns) {
//     repeatingPatterns[pattern].spacings = [];
//     const positions = repeatingPatterns[pattern].positions;
    
//     for (let i = 1; i < positions.length; i++) {
//       repeatingPatterns[pattern].spacings.push(positions[i] - positions[i-1]);
//     }
//   }
  
//   // Sort by pattern length (longest first) and count
//   const sortedPatterns = Object.keys(repeatingPatterns).sort((a, b) => {
//     if (a.length !== b.length) return b.length - a.length;
//     return repeatingPatterns[b].count - repeatingPatterns[a].count;
//   });
  
//   let result = "Repeating Pattern Analysis:\n\n";
  
//   if (sortedPatterns.length === 0) {
//     return result + "No repeating patterns found.";
//   }
  
//   result += "| Pattern | Length | Count | Positions | Spacings |\n";
//   result += "|---------|--------|-------|-----------|----------|\n";
  
//   // Show top 15 patterns
//   sortedPatterns.slice(0, 15).forEach(pattern => {
//     const info = repeatingPatterns[pattern];
//     result += `| ${pattern} | ${pattern.length} | ${info.count} | ${info.positions.join(',')} | ${info.spacings.join(',')} |\n`;
//   });
  
//   result += "\nInterpretation:\n";
//   result += "- Repeating patterns can indicate repeated words in the plaintext\n";
//   result += "- Spacings between patterns can help determine key length in Vigenère ciphers\n";
//   result += "- Common factors in spacings often reveal the key length\n";
  
//   return result;
// };

// // Perform Kasiski examination
// const performKasiskiExamination = (text) => {
//   const cleanText = text.toUpperCase().replace(/[^A-Z]/g, '');
//   const repeats = findRepeatingPatterns(cleanText);
  
//   // Extract spacing values and find their factors
//   const getFactors = (num) => {
//     const factors = [];
//     for (let i = 2; i <= Math.floor(Math.sqrt(num)); i++) {
//       if (num % i === 0) {
//         factors.push(i);
//         if (i !== num / i) {
//           factors.push(num / i);
//         }
//       }
//     }
//     return factors.sort((a, b) => a - b);
//   };
  
//   // Extract all spacings from the pattern analysis
//   const patternData = repeats.split('\n').filter(line => line.includes('|')).slice(2);
  
//   const allSpacings = [];
//   const factorFrequency = {};
  
//   patternData.forEach(line => {
//     const parts = line.split('|');
//     if (parts.length >= 6) {
//       const spacings = parts[5].trim().split(',').map(Number);
//       spacings.forEach(spacing => {
//         if (spacing > 1) {
//           allSpacings.push(spacing);
          
//           // Get factors of each spacing
//           const factors = getFactors(spacing);
//           factors.forEach(factor => {
//             if (!factorFrequency[factor]) factorFrequency[factor] = 0;
//             factorFrequency[factor]++;
//           });
//         }
//       });
//     }
//   });
  
//   // Sort factors by frequency
//   const sortedFactors = Object.keys(factorFrequency)
//     .map(Number)
//     .sort((a, b) => {
//       if (factorFrequency[b] !== factorFrequency[a]) {
//         return factorFrequency[b] - factorFrequency[a];
//       }
//       return a - b; // If same frequency, sort by value (ascending)
//     });
  
//   let result = "Kasiski Examination:\n\n";
//   result += repeats + "\n";
  
//   // Add key length analysis
//   result += "Probable Key Lengths:\n";
//   result += "| Key Length | Frequency |\n";
//   result += "|------------|----------|\n";
  
//   sortedFactors.slice(0, 10).forEach(factor => {
//     result += `| ${factor} | ${factorFrequency[factor]} |\n`;
//   });
  
//   result += "\nConclusion:\n";
//   result += `Most likely key length: ${sortedFactors[0]}\n`;
//   result += "The key length is likely one of the most common factors.";
  
//   return result;
// };

// const runAnalysis = () => {
//   if (!cipherText) {
//     setAnalysisResult("Please enter some cipher text to analyze.");
//     return;
//   }
  
//   let result = '';
  
//   switch (analysisType) {
//     case 'letterFrequency':
//       result = analyzeLetterFrequency(cipherText);
//       break;
//     case 'bigramFrequency':
//       result = analyzeBigrams(cipherText);
//       break;
//     case 'indexOfCoincidence':
//       result = calculateIC(cipherText);
//       break;
//     case 'chiSquared':
//       result = calculateChiSquared(cipherText);
//       break;
//     case 'repeatingPatterns':
//       result = findRepeatingPatterns(cipherText);
//       break;
//     case 'kasiski':
//       result = performKasiskiExamination(cipherText);
//       break;
//     default:
//       result = "Invalid analysis method selected.";
//   }
  
//   setAnalysisResult(result);
//   setShowResult(true);
// };
