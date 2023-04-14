const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given matrix, a rectangular matrix of integers,
 * just add up all the values that don't appear below a "0".
 *
 * @param {Array<Array>} matrix
 * @return {Number}
 *
 * @example
 * matrix = [
 *  [0, 1, 1, 2],
 *  [0, 5, 0, 0],
 *  [2, 0, 3, 3]
 * ]
 *
 * The result should be 9
 */
function getMatrixElementsSum(matrix) {
  function getIdxs(array, element) {
    let arr = [];
    let idx = array.indexOf(element);
    while (idx !== -1) {
      arr.push(idx);
      idx = array.indexOf(element, idx + 1);
    }
    return arr;
  }

  let item = 1;

  if (matrix.flat().every(el => el !== 0)) {
    item = 0;
  }

  let arr = [];
  for (let i = matrix.length - item; i > 0; i--) {
    let arr2 = [...new Set(matrix[i - 1].filter(el => el !== 0))];
    arr.unshift(arr2.map(el => getIdxs(matrix[i - 1], el)));
  }
  let flatArr = arr.map(el => el.flat());

  let arr3 = [];
  for (let i = 0; i < matrix.length - item; i++) {
    arr3.push(flatArr[i].map(el => matrix[i][el]))
  }
  return arr3.flat().reduce((a, b) => a + b, 0);
}

module.exports = {
  getMatrixElementsSum
};
