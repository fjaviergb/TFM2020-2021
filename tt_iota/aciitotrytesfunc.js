const TRYTE_ALPHABET = '9ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const asciiToTrytes = (input) => {
    let trytes = '';
    for (let i = 0; i < input.length; i++) {
        var dec = input[i].charCodeAt(0);
        trytes += TRYTE_ALPHABET[dec % 27];
        trytes += TRYTE_ALPHABET[(dec - dec % 27) / 27];
    }
    return trytes;
};

const trytesToAscii = (trytes) => {
    let ascii = '';
    for (let i = 0; i < trytes.length - 1; i += 2) {
        ascii += String.fromCharCode(TRYTE_ALPHABET.indexOf(trytes[i]) + TRYTE_ALPHABET.indexOf(trytes[i + 1]) * 27);
    }
    return ascii;
};