import express from 'express'
import userController from '../controllers/userController.js'
import { verifyUser } from '../middlewares/authMiddleware.js'


const router = express.Router()

router.post('/', userController.registerUser)
router.post('/auth', userController.authUser)
router.post('/logout', userController.logOutUser)
router.get('/profile', verifyUser, userController.getUserProfile)
router.post('/profile', verifyUser,)


export default router