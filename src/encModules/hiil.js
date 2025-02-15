import { mod, matrix,gcd, multiply,inv, det, reshape,transpose, index } from "mathjs";
const invMatrix2Mod26 = (inputMatrix) => {
    const determinant = mod(det(inputMatrix),26);
    const detInv = invDet(determinant);
    if(gcd(determinant,26) !== 1){
        throw new Error('Invalid matrix, determinant is not coprime with 26');
    }
   
    const tempArray =  inputMatrix.toArray().flat()
    const a = tempArray[0];
    tempArray[0] = tempArray[3];
    tempArray[3] = a;
    tempArray[1] = -tempArray[1];
    tempArray[2] = -tempArray[2];
    const coMatrix =  mod(matrix(reshape(tempArray,[2,2])),26);
    return mod(multiply(coMatrix,detInv),26);
}
const invDet = (det) => {
    if( gcd(det,26) !== 1){
        throw new Error('Deterinant has no inverse');
    }
    for(let i = 1; i < 26; i++){
        if(mod(det * i,26) === 1){
            return i;
        }
    }
    return 0;
}
const encryptHill = (text, key, padding) =>{
    
    const keySize = key.size();
    if(keySize[0] !== 2 || keySize[1] !== 2){
        throw new Error('Invalid key size');
    }
    if(gcd(det(key), 26) !== 1){
        throw new Error('Invalid key');
    }
    const codeArray = text.split('').map(char => {
        if(char.match(/[a-z]/i)){
            const base = char <= 'Z' ? 65 : 97
            return char.charCodeAt(0) - base;
        }
        return char;
    });
    if(codeArray.length % 2 !== 0){
        const base = padding <= 'Z' ? 65 : 97;
        const paddingCode = padding.charCodeAt(0) - base;
        codeArray.push(paddingCode);        
    }

    const rows = codeArray.length / 2;
    const matrixCode = transpose(matrix(reshape(codeArray, [rows, 2])));
    const cypherMatrix = mod(multiply(key, matrixCode),26);
    const finalResult = transpose(cypherMatrix).map((value) => {
        return String.fromCharCode(value + 65);
    }).toArray().flat().join('')
    
    return finalResult;
}

const decryptHill = (text, key) => {
    const keySize = key.size();
    if(keySize[0] !== 2 || keySize[1] !== 2){
        throw new Error('Invalid key size');
    }
    if(gcd(det(key), 26) !== 1){
        throw new Error('Invalid key');
    }
    const codeArray = text.split('').map((char) => {
        if(char.match(/[a-z]/i)){
            const base = char <= 'Z' ? 65 : 97
            return char.charCodeAt(0) - base;
        }
        return char;
    });
    const rows = codeArray.length / 2;
    const matrixCode = transpose(matrix(reshape(codeArray, [rows, 2])));
    const keyInv = invMatrix2Mod26(key);
    const plainMatrix = mod(multiply(keyInv, matrixCode),26);
    const finalResult = transpose(plainMatrix).map((value) => {
        return String.fromCharCode(value + 65);
    }).toArray().flat().join('')
    return finalResult;

}
export { encryptHill, decryptHill }
