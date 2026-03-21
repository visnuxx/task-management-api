const app = require('./app');
const mongoose = require('mongoose')
const dotenv =require('dotenv')

dotenv.config()

const PORT =  8000;

mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log('db connected')

        app.listen(PORT,async()=>{
          console.log(`server started at ${PORT}`)
        })
    })
    .catch(error=>{console.log('error')})
 