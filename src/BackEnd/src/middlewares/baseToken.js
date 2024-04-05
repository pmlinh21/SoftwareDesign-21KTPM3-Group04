const jwt = require('jsonwebtoken');

// Create a new JWT based on the provided payload data
const parseToken = (data) => {
    let token = jwt.sign({ data }, "xplore", { algorithm: 'HS256', expiresIn: "10y" });
    return token;
}

// Verify the validity of a given JWT
const checkToken = (token) => {
    try {
        let checkT = jwt.verify(token, "xplore");
        if (checkT) {
            return { checkData: true, messagse: "" };
        } else {
            return { checkData: false, messagse: "Invalid token" };
        }
    } catch (error) {
        return { checkData: false, message: error.message };
    }
}

// Protect routes that require authentication. Verifies token and allows or denies access based on the result of verification 
const verifyToken = (req, res, next) => {
    const token = req.cookies?.token;
    const verifyToken = checkToken(token);
    console.log('verifyToken', verifyToken)
    if (verifyToken.checkData) {
        next();
    } 
    else {
        res.clearCookie('token');
        res.redirect("/login")
    }

}

const decodeToken = (token) => {
    if (!token) {
        return res.redirect("/")
    }

    try {
        const decode = jwt.verify(token, "xplore");
        return decode;
    } catch (error) {
        // Handle token verification error
        throw new Error('Invalid token');
    }
}

module.exports = { parseToken, checkToken, verifyToken, decodeToken }