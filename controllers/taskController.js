const { User, Task } = require('../models')

class Controller {
    static showAll(req, res, next) {
        Task.findAll({
            include: { 
                model: User,
                attributes: ["id", "name"]},
                order: [['updatedAt', 'DESC']]
        })
            .then((task) => {
                res.status(200).json(task)
            })
            .catch((err) => {
                next({
                    code: 500,
                    message: "Internal server error"
                })
            })
    }

    static addTask(req, res, next) {
        const newTask = {
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            UserId: req.currentUser.id,
        }
        Task.create(newTask)
            .then((task) => {
                res.status(201).json(task)
            })
            .catch((err) => {
                if (err.message) {
                    next({
                        code: 400,
                        message: err
                    })
                } else {
                    next({
                        code: 500,
                        message: "Internal server error"
                    })
                }
            })
    }


    static findId(req, res, next) {
        Task.findOne({
            where: {
                id: +req.params.id
            },
            include: { 
                model: User,
                attributes: ["id", "name"]}
        })
            .then((task) => {
                res.status(200).json(task)
            })
            .catch((err) => {
                next({
                    code: 404,
                    message: "Data not found"
                })
            })
    }

    static update(req, res, next) {
        Task.update(req.body, {
            where: {
                id: +req.params.id
            },
            returning: true
        })
            .then((data) => {
                res.status(200).json(data)
            })
            .catch((err) => {
                next(err)
            })
    }

    static updateOne(req, res, next) {
        Task.update({ category: req.body.category }, {
            where: {
                id: +req.params.id
            },
            returning: true
        })
            .then((task) => {
                res.status(200).json(task)
            })
            .catch((err) => {
                next({
                    code: 404,
                    message: "Data not found"
                })
            })
    }

    static delete(req, res, next) {
        Task.destroy({
            where: {
                id: +req.params.id
            }
        })
            .then((task) => {
                res.status(200).json({ message: "Task success to delete" })
            })
            .catch((err) => {
                next({
                    code: 404,
                    message: "Data not found"
                })
            })
    }

}

module.exports = Controller