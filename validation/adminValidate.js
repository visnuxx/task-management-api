const taskValidate=(req,res,next)=>{
    try{
     var {title,user_id}=req.body
   
    if ( !title || !user_id) {
       return res.status(406).json({
        success:'false',
        message:'not valid title or user_id'})
    }

    if(title.trim().length<3 || title===" ") {
        return res.status(406).json({
            success:'false',
            message:'not valid title '})
       }
      
    }
    catch(error){
        next(error)
    }

    next();
   
}
const updateValidate=(req,res,next)=>{
       try{
     var {status,title,user_id}=req.body
   
    if (!status || !title || !user_id) {
       return res.status(406).json({
        success:'false',
        message:'not valid title or user_id'})
    }
     if(title.trim().length<3 || title===" ") {
        return res.status(406).json({
            success:'false',
            message:'not valid title'})
       }
       if (status.trim()!=='done') {
         return res.status(406).json({
            success:'false',
            message:'not valid status'})
       }
    }
    catch(error){
        next(error)
    }
    next();

    
}
module.exports={
    taskValidate,
    updateValidate
}