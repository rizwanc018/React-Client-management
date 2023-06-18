import express from 'express'
import userController from '../controllers/userController.js'

const router = express.Router()

router.get('/auth', userController.authUser)

export default router