
let data = null

const calculateCharFrequency = (processedText ) => {
  const  letterCounts = {}
  let totalLetters = 0
  for (const char of processedText) {
    if (/[A-Z]/.test(char)) {
      letterCounts[char] = (letterCounts[char] || 0) + 1;
      totalLetters++;
    }
  }
  return [letterCounts, totalLetters];
}


const freqAnalysis = (processedText,languageFrequencies, referenceLanguage, languageOptions) => {
  const [letterCounts, totalLetters] = calculateCharFrequency(processedText);
  
  const frequencyData = Object.keys(letterCounts)
    .sort()
    .map((letter) => {
      const count = letterCounts[letter];
      const percentage = ((count / totalLetters) * 100).toFixed(2);
      const refPercentage = languageFrequencies[referenceLanguage][letter] || 0;
      const difference = (percentage - refPercentage).toFixed(2);

      return {
        letter,
        count,
        percentage,
        refPercentage: refPercentage.toFixed(2),
        difference,
      };
    });

  frequencyData.sort((a, b) => b.count - a.count);

  data = {
    type: "letterFrequency",
    title: "Letter Frequency Analysis",
    headers: [
      "Letter",
      "Count",
      "Frequency (%)",
      `${languageOptions.find((l) => l.value === referenceLanguage).label} (%)`,
      "Difference",
    ],
    rows: frequencyData,
    totalItems: totalLetters,
  };

  return [frequencyData, data];
};


export {freqAnalysis,calculateCharFrequency};