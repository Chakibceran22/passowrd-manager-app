import { gcd, mod } from "mathjs"

// Function to calculate modular inverse of 'a' under mod 'm'
const modInverse = (a, m) => {
    if (gcd(a, m) !== 1) return null; // Inverse exists only if gcd(a, m) == 1

    for (let x = 1; x < m; x++) {
        if ((a * x) % m === 1) return x;
    }
    return null; // No modular inverse found
};

const encryptAffine = (plainText, a, b) => {
    let cipherText = '';
    if(gcd(a, 26) !== 1){
        return 'Invalid key for Affine Cipher gcd(a, 26) !== 1';
    }
    for (let i = 0; i < plainText.length ; i++)
    {
        if( plainText[i].match(/[a-z]/i)) {
            const base = plainText[i] <= 'Z' ? 65 : 97;
            const pNum = plainText[i].charCodeAt(0) - base;
            const cNum = mod(a * pNum + b, 26);
            cipherText += String.fromCharCode(cNum + base);
        }
        else{
            cipherText += plainText[i];
        }
    }
    return cipherText;
}
const decryptAffine = (cipherText, a, b) => {
    if(gcd(a, 26) !== 1){
        return 'Invalid key for Affine Cipher gcd(a, 26) !== 1';
    }
    const a_inv = modInverse(a, 26); // Compute modular inverse of a
    if (a_inv === null) {
        return 'Invalid key for Affine Cipher: No modular inverse found';
    }
    let plainText = '';
    for (let i = 0; i < cipherText.length ; i++)
    {
        if( cipherText[i].match(/[a-z]/i)) {
            const base = cipherText[i] <= 'Z' ? 65 : 97;
            const cNum = cipherText[i].charCodeAt(0) - base;
            const pNum = mod(a_inv * (cNum - b), 26);
            plainText += String.fromCharCode(pNum + base);
        }
        else{
            plainText += cipherText[i];
        }
    }
    return plainText;
}

export { encryptAffine, decryptAffine }