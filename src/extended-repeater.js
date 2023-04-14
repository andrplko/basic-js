const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create a repeating string based on the given parameters
 *  
 * @param {String} str string to repeat
 * @param {Object} options options object 
 * @return {String} repeating string
 * 
 *
 * @example
 * 
 * repeater('STRING', { repeatTimes: 3, separator: '**', 
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */
function repeater(str, options) {
  let string = String(str);
  let addition = String(options.addition);
  let separator = options.separator || '+';
  let additionSeparator = options.additionSeparator || '|';
  let additionRepeatTimes = (options.additionRepeatTimes) || 1;
  let repeatTimes = (options.repeatTimes) || 1;

  if (addition === 'undefined') {
    addition = '';
  }

  return `${(string + (addition + additionSeparator).repeat(additionRepeatTimes - 1) +
    addition + separator).repeat(repeatTimes - 1) +
    string + (addition + additionSeparator).repeat(additionRepeatTimes - 1) + addition}`;
}


module.exports = {
  repeater
};
