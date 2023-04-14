const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create name of dream team based on the names of its members
 *  
 * @param {Array} members names of the members 
 * @return {String | Boolean} name of the team or false
 * in case of incorrect members
 *
 * @example
 * 
 * createDreamTeam(['Matt', 'Ann', 'Dmitry', 'Max']) => 'ADMM'
 * createDreamTeam(['Olivia', 1111, 'Lily', 'Oscar', true, null]) => 'LOO'
 *
 */

function createDreamTeam(members) {
  if (Array.isArray(members)) {
    return members
      .filter(el => /^[a-zA-Z\s_]*$/.test(el) && el !== true && el !== false && el !== null && typeof el !== 'number' && el !== undefined && !Array.isArray(el))
      .map(el => el.trim().toUpperCase())
      .sort()
      .map(el => el.split('')[0])
      .join('');
  }
  else { return false; }
}

module.exports = {
  createDreamTeam
};
