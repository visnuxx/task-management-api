const isEmail = require('./validator')
const registerValidate = (req, res, next) => {
    try {
        var { name, email, password } = req.body
   
        if (!name || !email || !password) {
            return res.status(406).send('user details required')
        }

        if (name === " " || name.trim().length < 3) {
            return res.status(400).send('Invalid user name or email')
        }
        if (email === " " || email.trim().length < 3) {
            return res.status(400).send('Invalid user name or email')
        }
        if (!isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: 'invalid email'
            })
        }
        if (password.length <= 8) {
            return res.status(400).send('password must be atleast 8 character ')
        }
        next();
    } catch (error) {
        next(error)
    }
}

const loginValidate = (req, res, next) => {
    var { email, password } = req.body
    // console.log(email,password)
    try {
        var { email, password } = req.body

        if (!email || !password) {
            return res.status(406).send('user details required')
        }
        if (email === " " || email.trim().length < 3) {
            return res.status(400).send('Invalid user email')
        }

        if (password.trim().length < 3) {
            return res.status(400).send('password must need 4 character')
        }

        next();
    }
    catch (error) {

        next(error)
    }
}



module.exports = {
    registerValidate,
    loginValidate
}