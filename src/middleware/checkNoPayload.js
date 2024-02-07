const checkNoPayload = (req, res, next) => {
    if(req.headers['content-type'] || Object.keys(req.body).length > 0) {
        return res.status(400).send();
    }
    next();
}
export { checkNoPayload };