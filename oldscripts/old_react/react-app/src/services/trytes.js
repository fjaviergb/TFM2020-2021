const TRYTE_ALPHABET = '9ABCDEFGHIJKLMNOPQRSTUVWXYZ';

module.exports={
    ASCIITOTRYTES(input) {
        let trytes = '';
        for (let i = 0; i < input.length; i++) {
            var dec = input[i].charCodeAt(0);
            trytes += TRYTE_ALPHABET[dec % 27];
            trytes += TRYTE_ALPHABET[(dec - dec % 27) / 27];
        }
        return trytes;
    },

    TRYTESTOASCII(trytes) {
        let ascii = '';
        for (let i = 0; i < trytes.length - 1; i += 2) {
            let charCode = TRYTE_ALPHABET.indexOf(trytes[i]) + TRYTE_ALPHABET.indexOf(trytes[i + 1]) * 27
            if (charCode !== 0){
                ascii += String.fromCharCode(TRYTE_ALPHABET.indexOf(trytes[i]) + TRYTE_ALPHABET.indexOf(trytes[i + 1]) * 27);
            }
        }
        return ascii;
    },
}
