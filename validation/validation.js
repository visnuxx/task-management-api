
const rateLimit=require('express-rate-limit')

const loginLimit=rateLimit({
    windowMs:15*60*100,
    max:5,
    message:{
        status:429,
        message:'too many request try again later'
    }
})

module.exports=loginLimit