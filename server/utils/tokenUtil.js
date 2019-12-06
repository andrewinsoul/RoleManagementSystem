import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

const key = process.env.KEY;

/**
 * @description - It creates token of the payload passed in as argument
 * @param {object} payload - the payload to be encrypted as a token
 * @param {string} key - the secret key to be used in generating token
 * @param {number} tokenDuration - how long the token will last before it expires in seconds
 * @returns {string} - the value of the token 
 */
export function createToken (payload, key, tokenDuration=86400) {
  const token = jwt.sign(
    payload, key, {expiresIn: `${tokenDuration}s`}
  );
  return token;
}

/**
   * @description - function that verifies the authencity of a token
   * @param {string} - the value of token to be verified
   * @returns {object} - undefined if token is valid or decoded payload from the token
   */
  export function verifyToken(token, key) {
    const payload = jwt.verify(token, key);
    return payload
  }

  function verifyToken(req, res, next) {
    const token = req.headers['x-access-token'] || req.body.token || req.query.q;
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
        req.verified = decoded.is_verified;
        return next();
      }
    );
  }
