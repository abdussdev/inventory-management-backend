const jwt = require("jsonwebtoken");

const secretKey = "SecretKeyForJWT123";

const AuthVerifyMiddleware = (req, res, next) => {
    const token = req.header('token');

    if (!token) {
        return res.status(401).json({ message: "Authintication token is missing" });
    }

    //Verify the token
    jwt.verify(token, secretKey, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        } else {
            let email = decoded['data']
            req.headers.email = email
            next()
        }
    });
};

module.exports = AuthVerifyMiddleware;