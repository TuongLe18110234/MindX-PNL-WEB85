function myLogger(req, res, next) {
    console.log(`Received request for: ${req.url}`);
    next();
}

export default myLogger;