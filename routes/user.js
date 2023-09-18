import express from 'express';
import { createUser, getUser } from '../controllers/user.js';

const userRouter = express.Router();

userRouter.get('/user/:id', getUser);
userRouter.post('/create-user/', createUser);

export default userRouter;