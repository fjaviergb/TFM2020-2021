// // Frontend JS-TryteToAscii function 127.0.0.1:5500

const trytesToAscii = (trytes) => {
    const TRYTE_ALPHABET = '9ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let ascii = '';
    for (let i = 0; i < trytes.length - 1; i += 2) {
        ascii += String.fromCharCode(TRYTE_ALPHABET.indexOf(trytes[i]) + TRYTE_ALPHABET.indexOf(trytes[i + 1]) * 27);
    }
    return ascii;
};

module.exports(trytesToAscii)