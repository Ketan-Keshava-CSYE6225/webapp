import express from 'express';
import { healthController } from '../controllers/healthController.js';
import { modifyHeaders } from '../middleware/modifyHeaders.js';
import { checkNoPayloadAndNoQueryParams } from '../middleware/checkNoPayloadAndNoQueryParams.js';
import { methodNotAllowedHandler } from '../middleware/methodNotAllowedHandler.js';

const router = express.Router();

router.post('/', modifyHeaders, methodNotAllowedHandler);
router.put('/', modifyHeaders, methodNotAllowedHandler);
router.patch('/', modifyHeaders, methodNotAllowedHandler);
router.delete('/', modifyHeaders, methodNotAllowedHandler);
router.head('/', modifyHeaders, methodNotAllowedHandler);
router.options('/', modifyHeaders, methodNotAllowedHandler);

router.get('/', modifyHeaders, checkNoPayloadAndNoQueryParams, healthController);

export default router;