const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
function deleteDigit(n) {
  let arr = [];
  let splitArr = n.toString().split('');
  for (let i = 0; i < splitArr.length; i++) {
    if (i === 0) {
      const copyArr = splitArr.slice(i + 1);
      arr.push(copyArr);
    }
    else if (i > 0) {
      const copyArr = splitArr.slice(0, i).concat(splitArr.slice(i + 1));
      arr.push(copyArr);
    }
  }
  return Math.max(...arr.map(el => +el.join('')));
}

module.exports = {
  deleteDigit
};
