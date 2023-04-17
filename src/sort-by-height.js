const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given an array with heights, sort them except if the value is -1.
 *
 * @param {Array} arr
 * @return {Array}
 *
 * @example
 * arr = [-1, 150, 190, 170, -1, -1, 160, 180]
 *
 * The result should be [-1, 150, 160, 170, -1, -1, 180, 190]
 */
function sortByHeight(arr) {
  let filteredArr = arr.filter(el => el !== -1);
  let sortedArr = filteredArr.sort((a, b) => a - b);
  let array = [];
  let j = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === -1) {
      array.push(-1);
    } else {
      array.push(sortedArr[j]);
      j++;
    }
  }
  return array;
}

module.exports = {
  sortByHeight
};
