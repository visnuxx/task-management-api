const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const { checkConnection, pool } = require('../db')

dotenv.config();

//register user
const register = async (req, res) => {

    try {
        // console.log('data',req.body)
        const { name, email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        var sql = "INSERT INTO users (name, email, password ) VALUES (?, ?,?)"
        await pool.execute(sql, [name, email, hashedPassword])
        res.status(201).json({
            success: true,
            message: "saved"
        })
    } catch (error) {
      next(error)
    }
}

//login
const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const [row] = await pool.execute(
            'SELECT * FROM users WHERE email = ?',
            [email])

        if (row.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'invalid user'
            })
        }

        const user = row[0]
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({
                success: true,
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

//profile

const profile = async (req, res) => {
    try {
        const userId = req.user.id;
        // console.log('Decoded user:', req.user);

        const [row] = await pool.execute(
            `SELECT 
                u.id AS user_id,
                u.name,
                u.email,
                t.id AS task_id,
                t.title,
                t.status
             FROM users u
             LEFT JOIN task t ON u.id = t.user_id
             WHERE u.id = ?`,

            [userId])
        if (row.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'user not found'
            })
        }
        const data = row[0]
        res.json(data)

    } catch (error) {
        next(error)
    }
}


module.exports = {
    register,
    login,
    profile
}
