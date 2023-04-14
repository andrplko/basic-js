const { NotImplementedError } = require('../extensions/index.js');

/**
 * Extract season from given date and expose the enemy scout!
 * 
 * @param {Date | FakeDate} date real or fake date
 * @returns {String} time of the year
 * 
 * @example
 * 
 * getSeason(new Date(2020, 02, 31)) => 'spring'
 * 
 */

 function getSeason(date) {
  if (date === undefined) {
    return 'Unable to determine the time of year!';
  }

  if (!(date instanceof Date && !isNaN(Date.parse(date)))) {
    throw new Error("Invalid date!");
  }

  if (Object.getOwnPropertyNames(date).length !== 0) {
    throw Error("Invalid date!");
  }

  let month = date.getMonth();
  const season = [[11, 0, 1], [2, 3, 4], [5, 6, 7], [8, 9, 10]];
  for (let i = 0; i < season.length; i++) {
    const getSeason = (item) => (item === 0) ? 'winter' : (item === 1) ? 'spring' : (item === 2) ? 'summer' : 'autumn';
    if (season[i].includes(month)) {
      return getSeason(i);
    }
  }
}



module.exports = {
  getSeason
};
