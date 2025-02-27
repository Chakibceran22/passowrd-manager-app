const frequencyAnalysis = (text) => {
    let frequencyMap = new Map();
    for ( let char of text){
        frequencyMap.set(char, (frequencyMap.get(char) || 0) + 1);
    }
    for (let [key, value] of frequencyMap){
        frequencyMap.set(key, value / text.length * 100);
    }
    const sortedFrequencyMap = new Map([...frequencyMap.entries()].sort((a, b) => b[1] - a[1]));
    return sortedFrequencyMap;
}
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
  
  
  const frequencyTest = (text, language) => {
    let textFreq = frequencyAnalysis(text); 
    let langFreq = new Map(Object.entries(languageFrequencies[language])); 

    let textDecryptionMap = new Map();

    let sortedTextFreq = [...textFreq.entries()].sort((a, b) => b[1] - a[1]);

    let sortedLangFreq = [...langFreq.entries()].sort((a, b) => b[1] - a[1]);

    for (let i = 0; i < sortedTextFreq.length && i < sortedLangFreq.length; i++) {
        textDecryptionMap.set(sortedTextFreq[i][0], sortedLangFreq[i][0]);
    }

    return textDecryptionMap;
};
const replqceText = (text, decryptionMap) => {
    let newText = "";
    for (let char of text){
        newText += decryptionMap.get(char) || char;
    }
    return newText;
}


const decryptionMap = frequencyTest("Xlmw mw E qixxiv saxsvi. Wtpmrk svh ziv xlmw csy jsyrh xlmw erow hvepi.", "english")
console.log(replqceText("Xlmw mw E qixxiv saxsvi. Wtpmrk svh ziv xlmw csy jsyrh xlmw erow hvepi.", decryptionMap))