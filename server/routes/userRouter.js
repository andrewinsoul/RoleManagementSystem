import UserController from '../controllers/userController';
import { verifyToken } from '../utils/tokenUtil'
import express from 'express';
import userController from '../controllers/userController';

export const userRouter = express.Router();

userRouter
  .post('/user/signup', UserController.signup)
  .get('/confirm', verifyToken, UserController.verifyUser)
  .post('/user/auth', userController.loginUser)
  .get('/user/permissions', verifyToken, UserController.getMyPermissions);

export default userRouter;
