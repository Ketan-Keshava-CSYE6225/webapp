import express from 'express';
import { createUserInputValidator } from '../validators/createUserInputValidator.js';
import { checkExistingUsername } from '../middleware/checkExistingUsername.js';
import { createUserAccount, getUserAccount, updateUserAccount } from '../controllers/userController.js';
import { checkNoNoQueryParams} from '../middleware/checkNoQueryParams.js';
import { authenticateToken } from '../authentication/basicAuthentication.js';

const userRouter = express.Router();

//public endpoints
userRouter.post('/', checkNoNoQueryParams, createUserInputValidator, checkExistingUsername, createUserAccount);

//authenticated enpoints
userRouter.get('/self', authenticateToken, getUserAccount);
userRouter.get('/self', authenticateToken, updateUserAccount);

export default userRouter;