const encryptVigener = (plainText, key) => {
        return plainText.split('').map((char, index) => {
            if (char.match(/[a-z]/i)) {
              const base = char <= 'Z' ? 65 : 97;
              const pNum = char.charCodeAt(0)
              const kNum = key.charCodeAt(index % key.length);
              return String.fromCharCode(((pNum - base) + (kNum - base)) % 26 + base);
            }
            return char;
          }).join('');
}
export { encryptVigener }