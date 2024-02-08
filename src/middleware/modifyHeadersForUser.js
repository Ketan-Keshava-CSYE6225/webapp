const modifyHeadersForUser = (req, res, next) => {
    res.removeHeader("Connection");
    res.removeHeader("Keep-Alive");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,Content-Type,Accept,Origin"
    );
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Expires", "-1");

    next();
}

export { modifyHeadersForUser };
