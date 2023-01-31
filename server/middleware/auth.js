const { PASSPORT_SECRET } = require("../config/config")
const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
    
    const token = req.header['x-access-token'];

    if(token) {
        jwt.verify(token, PASSPORT_SECRET, (err, decoded) => {
            if(err) return res.json({message: "Failed to authenticate", isLoggedIn: false})
            req.user = {};
            req.user.id = decoded.id;
            req.user.username = decoded.name;
            next()
        })
    } else {
        res.json({message: "invalid token", isLoggedIn: false});
    }
}

