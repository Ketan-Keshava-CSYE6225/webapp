import express from 'express';
import { inputValidation } from '../middleware/inputValidation.js';
import { checkExistingUsername } from '../middleware/checkExistingUsername.js';
import { createUser } from '../controllers/userController.js';
import { checkNoNoQueryParams} from '../middleware/checkNoQueryParams.js';

const userRouter = express.Router();

userRouter.post('/', checkNoNoQueryParams, inputValidation, checkExistingUsername, createUser);

export default userRouter;