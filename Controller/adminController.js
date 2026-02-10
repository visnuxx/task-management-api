const { pool } = require("../db");

//assign task
const create = async (req, res, next) => {
   try {

      const { title, user_id } = req.body
      //  console.log('task',title,user_id)
      const sqls = 'INSERT INTO task (title, user_id)VALUES (?, ?)'
      const [task] = await pool.execute(sqls, [title, user_id])
      if (task.affectedRows === 0) {
         return res.status(404).json({
            success: "false",
            message: 'user not found',

         })
      }
      res.status(201).json({
         success: 'true:',
         message: 'task assigned',
      })

   } catch (error) {
      next(error)
   }
}


//view users
const viewUser = async (req, res) => {
   try {
      var page = Number(req.query.page)
      var limit = Number(req.query.limit)

      if (!Number.isInteger(page) || page < 1) page = 1
      if (!Number.isInteger(limit) || limit < 2) limit = 3

      const offset = (page - 1) * limit;

      var [userData] = await pool.execute
         (
            `
            SELECT 
                u.id,
                u.name,
                u.email,
                t.title,
                t.status,
                t.created_at
            FROM users u
            LEFT JOIN task t
                ON t.user_id = u.id
            ORDER BY u.id
            LIMIT ${limit} OFFSET ${offset};
           
            `,

         )
      // console.log(userData)
      res.status(200).json({
         success: 'true',
         userData
      })

   } catch (error) {
      next(error)
   }
}

updateStatus = async (req, res, next) => {
   try {
      const { status, title, user_id } = req.body
      // console.log('data',status,title,user_id)

      const [result] = await pool.execute('UPDATE task SET status = ? WHERE title = ? AND user_id = ?',
         [status, title, user_id])
      if (result.affectedRows === 0) {
         res.status(404).json({
            success: 'false',
            message: 'no users found'
         })
      }
      res.json({
         success: 'true',
         message: 'updated successfully'
      })
   } catch (error) {
      next(error)
   }
}

module.exports = {
   create,
   viewUser,
   updateStatus
}