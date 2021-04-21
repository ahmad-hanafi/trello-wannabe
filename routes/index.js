const router = require('express').Router()
const taskController = require('../controllers/taskController')
const userController = require('../controllers/userController')
const {authenticate, authorize} = require('../middlewares/auth')


router.post('/register', userController.register) //done
router.post('/login', userController.login) // done
router.post('/loginGoogle', userController.google)

router.get('/tasks', taskController.showAll) // done

router.use(authenticate)

router.post('/tasks', taskController.addTask) // done

router.get('/tasks/:id', authorize, taskController.findId) // done
router.put('/tasks/:id', authorize, taskController.update) // done
router.patch('/tasks/:id', authorize, taskController.updateOne) // done
router.delete('/tasks/:id', authorize, taskController.delete) // done                       



module.exports = router