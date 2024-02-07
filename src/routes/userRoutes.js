import express from 'express';
import { createUserInputValidator } from '../validators/createUserInputValidator.js';
import { checkExistingUsername } from '../middleware/checkExistingUsername.js';
import { createUserAccount } from '../controllers/userController.js';
import { checkNoNoQueryParams} from '../middleware/checkNoQueryParams.js';

const userRouter = express.Router();

userRouter.post('/', checkNoNoQueryParams, createUserInputValidator, checkExistingUsername, createUserAccount);

export default userRouter;