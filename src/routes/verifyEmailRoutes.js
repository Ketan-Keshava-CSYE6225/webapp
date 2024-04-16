import express from 'express';
import { verifyUserAccount } from '../controllers/userController.js';
import { modifyHeadersForUser } from '../middleware/modifyHeadersForUser.js';
import { methodNotAllowedHandler } from '../middleware/methodNotAllowedHandler.js';

const verifyEmailRouter = express.Router();

verifyEmailRouter.head('/verify/:id', modifyHeadersForUser, methodNotAllowedHandler)
verifyEmailRouter.options('/verify/:id', modifyHeadersForUser, methodNotAllowedHandler)
verifyEmailRouter.post('/verify/:id', modifyHeadersForUser, methodNotAllowedHandler)
verifyEmailRouter.put('/verify/:id', modifyHeadersForUser, methodNotAllowedHandler)
verifyEmailRouter.patch('/verify/:id', modifyHeadersForUser, methodNotAllowedHandler)
verifyEmailRouter.delete('/verify/:id', modifyHeadersForUser, methodNotAllowedHandler)

verifyEmailRouter.get('/verify/:id', modifyHeadersForUser, verifyUserAccount)

export default verifyEmailRouter;