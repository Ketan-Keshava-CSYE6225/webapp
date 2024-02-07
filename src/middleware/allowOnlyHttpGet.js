const allowOnlyHttpGet = (req, res, next) => {
    if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH' || req.method === 'DELETE') {
        return res.status(405).send();
    }
    next();
}

export { allowOnlyHttpGet };