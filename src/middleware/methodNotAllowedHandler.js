import logger from '../utils/logger.js';
const methodNotAllowedHandler = (req, res) => {
    logger.warn('Method Not Allowed: ' + req.method)
    return res.status(405).send();
}

export { methodNotAllowedHandler }