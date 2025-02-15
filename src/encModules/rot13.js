import { mod } from "mathjs"
const encryptRot13 = (plainText) => {
        return plainText.split('').map((char) => {
            if(char.match(/[a-z]/i)){
                const base = char <= 'Z' ? 65 : 97;
                const pNum = char.charCodeAt(0);
                return String.fromCharCode(mod((pNum - base + 13), 26) + base);
            }
            return char;
        }).join('');
}
const decryptRot13 = (cipherText) => {
        return cipherText.split('').map((char) => {
            if(char.match(/[a-z]/i)){
                const base = char <= 'Z' ? 65 : 97;
                const pNum = char.charCodeAt(0);
                return String.fromCharCode(mod((pNum - base + 13), 26) + base);
            }
            return char;
        }).join('');

}
console.log("hello world")

export { encryptRot13, decryptRot13 }
