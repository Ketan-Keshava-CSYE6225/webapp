const methodNotAllowedHandler = (req, res) => {
    return res.status(405).send();
}

export { methodNotAllowedHandler }