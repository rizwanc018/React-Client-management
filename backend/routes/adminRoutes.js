import express from 'express'
import adminController from '../controllers/adminController.js'
import { verifyAdmin } from '../middlewares/authMiddleware.js'

const router = express.Router()

// router.post('/reg', adminController.registerAdmin)
router.get('/', adminController.getAllUsers)
router.post('/auth', adminController.authAdmin)
router.post('/logout', adminController.logOutAdmin)
router.post('/user', adminController.addUser)
router.delete('/user', adminController.deleteUser)


// router.get('/profile', verifyUser, adminController.getUserProfile)
// router.put('/profile', verifyUser, adminController.updateUser)
// router.put('/profile/image', adminController.updateProfileImage)


export default router