import UserController from '../controllers/userController';
import express from 'express';

export const userRouter = express.Router();

userRouter
  .post('/signup', UserController.signup);

export default userRouter;
