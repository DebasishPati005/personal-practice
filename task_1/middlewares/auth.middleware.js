const jwt = require("jsonwebtoken")

exports.extractUserId = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decodedToken = jwt.verify(token, JSON.stringify(process.env.JWT_SECRET));
        req.userId = decodedToken.id;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};