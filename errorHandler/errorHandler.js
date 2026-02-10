
const errorHandler = (error, req, res, next) => {
    console.log(error)
    res.status(500).json({
        success: 'false',
        message: 'Internal hi server error'
    })
   
}

module.exports = errorHandler