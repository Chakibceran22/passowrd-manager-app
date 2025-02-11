import { mod } from "mathjs"

const encryptAffine = (plainText, a, b) => {
    let cipherText = '';
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
    let plainText = '';
    for (let i = 0; i < cipherText.length ; i++)
    {
        if( cipherText[i].match(/[a-z]/i)) {
            const base = cipherText[i] <= 'Z' ? 65 : 97;
            const cNum = cipherText[i].charCodeAt(0) - base;
            console.log(cNum)
            const pNum = mod(a * (cNum - b), 26);
            plainText += String.fromCharCode(pNum + base);
        }
        else{
            plainText += cipherText[i];
        }
    }
    return plainText;
}

export { encryptAffine, decryptAffine }