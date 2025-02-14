import {e, mod} from 'mathjs';

const encryptCeasar = (text, shift) => {
    return text.split("").map((char) => {
        if( char.match(/[a-z]/i)){
            const base = char <= 'Z' ? 65 : 97;
            return String.fromCharCode(mod(char.charCodeAt(0) - base + shift, 26) + base);

        }
        return char;
    })
    .join("");
}
const decryptCeasar = (text, shift) => {
    return text.split("").map((char) => {  // Add 'return' before text.split()
        if (char.match(/[a-z]/i)) {
            const base = char <= 'Z' ? 65 : 97;
            return String.fromCharCode(((char.charCodeAt(0) - base - shift) % 26 + 26) % 26 + base);
        }
        return char;
    }).join(""); // Ensure the joined string is returned
};
export {encryptCeasar, decryptCeasar};