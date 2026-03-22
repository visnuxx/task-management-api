const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const Users = require('../models/userModels')

dotenv.config();

const register = async (req, res) => {

    try {
        const { name, email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const role = "user"
        await Users.create({
            name,
            email,
            hashedPassword,
            role,
        })

        res.json({ success: true, message: 'data saved successfully' })
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {

        const { email, password } = req.body
        const user = await Users.findOne({ email: email }, { email: true, name: true, hashedPassword: true, role: true })
        if (!user) {
            return res.status(404).json({
                success: 'false',
                message: 'user not found'
            })
        }
        const isMatch = await bcrypt.compare(password, user.hashedPassword)
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'invalid password'
            })
        }
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.MY_SECRET_KEY,
            { expiresIn: '1h' }
        )
        res.json({
            message: 'login success',
            token
        })
    } catch (error) {
        next(error)
    }
}



const profile = async (req, res,next) => {
    try {
        const userId = req.user.id;

        console.log(userId)
        const result = await Users.findOne({ _id: userId }, { name: true, email: true, task: true })

        console.log(result)
        if (!result) {
            return res.json({
                success:false,
                message:'user not found'
            })
        }
        
        res.json(result)

    } catch (error) {
        next(error)
    }
}


module.exports = {
    register,
    login,
    profile
}
