const users = require('../models/userModels')
const Users = require('../models/userModels')
const bcrypt = require('bcryptjs')
const register = async (req, res, next) => {

   try {
      const { name, email, password } = req.body
      const hashedPassword = await bcrypt.hash(password, 10)
      const role = "admin"
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

const create = async (req, res, next) => {
   try {


      const { name, title } = req.body

      const data = await Users.updateOne({ name: name }, { $push: { task: { title: title, status: "pending..!" } } })

      if (data.matchedCount === 0) {
         return res.status(404).json({
            success: false,
            message: 'user not found',

         })
      }

      res.status(201).json({
         success: true,
         message: 'task assigned',
      })
   } catch (error) {
      next(error)
   }
}


const viewUser = async (req, res, next) => {
   try {



      let page = Number(req.query.page);
      let limit = Number(req.query.limit);

      if (!Number.isInteger(page) || page < 1) page = 1;
      if (!Number.isInteger(limit) || limit < 2) limit = 1;

      const skip = (page - 1) * limit;

      const userData = await Users.find({ role: "user" }, {
         name: 1,
         email: 1
      }).limit(limit).skip(skip)



      res.status(200).json({
         success: true,
         userData
      })

   } catch (error) {
      next(error)
   }
}

updateStatus = async (req, res, next) => {
   try {
      const { title, name } = req.body


     const result=await Users.updateOne({name:name,"task.title":title},{$set: {"task.$.status":"completed"}})
      res.json({
         success: true,
         message: 'updated successfully'
      })

      if (result.modifiedCount===0) {
         return res.status(404).json({
            success: false,
            message: 'user not found',

         })
      }
   } catch (error) {
      next(error)
   }
}

module.exports = {
   create,
   viewUser,
   updateStatus,
   register
}