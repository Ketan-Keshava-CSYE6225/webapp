import express from 'express';
import { inputValidation } from '../middleware/inputValidation.js';
import { checkExistingUsername } from '../middleware/checkExistingUsername.js';
import { createUserAccount } from '../controllers/userController.js';
import { checkNoNoQueryParams} from '../middleware/checkNoQueryParams.js';

const userRouter = express.Router();

userRouter.post('/', checkNoNoQueryParams, inputValidation, checkExistingUsername, createUserAccount);

export default userRouter;