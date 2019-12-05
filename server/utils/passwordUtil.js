import bcrypt from 'bcryptjs';

/**
 * @description - function that encrypts the passed in argument
 * @param {string} rawPassword - password to be encrypted
 * @returns {string} - encrypted password
 */
export function encodePassword(rawPassword) {
  return bcrypt.hashSync(rawPassword, 8);
}

/**
 * @description - checks if encryped password === to password entered
 * @param {string} passwordSupplied - encrypted password supplied by the client
 * @param {string} passwordInDb - encrypted password in database
 * @returns {boolean} - returns true if the password is right else false
 */
export function comparePassword(passwordSupplied, passwordInDb) {
  return bcrypt.compareSync(passwordInDb, passwordSupplied);
}
