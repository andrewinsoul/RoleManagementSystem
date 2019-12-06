import models from '../models';
import dotenv from 'dotenv';
import { createToken } from '../utils/tokenUtil';
import { handleSuccess, handleError } from '../utils/handleResponse';
import { comparePassword } from '../utils/passwordUtil';
import sendEmail from '../utils/sendEmail';

const { user, user_role, permission, roles, role_permission } = models;
dotenv.config();
const { KEY } = process.env;

/**
 * Class representing the User controller
 * @class UserController
 * @description User controller
 */
class UserController {
  /**
   * @description Signup User
	 * @param {object} req - Request object
	 * @param {object} res - Request object
	 * @returns {object} Response object
	 */
   signup(req, res) {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      roleId
    } = req.body;
    user.create({firstName, lastName, email, phone, password, roleId})
      .then((result) => {
        if (result) {
          const {dataValues} = result;
          const token = createToken({id: dataValues.id, is_verified: false}, KEY, 900);
          const {BASE_URL} = process.env;
          sendEmail(`${BASE_URL}/v1/confirm?q=${token}`, dataValues.email);
          return handleSuccess(res, {message: 'signup successful, check your mail to verify your account. Link expires in 15 mins'}, 201);
        }
      }).catch(error => {
        if (error.name) {
          if (error.original.code === '23503') {
            return handleError(res, {error: 'role not found'}, 404); // if roleId inserted is not in db
          }
          return handleError(res, {error: error.errors[0].message}, 400) // if model validation fails
        }
        if (error.original.code === '23505') {
          return handleError(res, {error: 'email or phone already exists'}, 409); // if there is a conflict during insert
        }
        return handleError(res, {error: 'server error, try again later'}, 500); // server error
    })
  }

   /**
   * @description Verifies User
	 * @param {object} req - Request object
	 * @param {object} res - Request object
	 * @returns {object} Response object
	 */
  verifyUser(req, res) {
    const id = req.userId;
    user.update(
      {is_verified: true},
      {returning: true, where: {id}}
    ).then((result) => {
      const { id } = result[1][0].dataValues;
      const token = createToken({id, is_verified: true}, KEY);
      return handleSuccess(
        res, 
        {
          message: 'your account was successfully verified',
          token
        }, 
        200
      );
    }).catch((error) => {
      return handleError(res, {error}, 500);
    })
  }

  /**
   * @description Logs in a User
	 * @param {object} req - Request object
	 * @param {object} res - Request object
	 * @returns {object} Response object
	 */
  loginUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return handleError(res, {status: 'error', error: 'provide email and password'}, 400);
    }
    const re = /\S+@\S+\.\S+/
    if (!re.test(email)) {
      return handleError(res, {status: 'error', error: 'invalid email'}, 400);
    }
    user.findOne({
      where: {
        email
      },
      attributes: ['email', 'id', 'password', 'is_verified']
    }).then(user => {
      if (user) {
        const passwordInDb = user.dataValues.password
        const isPasswordValid = comparePassword(password, passwordInDb)
        const {id, is_verified} = user.dataValues;
        if (isPasswordValid) {
          const token = createToken({ id, is_verified }, KEY);
          return handleSuccess(res, {status: 'success', token}, 200);
        }
        return handleError(res, {status: 'error', message: 'incorrect credentials'}, 401);
      }
      return handleError(res, {status: 'error', error: 'user not found'}, 404);
    })
  }

  /**
   * @description get a user's permission
	 * @param {object} req - Request object
	 * @param {object} res - Request object
	 * @returns {object} Response object
	 */
  getMyPermissions(req, res) {
    const id = req.userId;
    user.findAll({
      where: {id},
      attributes: ['firstName', 'lastName'],
      include: [{
        model: roles,
        attributes: ['name'],
        include: [{
          model: permission,
          attributes: ['name'],
          through: {
            model: role_permission,
            attributes: null
          }
        }]
      }]
    }).then((result) => handleSuccess(res, {data: result}, 200))
    .catch(err => handleError(res, {err}, 500));
  }

}
export default new UserController();
