const generatePlayfairTable = (key) => {
    key = key.toUpperCase().replace(/J/g, 'I');
    let seen = new Set();
    let alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
    let table = [];

    let uniqueKey = key + alphabet;
    for (let char of uniqueKey) {
        if (!seen.has(char)) {
            seen.add(char);
            table.push(char);
        }
    }

    return Array.from({ length: 5 }, (_, i) => table.slice(i * 5, i * 5 + 5));
};

const findPosition = (table, letter) => {
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            if (table[row][col] === letter) return { row, col };
        }
    }
    throw new Error(`Letter "${letter}" not found in Playfair table`);
};

const prepareText = (text) => {
    text = text.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
    let preparedText = '';

    for (let i = 0; i < text.length; i++) {
        if (i > 0 && text[i] === text[i - 1] && i % 2 !== 0) {
            preparedText += 'X';
        }
        preparedText += text[i];
    }

    return preparedText;
};

const encryptPlayfair = (text, key) => {
    let table = generatePlayfairTable(key);
    let preparedText = prepareText(text);

    // Get the last element of the table for padding
    let paddingChar = table[4][4];

    // Add padding only if the text length is odd
    if (preparedText.length % 2 !== 0) {
        preparedText += paddingChar;
    }

    let pairs = preparedText.match(/.{1,2}/g);
    let cipherText = '';

    for (let [a, b] of pairs) {
        let { row: r1, col: c1 } = findPosition(table, a);
        let { row: r2, col: c2 } = findPosition(table, b);

        if (r1 === r2) {
            cipherText += table[r1][(c1 + 1) % 5] + table[r2][(c2 + 1) % 5];
        } else if (c1 === c2) {
            cipherText += table[(r1 + 1) % 5][c1] + table[(r2 + 1) % 5][c2];
        } else {
            cipherText += table[r1][c2] + table[r2][c1];
        }
    }

    return cipherText;
};

const decryptPlayfair = (cipherText, key) => {
    let table = generatePlayfairTable(key);

    if (cipherText.length % 2 !== 0) {
        throw new Error("Ciphertext length must be even for Playfair decryption.");
    }

    let pairs = cipherText.match(/.{1,2}/g);
    let plainText = '';

    for (let [a, b] of pairs) {
        let posA = findPosition(table, a);
        let posB = findPosition(table, b);

        let { row: r1, col: c1 } = posA;
        let { row: r2, col: c2 } = posB;

        if (r1 === r2) {
            plainText += table[r1][(c1 + 4) % 5] + table[r2][(c2 + 4) % 5];
        } else if (c1 === c2) {
            plainText += table[(r1 + 4) % 5][c1] + table[(r2 + 4) % 5][c2];
        } else {
            plainText += table[r1][c2] + table[r2][c1];
        }
    }

    // Remove padding character if it matches the last element of the table
    let paddingChar = table[4][4];
    if (plainText.endsWith(paddingChar)) {
        plainText = plainText.slice(0, -1);
    }

    return plainText;
};

// Export functions
export { encryptPlayfair, decryptPlayfair };
