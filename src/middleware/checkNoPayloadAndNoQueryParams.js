const checkNoPayloadAndNoQueryParams = (req, res, next) => {
    if(req.headers['content-type'] || Object.keys(req.body).length > 0) {
        return res.status(400).send();
    }
    if(Object.keys(req.query).length > 0 || req.url.includes('?')) {
        return res.status(400).send();
    }
    next();
}
export { checkNoPayloadAndNoQueryParams };