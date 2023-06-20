import express from 'express'
import userController from '../controllers/userController.js'
import { verifyUser } from '../middlewares/authMiddleware.js'


const router = express.Router()

router.post('/', userController.registerUser)
router.post('/auth', userController.authUser)
router.post('/logout', userController.logOutUser)
router.get('/profile', verifyUser, userController.getUserProfile)
router.put('/profile', verifyUser, userController.updateUser)
router.put('/profile/image', userController.updateProfileImage)


export default router