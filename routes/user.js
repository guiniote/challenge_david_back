const express = require('express')

const {
  createUser, loginUser, getUser, putUser,
} = require('../controllers/user')
const { userToken } = require('../middlewares/userToken')

const router = express.Router()

const { loginSchema } = require('../schemas/login')
const { registerSchema } = require('../schemas/register')
const { validation } = require('../middlewares/validation')

router.post('/register', validation(registerSchema), createUser)
router.post('/login', validation(loginSchema), loginUser)
router.get('/user/:id', userToken, getUser)
router.post('/user/:id', userToken, putUser)

module.exports = router
