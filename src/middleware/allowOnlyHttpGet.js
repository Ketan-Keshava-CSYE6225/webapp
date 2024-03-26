import logger from '../utils/logger.js';
const allowOnlyHttpGet = (req, res, next) => {
    if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH' || req.method === 'DELETE') {
        logger.warn('Method Not Allowed: ' + req.method)
        return res.status(405).send();
    }
    next();
}

export { allowOnlyHttpGet };