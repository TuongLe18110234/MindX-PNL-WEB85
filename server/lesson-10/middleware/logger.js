function myLogger(req, res, next) {
    console.log(`Received request for: ${req.url}`);
    console.log('myLogger');
    next();
}

export default myLogger;