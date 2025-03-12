const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

// Function to shuffle the alphabet once
const shuffleAlphabet = () => {
    const alphabetArray = [...alphabet]; 
    for (let i = alphabetArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [alphabetArray[i], alphabetArray[j]] = [alphabetArray[j], alphabetArray[i]];
    }
    return alphabetArray;
};

// Generate and store a single shuffled alphabet for encryption
const shuffledAlphabet = shuffleAlphabet();

// Create the encryption map using the shuffled alphabet
const alphabetMapEncryption = new Map(alphabet.map((letter, index) => [letter, shuffledAlphabet[index]]));

// Encryption function using the stored shuffled alphabet
const encrypRandomShuffle = (input) => {
    return input.split('').map(char => {
        const upperChar = char.toUpperCase();
        return alphabetMapEncryption.has(upperChar) ? alphabetMapEncryption.get(upperChar) : char;
    }).join('');
};

// Decryption function that **accepts the shuffled alphabet as a key**
const decryptionRandomShuffle = (input, shuffledAlphabet) => {
    // Create a new decryption map based on the provided shuffled alphabet
    const alphabetMapDecryption = new Map(shuffledAlphabet.map((letter, index) => [letter, alphabet[index]]));

    return input.split('').map(char => {
        return alphabetMapDecryption.has(char) ? alphabetMapDecryption.get(char) : char;
    }).join('');
};

// ✅ Export everything for React use
export { encrypRandomShuffle, decryptionRandomShuffle, shuffledAlphabet };
