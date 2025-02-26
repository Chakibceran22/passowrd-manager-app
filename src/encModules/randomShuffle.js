const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');

const shuffleAlphabet = () => {
    const alphabetArray = [...alphabet]; 
    for (let i = alphabetArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = alphabetArray[i];
        alphabetArray[i] = alphabetArray[j];
        alphabetArray[j] = temp;
    }
    return alphabetArray.join('');
}

const shuffledAlphabet = shuffleAlphabet().split('');
const alphabetMapEncryption = new Map(alphabet.map((letter, index) => [letter, shuffledAlphabet[index]]));
const alphabetMapDecryption = new Map(shuffledAlphabet.map((letter, index) => [letter, alphabet[index]]));


const encrypRandomShuffle = (input) => {
    return input.split('').map(char => alphabetMapEncryption.get(char) || char).join('');
}
const decryptionRandomShuffle = (input) => {
    return input.split('').map(char => alphabetMapDecryption.get(char) || char).join('');
}

export { encrypRandomShuffle, decryptionRandomShuffle, shuffledAlphabet };


