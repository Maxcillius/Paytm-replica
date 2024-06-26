const jwt = require("jsonwebtoken");
const { JWT_TOKEN } = require("./config");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({});
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, "secretToken");
        req.userId = decoded.userId;

        next();
    } catch (err) {
        return res.status(403).json({
            err: "Token Validation Failed",
        });
    }
};

module.exports = {
    authMiddleware,
};
