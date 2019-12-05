import models from '../models';
import dotenv from 'dotenv';
import { createToken } from '../utils/tokenUtil';
import { handleSuccess, handleError } from '../utils/handleResponse'
import sendEmail from '../utils/sendEmail';

const { user, user_role } = models;
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
    let queryResult;
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      roleId
    } = req.body;
    user.create({firstName, lastName, email, phone, password})
      .then((result) => {
        if (result) {
          const {dataValues} = result;
          queryResult = dataValues;
        }
      })
      .then(() => {
        if (!roleId) {
          return handleError(res, {error: 'roleId is required'}, 500);
        }
        const userId = queryResult.id;
        user_role.create({ userId, roleId}).then(() => {
          const token = createToken({id: queryResult.id}, KEY, 900);
          const {BASE_URL} = process.env;
          sendEmail(`${BASE_URL}?q=${token}`, queryResult.email);
          return handleSuccess(res, {message: 'signup successful, check your mail to verify your account'}, 201);
        }).catch((error) => {
          const { message } = error;
          return handleError(res, {error: message}, 500);
        });
      })
      .catch((error) => {
        const { message } = error.errors[0]
        return handleError(res, {error: message}, 500);
      });
   }
}
export default new UserController();
