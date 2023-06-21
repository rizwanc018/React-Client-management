import express from 'express'
import adminController from '../controllers/adminController.js'
import { verifyAdmin } from '../middlewares/authMiddleware.js'

const router = express.Router()

// router.post('/reg', adminController.registerAdmin)
router.get('/', verifyAdmin, adminController.getAllUsers)
router.post('/auth', adminController.authAdmin)
router.post('/logout', adminController.logOutAdmin)
router.post('/user', verifyAdmin, adminController.addUser)
router.delete('/user', verifyAdmin, adminController.deleteUser)


// router.get('/profile', verifyUser, adminController.getUserProfile)
// router.put('/profile', verifyUser, adminController.updateUser)
// router.put('/profile/image', adminController.updateProfileImage)


export default router