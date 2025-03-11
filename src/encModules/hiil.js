import { mod, matrix, gcd, multiply, inv, det, reshape, transpose } from "mathjs";

const invMatrix2Mod26 = (inputMatrix) => {
    let determinant = det(inputMatrix);
    console.log("Original Determinant:", determinant);

    determinant = mod(determinant + 26, 26);
    console.log("Determinant mod 26:", determinant);

    if (gcd(determinant, 26) !== 1) {
        throw new Error("Invalid matrix, determinant is not coprime with 26");
    }

    const detInv = invDet(determinant);
    const tempArray = inputMatrix.toArray().flat();
    
    [tempArray[0], tempArray[3]] = [tempArray[3], tempArray[0]];
    tempArray[1] = -tempArray[1];
    tempArray[2] = -tempArray[2];

    const coMatrix = mod(matrix(reshape(tempArray, [2, 2])), 26);
    return mod(multiply(coMatrix, detInv), 26);
};

const invDet = (det) => {
    for (let i = 1; i < 26; i++) {
        if (mod(det * i, 26) === 1) return i;
    }
    throw new Error("Determinant has no modular inverse");
};

const encryptHill = (text, key, padding = "X") => {
    const keySize = key.size();
    if (keySize[0] !== 2 || keySize[1] !== 2) throw new Error("Invalid key size");
    if (gcd(det(key), 26) !== 1) throw new Error("Invalid key");

    let codeArray = text.split('').map(char => {
        if (char.match(/[a-z]/i)) {
            const base = char <= 'Z' ? 65 : 97;
            return char.charCodeAt(0) - base;
        }
        return char;
    });

    let paddingAdded = false;
    if (codeArray.length % 2 !== 0) {
        const base = padding <= 'Z' ? 65 : 97;
        const paddingCode = padding.charCodeAt(0) - base;
        codeArray.push(paddingCode);
        paddingAdded = true;
    }

    const rows = codeArray.length / 2;
    const matrixCode = transpose(matrix(reshape(codeArray, [rows, 2])));
    const cipherMatrix = mod(multiply(key, matrixCode), 26);

    let finalResult = transpose(cipherMatrix)
        .map(value => String.fromCharCode(value + 65))
        .toArray()
        .flat()
        .join('');

    return paddingAdded ? finalResult + "*" : finalResult;
};

const decryptHill = (text, key) => {
    const keySize = key.size();
    if (keySize[0] !== 2 || keySize[1] !== 2) throw new Error("Invalid key size");
    if (gcd(det(key), 26) !== 1) throw new Error("Invalid key");

    let paddingAdded = false;
    if (text.endsWith("*")) {
        paddingAdded = true;
        text = text.slice(0, -1);
    }

    let codeArray = text.split('').map(char => {
        if (char.match(/[a-z]/i)) {
            const base = char <= 'Z' ? 65 : 97;
            return char.charCodeAt(0) - base;
        }
        return char;
    });

    const rows = codeArray.length / 2;
    const matrixCode = transpose(matrix(reshape(codeArray, [rows, 2])));
    const keyInv = invMatrix2Mod26(key);
    const plainMatrix = mod(multiply(keyInv, matrixCode), 26);

    let finalResult = transpose(plainMatrix)
        .map(value => String.fromCharCode(value + 65))
        .toArray()
        .flat()
        .join('');
    return paddingAdded ? finalResult.slice(0, -1) : finalResult;
};


export { encryptHill, decryptHill };
