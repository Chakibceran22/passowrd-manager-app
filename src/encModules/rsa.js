import { gcd } from "mathjs";

const p = 29;
const q = 19;

const calculateModulus = (p, q) => p * q;
const calculateTotient = (p, q) => (p - 1) * (q - 1);

const calculatePublicKey = (totient, modulus) => {
    let publicKey = 2;
    while (publicKey < totient) {
        if (gcd(publicKey, totient) === 1 && gcd(publicKey,modulus) === 1) {
            return publicKey;
        }
        publicKey++;
    }
    return publicKey;
};

const calculatePrivateKey = (publicKey, totient) => {
    let privateKey = 1;
    while (true) {
        if ((publicKey * privateKey) % totient === 1 && privateKey !== publicKey) {
            return privateKey;
        }
        privateKey++;
    }
};
//i worte this funtion because of js limitaions with numbers to compute the power of a number
function modExp(base, exp, mod) {
    let result = 1n;
    base = BigInt(base) % BigInt(mod);
    exp = BigInt(exp);
    mod = BigInt(mod);

    while (exp > 0) {
        if (exp % 2n === 1n) {
            result = (result * base) % mod;
        }
        base = (base * base) % mod;
        exp = exp / 2n;
    }
    return Number(result);
}

const encryptMessage = (message, publicKey, modulus) => {
    return message.split("").map(char => 
        modExp(char.charCodeAt(0), publicKey, modulus)
    );
};

const decryptMessage = (encMessage, privateKey, modulus) => {
    return encMessage.map(num => 
        String.fromCharCode(modExp(num, privateKey, modulus))
    ).join("");
};
const n = calculateModulus(p, q);
const totient = calculateTotient(p, q);

export { calculateModulus, calculateTotient, calculatePublicKey, calculatePrivateKey, encryptMessage, decryptMessage, p, q, n ,totient };