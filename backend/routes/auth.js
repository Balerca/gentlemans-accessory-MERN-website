const express = require('express')
const router = express.Router()
const {register, login, logout, recoverPassword, resetPassword, getMe, changePassword, updateMe, getAllUsers, getUserDetails, updateUser, deleteUser}=require('../controllers/userController')
const {isAuthenticated, authRoles} = require('../middlewares/auth')

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').get(logout)
router.route('/password/recover').post(recoverPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/me').get(isAuthenticated, getMe)
router.route('/password/change').put(isAuthenticated, changePassword)
router.route('/me/update').put(isAuthenticated, updateMe)
router.route('/admin/users').get(isAuthenticated, authRoles('admin'), getAllUsers)
router.route('/admin/user/:id').get(isAuthenticated, authRoles('admin'), getUserDetails)
router.route('/admin/user/:id').put(isAuthenticated, authRoles('admin'), updateUser)
router.route('/admin/user/:id').delete(isAuthenticated, authRoles('admin'), deleteUser)



module.exports = router