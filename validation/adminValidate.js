const taskValidate = (req, res, next) => {
    try {
        var { name, title } = req.body

        if (!title || !name) {
            return res.status(406).json({
                success: false,
                message: 'not valid title or user_id'
            })
        }

        if (title.trim().length < 3 || title === " ") {
            return res.status(406).json({
                success: false,
                message: 'not valid title '
            })
        }

    }
    catch (error) {
        next(error)
    }

    next();

}
const updateValidate = (req, res, next) => {
    try {
        var { title, name } = req.body

        if (  !title || !name) {
            return res.status(406).json({
                success: false,
                message: 'not valid title or user_id'
            })
        }
        if (title.trim().length < 2 || title === " ") {
            return res.status(406).json({
                success: false,
                message: 'not valid title'
            })
        }
       
    }
    catch (error) {
        next(error)
    }
    next();


}
module.exports = {
    taskValidate,
    updateValidate
}