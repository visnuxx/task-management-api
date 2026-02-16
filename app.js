const express=require('express');
const swaggerUi=require('swagger-ui-express')
const helmet=require('helmet')
const swaggerSpec=require('./swagger')
const { checkConnection } = require('./db');
const userRoutes = require('./Routes/usersRoutes')
const adminRoutes = require('./Routes/adminRoutes');
const errorHandler = require('./errorHandler/errorHandler');
const app=express();




app.use(helmet())
app.use(express.urlencoded({extended:true}))
app.use(express.json())



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(userRoutes)
app.use(adminRoutes)

app.use(errorHandler)

app.get('/home',(req,res,next)=>{
    res.send('<h1>Server running</h1>')
})


module.exports=app

