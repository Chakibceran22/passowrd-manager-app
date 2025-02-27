import { calculateCharFrequency } from "./analyseFreq";
let data  = null;

const indexOfCoincidenceCalculator = (processedText, referenceLanguage,languageOptions) => {

     const [icLetterCounts, icTotalLetters] = calculateCharFrequency(processedText);

     let sumFrequencies = 0;
     for (const letter in icLetterCounts) {
       const frequency = icLetterCounts[letter];
       sumFrequencies += frequency * (frequency - 1);
     }

     const ic = icTotalLetters > 1
       ? sumFrequencies / (icTotalLetters * (icTotalLetters - 1))
       : 0;

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
     return [ic, data, expectedIC];
}
export {indexOfCoincidenceCalculator};