const express = require('express')
const router = express.Router()
const { createOrder, getSingleOrder, myOrders, allOrders, updateOrder, deleteOrder } = require('../controllers/orderController')
const {isAuthenticated, authRoles } = require('../middlewares/auth')

router.route('/order/new').post(isAuthenticated, createOrder)
router.route('/order/:id').get(isAuthenticated, getSingleOrder)
router.route('/orders/me').get(isAuthenticated, myOrders)
router.route('/admin/orders').get(isAuthenticated, authRoles('admin'), allOrders)
router.route('/admin/order/:id').put(isAuthenticated, authRoles('admin'), updateOrder)
router.route('/admin/order/:id').delete(isAuthenticated, authRoles('admin'), deleteOrder)






module.exports = router