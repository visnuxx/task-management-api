
const isAdmin = (req, res, next) => {
    try {

        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'admin access required'
            })
        }

    }
    catch (error) {
        res.status(403).json({
            success: false,
            message: 'header not found'
        })
    }
    next();
}
module.exports = isAdmin