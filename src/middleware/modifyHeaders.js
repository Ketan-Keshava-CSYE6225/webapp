const modifyHeaders = (req, res, next) => {
    res.set('Pragma', 'no-cache');
    res.set('X-Content-Type-Options', 'nosniff');
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate;');
    res.removeHeader('X-Powered-By');
    res.removeHeader('Connection');
    res.removeHeader('Keep-Alive');

    next();
}

export { modifyHeaders };