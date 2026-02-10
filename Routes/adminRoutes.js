const express=require('express')
const {create,viewUser,updateStatus}=require('../Controller/adminController')
const auth=require('../middleware/auth')
const isAdmin=require('../middleware/isAdmin')
const {taskValidate,updateValidate}=require('../validation/adminValidate')
const loginLimit = require('../validation/validation')



const router = express.Router();

/**
 * @swagger
 * /api/admin/create:
 *   post:
 *     summary: Assign task to user (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required: [title, user_id]
 *             properties:
 *               title:
 *                 type: string
 *               user_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Task assigned
 */
router.post('/api/admin/create',taskValidate,auth,isAdmin,create)


/**
 * @swagger
 * /api/admin/view:
 *   get:
 *     summary: View users with tasks (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Users list
 */
router.get('/api/admin/view',auth,isAdmin,viewUser)

/**
 * @swagger
 * /api/admin/update-status:
 *   post:
 *     summary: Update task status (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required: [title, user_id, status]
 *             properties:
 *               title:
 *                 type: string
 *               user_id:
 *                 type: integer
 *               status:
 *                 type: string
 *                 enum: [done]
 *     responses:
 *       200:
 *         description: Status updated
 */
router.post('/api/admin/update-status',updateValidate,auth,isAdmin,updateStatus)



module.exports=router