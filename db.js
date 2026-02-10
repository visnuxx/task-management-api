const mysql=require('mysql2/promise')
const dotenv=require('dotenv')

dotenv.config();

const pool=mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE,
    connectionLimit:10,
    queueLimit:0,
    waitForConnections:true,
})

const checkConnection=async()=>{
    try {
        const connection = await pool.getConnection();
        console.log('db connected successfully')
        connection.release();

    } catch (error) {
        console.log('db connection failed')
    }
}

module.exports={
    pool,
    checkConnection
}