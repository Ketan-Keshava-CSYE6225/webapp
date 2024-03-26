import logger from '../utils/logger.js';
const checkNoPayload = (req, res, next) => {
    if(req.headers['content-type'] || Object.keys(req.body).length > 0) {
        logger.error('Request body must be empty');
        return res.status(400).send();
    }
    next();
}
export { checkNoPayload };