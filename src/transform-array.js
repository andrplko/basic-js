const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
function transform(arr) {
  if(!Array.isArray(arr)) {
    throw new Error("\'arr\' parameter must be an instance of the Array!");
  }
  
  let copyArr = [...arr];
  const discardNext = '--discard-next';
  const discardPrev = '--discard-prev';
  const doubleNext = '--double-next';
  const doublePrev = '--double-prev';
  const getIdx = (transform) => {return copyArr.indexOf(transform)}
  let idx;
  
  if (copyArr.includes(discardNext)) {
    idx = getIdx(discardNext);
    if (idx === copyArr.length - 1) {
      copyArr.splice(idx, 1);
    }
    else {
      copyArr.splice(idx, 2);
      if (copyArr.includes(discardPrev)) {
        copyArr.splice(idx, 1);
      }
      else if (copyArr.includes(doublePrev)) {
        copyArr.splice(idx, 1);
      }
    }
  }
  if (copyArr.includes(doubleNext)) {
    idx = getIdx(doubleNext);
    if (idx === copyArr.length - 1) {
      copyArr.splice(idx, 1);
    }
    else {
      copyArr.fill(copyArr[idx + 1], idx, idx + 1);
    }
  }
  if (copyArr.includes(discardPrev)) {
    idx = getIdx(discardPrev);
    if (idx === 0) {
      copyArr.splice(idx, 1);
    }
    else {
      copyArr.splice(idx - 1, 2);
    }
  }
  if (copyArr.includes(doublePrev)) {
    idx = getIdx(doublePrev);
    if (idx === 0) {
      copyArr.splice(idx, 1);
    }
    else {
      copyArr.fill(copyArr[idx - 1], idx, idx + 1);
    }
  }  
  return copyArr;
}

module.exports = {
  transform
};
