import React, { useState, useEffect } from 'react';
import Button from '../componenets/Button';
import Input from '../componenets/Input';
import SelectionDropDown from '../componenets/SelectionDropDown';
import DarkModeToggle from '../componenets/ToggleButton';
import LetterFrequencyResult from '../componenets/LetteerFrequencyResult';
import IndexOfCoincidenceResult from '../componenets/IndexOfCoincidenceResult';
import KasiskiResult from '../componenets/KasiskiResult';
import LanuageSelector from '../componenets/LanguageSelector';
import AnalysisResult from '../componenets/AnalysisResult';
import CryptanalysisToolsHeader from '../componenets/CryptanalysisToolsHeader';

const FrequencyAnalysisTool = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [cipherText, setCipherText] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');
  const [analysisData, setAnalysisData] = useState(null);
  const [analysisType, setAnalysisType] = useState('letterFrequency');
  const [showResult, setShowResult] = useState(false);
  const [referenceLanguage, setReferenceLanguage] = useState('english');

  useEffect(() => {
    document.title = "Cryptanalysis Tool"
  }, []);

  const analysisMethods = [
    { value: 'letterFrequency', label: 'Letter Frequency', requiresKey: false },
    { value: 'bigramFrequency', label: 'Bigram Analysis', requiresKey: false },
    { value: 'indexOfCoincidence', label: 'Index of Coincidence', requiresKey: false },
    { value: 'chiSquared', label: 'Chi-Squared Test', requiresKey: false },
    { value: 'repeatingPatterns', label: 'Repeating Patterns', requiresKey: false },
    { value: 'kasiski', label: 'Kasiski Examination', requiresKey: false }
  ];

  const languageOptions = [
    { value: 'english', label: 'English' },
    { value: 'french', label: 'French' },
    { value: 'german', label: 'German' },
    { value: 'spanish', label: 'Spanish' }
  ];

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

  const runAnalysis = () => {
    if (!cipherText) return;

    let result = '';
    let data = null;

    // Preprocess text - convert to uppercase and remove non-alphabetic characters
    const processedText = cipherText.toUpperCase().replace(/[^A-Z]/g, '');

    switch (analysisType) {
      case 'letterFrequency':
        // Count letter frequencies
        const letterCounts = {};
        let totalLetters = 0;

        for (const char of processedText) {
          if (/[A-Z]/.test(char)) {
            letterCounts[char] = (letterCounts[char] || 0) + 1;
            totalLetters++;
          }
        }

        // Calculate percentages and prepare data for table
        const frequencyData = Object.keys(letterCounts).sort().map(letter => {
          const count = letterCounts[letter];
          const percentage = (count / totalLetters * 100).toFixed(2);
          const refPercentage = languageFrequencies[referenceLanguage][letter] || 0;
          const difference = (percentage - refPercentage).toFixed(2);

          return {
            letter,
            count,
            percentage,
            refPercentage: refPercentage.toFixed(2),
            difference
          };
        });

        // Sort by frequency (highest first)
        frequencyData.sort((a, b) => b.count - a.count);

        data = {
          type: 'letterFrequency',
          title: 'Letter Frequency Analysis',
          headers: ['Letter', 'Count', 'Frequency (%)', `${languageOptions.find(l => l.value === referenceLanguage).label} (%)`, 'Difference'],
          rows: frequencyData,
          totalItems: totalLetters
        };

        result = `Letter Frequency Analysis:\n\n`;
        frequencyData.forEach(item => {
          result += `${item.letter}: ${item.count} (${item.percentage}%)\n`;
        });
        break;



      case 'indexOfCoincidence':
        // Calculate Index of Coincidence
        const icLetterCounts = {};
        let icTotalLetters = 0;

        for (const char of processedText) {
          if (/[A-Z]/.test(char)) {
            icLetterCounts[char] = (icLetterCounts[char] || 0) + 1;
            icTotalLetters++;
          }
        }

        let sumFrequencies = 0;
        for (const letter in icLetterCounts) {
          const frequency = icLetterCounts[letter];
          sumFrequencies += frequency * (frequency - 1);
        }

        const ic = icTotalLetters > 1
          ? sumFrequencies / (icTotalLetters * (icTotalLetters - 1))
          : 0;

        // Expected ICs for reference languages
        const expectedIC = {
          english: 0.0667,
          french: 0.0778,
          german: 0.0762,
          spanish: 0.0770
        };

        data = {
          type: 'indexOfCoincidence',
          title: 'Index of Coincidence Analysis',
          value: ic.toFixed(4),
          expectedValue: expectedIC[referenceLanguage].toFixed(4),
          language: languageOptions.find(l => l.value === referenceLanguage).label
        };

        result = `Index of Coincidence: ${ic.toFixed(4)}\n`;
        result += `Expected IC for ${languageOptions.find(l => l.value === referenceLanguage).label}: ${expectedIC[referenceLanguage].toFixed(4)}\n`;
        result += `\nThis can indicate the type of cipher used. Values close to 0.07 suggest a monoalphabetic substitution, while values close to 0.04 suggest polyalphabetic substitution.`;
        break;
      case 'kasiski':
        // Find repeating sequences of at least 3 characters
        const repeats = {};
        const minLength = 3; // Minimum sequence length to consider

        for (let length = minLength; length <= 5; length++) { // Consider sequences up to 5 chars
          for (let i = 0; i <= processedText.length - length; i++) {
            const sequence = processedText.substring(i, i + length);

            // Find all occurrences of this sequence
            let positions = [];
            let pos = processedText.indexOf(sequence);
            while (pos !== -1) {
              positions.push(pos);
              pos = processedText.indexOf(sequence, pos + 1);
            }

            // Only consider sequences that appear multiple times
            if (positions.length > 1 && !repeats[sequence]) {
              repeats[sequence] = positions;
            }
          }
        }

        // Calculate distances between occurrences
        const distances = [];
        const sequenceData = [];

        for (const sequence in repeats) {
          const positions = repeats[sequence];
          const sequenceDistances = [];

          for (let i = 1; i < positions.length; i++) {
            const distance = positions[i] - positions[i - 1];
            sequenceDistances.push(distance);
            distances.push(distance);
          }

          sequenceData.push({
            sequence,
            positions: positions.join(', '),
            distances: sequenceDistances.join(', '),
            length: sequence.length
          });
        }

        // Get the GCD (Greatest Common Divisor) of all distances
        const gcd = (a, b) => b ? gcd(b, a % b) : a;

        const findGCDOfArray = (arr) => {
          let result = arr[0];
          for (let i = 1; i < arr.length; i++) {
            result = gcd(result, arr[i]);
          }
          return result;
        };

        const possibleKeyLengths = distances.length > 0 ? findGCDOfArray(distances) : 0;

        // Sort sequences by length (longer first) then by occurrence count
        sequenceData.sort((a, b) => {
          if (b.length !== a.length) return b.length - a.length;
          return b.positions.split(',').length - a.positions.split(',').length;
        });

        data = {
          type: 'kasiski',
          title: 'Kasiski Examination',
          sequences: sequenceData,
          possibleKeyLengths: possibleKeyLengths,
          headers: ['Sequence', 'Length', 'Positions', 'Distances']
        };

        result = `Kasiski Examination:\n\n`;
        result += `Possible key length: ${possibleKeyLengths}\n\n`;

        sequenceData.forEach(item => {
          result += `Sequence: ${item.sequence} (Length: ${item.length})\n`;
          result += `Positions: ${item.positions}\n`;
          result += `Distances: ${item.distances}\n\n`;
        });
        break;

      // Implement other analysis methods similarly
      default:
        result = `Analysis method ${analysisType} not implemented yet.`;
    }

    setAnalysisResult(result);
    setAnalysisData(data);
    setShowResult(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(analysisResult);
  };

  // Render different result tables based on analysis type
  const renderResultTable = () => {
    if (!analysisData) return null;

    switch (analysisData.type) {
      case 'letterFrequency':
        return (
          <LetterFrequencyResult isDarkMode={isDarkMode} analysisData={analysisData} />
        )
      case 'indexOfCoincidence':
        return (
          <IndexOfCoincidenceResult isDarkMode={isDarkMode} analysisData={analysisData} />
        )
      case 'kasiski':
        return(
          <KasiskiResult isDarkMode={isDarkMode} analysisData={analysisData} />
        )

      default:
        return (
          <div className={`p-4 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-300' : 'bg-white border-gray-300 text-gray-600'
            }`}>
            <pre className="whitespace-pre-wrap text-sm">{analysisResult}</pre>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center transform transition-all duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className={`w-full max-w-md p-8 rounded-xl shadow-2xl border-2 transform transition-all duration-300 ${isDarkMode
        ? 'bg-gray-800 border-gray-700'
        : 'bg-white border-gray-200'}`}>
        <CryptanalysisToolsHeader isDarkMode={isDarkMode} />

        <div className="space-y-4">
          <Input
            placeholder="Enter cipher text to analyze..."
            password={cipherText}
            isDarkMode={isDarkMode}
            setPassword={setCipherText}
          />
          <SelectionDropDown
            encryptionType={analysisType}
            encryptionMethods={analysisMethods}
            isDarkMode={isDarkMode}
            setEncryptionType={setAnalysisType}
            notice="Analysis Method"
          />

          <LanuageSelector isDarkMode={isDarkMode} referenceLanguage={referenceLanguage} languageOptions={languageOptions} setReferenceLanguage={setReferenceLanguage} />

          <Button
            handleEvent={runAnalysis}
            password={cipherText}
            word="Analyze"
            isDarkMode={isDarkMode}
          />

          <AnalysisResult analysisData={analysisData} copyToClipboard={copyToClipboard} isDarkMode={isDarkMode} renderResultTable={renderResultTable} />
        </div>

        <DarkModeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </div>
    </div>
  );
};

export default FrequencyAnalysisTool;