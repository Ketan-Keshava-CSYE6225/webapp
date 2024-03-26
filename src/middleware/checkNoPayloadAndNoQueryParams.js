import logger from '../utils/logger.js';
const checkNoPayloadAndNoQueryParams = (req, res, next) => {
    if(req.headers['content-type'] || Object.keys(req.body).length > 0) {
        logger.error('Request body must be empty');
        return res.status(400).send();
    }
    if(Object.keys(req.query).length > 0 || req.url.includes('?')) {
        logger.error('Request query parameters must be empty');
        return res.status(400).send();
    }
    next();
}
export { checkNoPayloadAndNoQueryParams };