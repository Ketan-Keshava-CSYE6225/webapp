import express from 'express';
import { createUserInputValidator } from '../validators/createUserInputValidator.js';
import { checkExistingUsername } from '../middleware/checkExistingUsername.js';
import { createUserAccount, getUserAccount, updateUserAccount, verifyUserAccount } from '../controllers/userController.js';
import { checkNoNoQueryParams} from '../middleware/checkNoQueryParams.js';
import { authenticateToken } from '../authentication/basicAuthentication.js';
import { updateUserValidator } from '../validators/updateUserInputValidator.js';
import { modifyHeadersForUser } from '../middleware/modifyHeadersForUser.js';
import { methodNotAllowedHandler } from '../middleware/methodNotAllowedHandler.js';

const userRouter = express.Router();

//public endpoints
userRouter.get('/', modifyHeadersForUser, methodNotAllowedHandler)
userRouter.put('/', modifyHeadersForUser, methodNotAllowedHandler)
userRouter.patch('/', modifyHeadersForUser, methodNotAllowedHandler)
userRouter.delete('/', modifyHeadersForUser, methodNotAllowedHandler)
userRouter.head('/', modifyHeadersForUser, methodNotAllowedHandler)
userRouter.options('/', modifyHeadersForUser, methodNotAllowedHandler)

userRouter.post('/', modifyHeadersForUser, checkNoNoQueryParams, createUserInputValidator, checkExistingUsername, createUserAccount);

//authenticated enpoints
userRouter.post('/self', modifyHeadersForUser, methodNotAllowedHandler)
userRouter.patch('/self', modifyHeadersForUser, methodNotAllowedHandler)
userRouter.delete('/self', modifyHeadersForUser, methodNotAllowedHandler)
userRouter.head('/self', modifyHeadersForUser, methodNotAllowedHandler)
userRouter.options('/self', modifyHeadersForUser, methodNotAllowedHandler)

userRouter.get('/self', modifyHeadersForUser, authenticateToken, checkNoNoQueryParams, getUserAccount);
userRouter.put('/self', modifyHeadersForUser, authenticateToken, checkNoNoQueryParams, updateUserValidator, updateUserAccount);

userRouter.head('/verify/:id', modifyHeadersForUser, methodNotAllowedHandler)
userRouter.options('/verify/:id', modifyHeadersForUser, methodNotAllowedHandler)
userRouter.post('/verify/:id', modifyHeadersForUser, methodNotAllowedHandler)
userRouter.put('/verify/:id', modifyHeadersForUser, methodNotAllowedHandler)
userRouter.patch('/verify/:id', modifyHeadersForUser, methodNotAllowedHandler)
userRouter.delete('/verify/:id', modifyHeadersForUser, methodNotAllowedHandler)

userRouter.get('/verify/:id', modifyHeadersForUser, verifyUserAccount)

export default userRouter;