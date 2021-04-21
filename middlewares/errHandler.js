let errHandler = (err, req, res, next) => {
    // console.log(err, "ini errornya")

    if (err.name === 'SequelizeUniqueConstraintError') {
        // console.log(err, "ini error dalam if")
        res.status(400).json({
            message: err.message,
            detail: err.errors[0].message
        })
    } else if (err.code === 400) {
        // console.log(err.message.errors[0].message,"ini di if awal")
        if (err.message.errors) {
            res.status(400).json({
                message: err.message.errors[0].message,
                // detail: err.errors[0].message
            })  
        } else {
            res.status(400).json({ message: err.message})
        }
    } else if (err.code === 401 || err.name == "JsonWebTokenError") {
        res.status(401).json({message: err.message})
    } else if (err.code === 404) {
        res.status(404).json({message: err.message})
    } else {
        res.status(500).json({message : err})
    }
}

module.exports = errHandler