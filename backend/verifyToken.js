const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.cookies.token; // Read token from cookies

    if (!token) {
        return res.status(401).json({ message: "You are not authenticated!" });
    }

    jwt.verify(token, process.env.SECRET, (err, data) => {
        if (err) {
            return res.status(403).json({ message: "Token is not valid!" });
        }

        req.userId = data.userId;

        next();
    });
};

module.exports = verifyToken;
