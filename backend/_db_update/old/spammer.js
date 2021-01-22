const Converter = require('@iota/converter');
const Iota = require('@iota/core');

const iota = Iota.composeAPI({
    provider: 'https://nodes.thetangle.org:443'
    });

const depth = 3;
const minimumWeightMagnitude = 14;

// SEED CREATED BY PSEUDO-RAND IN PYTHON - NOT SECURE
const seed = 'WVVBOHNRYPONH9GW9BXVAKGGYBULIUPCDVTFSUAFFJP99NTJTGGQRWQCXSWELVDQIRFINIQDMULGEXSWN';

// ADD GENERATOR
// for (i=0;i<10;i++) {
//     const address = Iota.generateAddress(seed, i)
//     console.log(address)
// }

// ADDRESSES LIST
// [0] = WRIIHMSNYWKGRNRWLLPTANKPYIYXIOWKFYSWOPCZMQIEAFQVWJKVMOSOBEMVOOBGUJISAZFQAPFQXIO9D = 'MAQUINA 1'
// [1] = OCXYFTDWYSWGTNUNAYVAFPYNIXKLGGJCCJRKN9NTFKCMKBTPVUCKWTXUVEBFDLIBYZUIPCESNIVBCVIGB = 'MAQUINA 2'
// [2] = QFITDFGMRYKOXUKJCPTUDSDTENNVDNSOVKYSGOJREOREQFIIZZBVGCANIQIKBHSPOOXSWDMJYCPVUOYXW = 'MAQUINA 3'
// [3] = KYMLQZL9OSZFQOWXYGRUSQUWFZJHUFZDLVEMMQOEOHLKWVRD9IKEWOSODLQHOFFIBVSYM9KGQGMJXJIWY = 'MAQUINA 4'
// [4] = KYMLQZL9OSZFQOWXYGRUSQUWFZJHUFZDLVEMMQOEOHLKWVRD9IKEWOSODLQHOFFIBVSYM9KGQGMJXJIWY = 'MAQUINA 5'
// [5] = TXAMWUYOHHRQYYOTUCZV9DRZZCKPGJAVSNI9UAWXVGLSUHSYEKFETOWCIKUBHBMFPURPDHAESAGYWPISB = 'MAQUINA 6'
// [6] = XNJDNQLQGMOTCWBQYP9FV9YXNUFMTRCWPQWQQSB9KLLTTHSOLFPCRFLVVLYEDDABO9SAVFLDGAYTGVETY = 'MAQUINA 7'
// [7] = KXLZGSOJ9BNACFHEGWBNGMHHLYKQPMUPKY9AZIDSQSCEUTOYKJPTEAMXRXOVSBWXKGEWFIDHYNSOYYTJD = 'MAQUINA 8'
// [8] = YTP9SYJYVGQCTCRZDUMOA9VNGVYSIYYQDJSXMBILIRXJMMOVUFYGIROVDPNTKLPGSDQATGTNL9ZTMXUAY = 'MAQUINA 9'
// [9] = VORGJFZ9SRAI9DENSHTAZRAXECYOEXHKLGESHUNICKJTAEBJAYVBESTLLGVKYHMD9DQDCWPIQCVVLMAGB = 'MAQUINA 10'
const address = ['WRIIHMSNYWKGRNRWLLPTANKPYIYXIOWKFYSWOPCZMQIEAFQVWJKVMOSOBEMVOOBGUJISAZFQAPFQXIO9D','OCXYFTDWYSWGTNUNAYVAFPYNIXKLGGJCCJRKN9NTFKCMKBTPVUCKWTXUVEBFDLIBYZUIPCESNIVBCVIGB','QFITDFGMRYKOXUKJCPTUDSDTENNVDNSOVKYSGOJREOREQFIIZZBVGCANIQIKBHSPOOXSWDMJYCPVUOYXW','KYMLQZL9OSZFQOWXYGRUSQUWFZJHUFZDLVEMMQOEOHLKWVRD9IKEWOSODLQHOFFIBVSYM9KGQGMJXJIWY','KYMLQZL9OSZFQOWXYGRUSQUWFZJHUFZDLVEMMQOEOHLKWVRD9IKEWOSODLQHOFFIBVSYM9KGQGMJXJIWY','TXAMWUYOHHRQYYOTUCZV9DRZZCKPGJAVSNI9UAWXVGLSUHSYEKFETOWCIKUBHBMFPURPDHAESAGYWPISB','XNJDNQLQGMOTCWBQYP9FV9YXNUFMTRCWPQWQQSB9KLLTTHSOLFPCRFLVVLYEDDABO9SAVFLDGAYTGVETY','KXLZGSOJ9BNACFHEGWBNGMHHLYKQPMUPKY9AZIDSQSCEUTOYKJPTEAMXRXOVSBWXKGEWFIDHYNSOYYTJD','YTP9SYJYVGQCTCRZDUMOA9VNGVYSIYYQDJSXMBILIRXJMMOVUFYGIROVDPNTKLPGSDQATGTNL9ZTMXUAY','VORGJFZ9SRAI9DENSHTAZRAXECYOEXHKLGESHUNICKJTAEBJAYVBESTLLGVKYHMD9DQDCWPIQCVVLMAGB']

// TAG LIST - CREATED BY PSEUDO-RAND WITH PYTHON
// [0] = 'BXOUBCAEOYFDQARTUELBFEEGPAO' = 'WIP'
// [1] = 'COBWNGDNZTEAEPVHGBBBFAGUWOI' = 'IDLE'
// [2] = 'QKLOVCRJHKHITJRIMVARCMPXBBT' = 'ERROR'
const tag = ['BXOUBCAEOYFDQARTUELBFEEGPAO','COBWNGDNZTEAEPVHGBBBFAGUWOI','QKLOVCRJHKHITJRIMVARCMPXBBT']

for (j=0;j<50;j++){
    let message = JSON.stringify(`13186 / N / ${j}`);
    let messageInTrytes = Converter.asciiToTrytes(message);

    let transfers = [
        {
            value: 0,
            address: address[Math.floor(Math.random()*10)],
            message: messageInTrytes,
            tag: tag[Math.floor(Math.random()*3)]
        }
        ];

    iota.prepareTransfers(seed, transfers)
    .then(trytes => {
        iota.sendTrytes(trytes, depth, minimumWeightMagnitude);
        console.log(`Successfully sent ${j}`)
    })
    .catch(err => {
        console.error(err)
    });
    
};