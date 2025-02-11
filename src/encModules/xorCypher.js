const encryptXor = (plainText, key) => {
    return plainText.split('').map((char, index) => {
        return String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(index % key.length));
      }).join('')
}
const decryptXor = (encResult, key) => {
    return encResult.split('').map((char, index) => {
        return String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(index % key.length));
      }).join('');
}
export {encryptXor, decryptXor}