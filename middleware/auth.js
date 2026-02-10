const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

dotenv.config();

const auth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader) {
            return res.status(403).json({
                success: 'false',
                message: 'no token provided'
            })
        }

        const token = authHeader.split(' ')[1]

        const decoded = jwt.verify(token, process.env.MY_SECRET_KEY)

        req.user = decoded;

        next();
    } catch (error) {

        res.status(403).json({
            success: 'false',
            message: 'invalid token'
        })

    }
}


module.exports = auth
