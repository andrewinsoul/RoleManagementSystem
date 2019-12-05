import jwt from 'jsonwebtoken';

/**
 * @description - It creates token of the payload passed in as argument
 * @param {object} payload - the payload to be encrypted as a token
 * @param {string} key - the secret key to be used in generating token
 * @param {number} tokenDuration - how long the token will last before it expires in seconds
 * @returns {string} - the value of the token 
 */
export function createToken (payload, key, tokenDuration=86400) {
  const token = jwt.sign(
    payload, key, {expiresIn: tokenDuration}
  );
  return token;
}

/**
   * @description - function that verifies the authencity of a token
   * @param {object} req - the request object
   * @param {object} res - the response object
   * @param {function} next - the callback function
   * @param {string} key - key used in decoding token
   * @returns {object} - status code and error
   */
  export function verifyToken(req, res, next, key) {
    const token = req.headers['x-access-token'] || req.body.token;
    if (!token) {
      return res.status(403).send({
        status: 'error',
        error: 'No token provided'
      });
    }
    jwt.verify(
      token,
      key,
      (error, decoded) => {
        if (error) {
          return res.status(401).send({
            status: 'error',
            error: 'Failed to authenticate token'
          });
        }
        req.userId = decoded.id;
        req.userRoleId = decoded.role_id;
        return next();
      }
    );
  }
