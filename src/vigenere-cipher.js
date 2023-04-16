const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
 function getIdxs(array, element) {
  let arr = [];
  let idx = array.indexOf(element);
  while (idx !== -1) {
    arr.push(idx);
    idx = array.indexOf(element, idx + 1);
  }
  return arr;
}
class VigenereCipheringMachine {
  constructor(reverseFlag = true) {
    this.reverseFlag = reverseFlag;
  }

  encrypt(message, key) {
    if (message === undefined || key === undefined) {
      throw new Error('Incorrect arguments!');
    }

    const idxWhiteSpace = getIdxs(message.split(''), " ");
    const idxColon = getIdxs(message.split(''), ":");
    const sliceArr = message.split('').slice(idxColon, message.length);
    const alpha = Array.from(Array(26)).map((e, i) => i + 65);
    const alphabet = alpha.map((x) => String.fromCharCode(x));
    const messageArr = Array.from(message.replaceAll(/\s/g, '').replaceAll(/!$/g, '').toUpperCase());
    const keyWithMessageLength = key.repeat(Math.ceil(messageArr.length / key.length)).slice(0, messageArr.length).toUpperCase().split('');

    let arr = [];
    for (let i = 0; i < messageArr.length; i++) {
      let idxMessageArr = alphabet.indexOf(messageArr[i]);
      let idxKeyArr = alphabet.indexOf(keyWithMessageLength[i]);
      let encryptedText;
      if (idxMessageArr === 0) {
        encryptedText = alphabet[idxKeyArr];
      }
      if (idxMessageArr > 0 && idxMessageArr <= 13) {
        encryptedText = alphabet[idxKeyArr + idxMessageArr];
      }
      // if(idxMessageArr <= 13 && idxKeyArr <= 13) {
      //   encryptedText = alphabet[idxKeyArr + idxMessageArr];
      // }
      if (idxKeyArr > 13) {
        encryptedText = alphabet[idxKeyArr - (alphabet.length - idxMessageArr)];
      }
      if (idxMessageArr + idxKeyArr < alphabet.length) {
        encryptedText = alphabet[idxMessageArr + idxKeyArr];
      }
      else {
        encryptedText = alphabet[idxKeyArr - (alphabet.length - idxMessageArr)];
      }

      arr.push(encryptedText);
    }
    if (message.includes("!")) {
      arr.push("!");
    }
    for (let i = 0; i < idxWhiteSpace.length; i++) {
      arr.splice(idxWhiteSpace[i], 0, " ")
    }
    if (message.includes(":")) {
      return arr.slice(0, idxColon).concat(sliceArr).join('');
    }

    return this.reverseFlag ? arr.join('') : arr.reverse().join('');

  }
  decrypt(encryptedMessage, key) {
    if (encryptedMessage === undefined || key === undefined) {
      throw new Error('Incorrect arguments!');
    }
    const idxWhiteSpace = getIdxs(encryptedMessage.split(''), " ");
    const idxColon = getIdxs(encryptedMessage.split(''), ":");
    const idxEar = getIdxs(encryptedMessage.split(''), "^")[0];
    const sliceArrColon = encryptedMessage.split('').slice(idxColon, encryptedMessage.length);
    const sliceArrEar = encryptedMessage.split('').slice(idxEar, encryptedMessage.length);
    const alpha = Array.from(Array(26)).map((e, i) => i + 65);
    const alphabet = alpha.map((x) => String.fromCharCode(x));
    const messageArr = Array.from(encryptedMessage.replaceAll(/\s/g, '').replaceAll(/!$/g, '').toUpperCase());
    const keyWithMessageLength = key.repeat(Math.ceil(messageArr.length / key.length)).slice(0, messageArr.length).toUpperCase().split('');

    let arr = [];
    for (let i = 0; i < messageArr.length; i++) {
      let idxMessageArr = alphabet.indexOf(messageArr[i]);
      let idxKeyArr = alphabet.indexOf(keyWithMessageLength[i]);
      let encryptedText;
      if (idxKeyArr === 0) {
        encryptedText = alphabet[idxMessageArr];
      }
      else if (idxMessageArr === idxKeyArr) {
        encryptedText = alphabet[0];
      }
      else if (idxMessageArr > 13) {
        encryptedText = alphabet[idxMessageArr - idxKeyArr];
      }
      else if (idxMessageArr <= 13 && idxMessageArr > idxKeyArr) {
        encryptedText = alphabet[idxMessageArr - idxKeyArr];
      }
      else if (idxMessageArr < idxKeyArr) {
        encryptedText = alphabet[(alphabet.length - idxKeyArr) + idxMessageArr]
      }
      arr.push(encryptedText);
    }
    let resultArr = arr;;

    if (encryptedMessage.includes("!")) {
      resultArr.push("!");
    }
    for (let i = 0; i < idxWhiteSpace.length; i++) {
      resultArr.splice(idxWhiteSpace[i], 0, " ")
    }

    if (encryptedMessage.includes(":")) {
      resultArr = arr.slice(0, idxColon).concat(sliceArrColon);
    }

    else if (encryptedMessage.includes("^")) {
      resultArr = arr.slice(0, idxEar).concat(sliceArrEar);
    }

    return this.reverseFlag ? resultArr.join('') : resultArr.reverse().join('');
  }
}

module.exports = {
  VigenereCipheringMachine
};
