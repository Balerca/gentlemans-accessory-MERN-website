const express=require('express')
const router=express.Router()

const { getProducts, getAdminProducts, newProduct, getSingleProduct, updateProduct, deleteProduct, createProductReview, getProductReviews, deleteReview } = require('../controllers/productController')
const { isAuthenticated, authRoles } = require('../middlewares/auth')

router.route('/products').get(getProducts)

router.route('/admin/products').get(getAdminProducts)


router.route('/admin/product/new').post(isAuthenticated, authRoles('admin'), newProduct)

router.route('/product/:id').get(getSingleProduct)

router.route('/admin/product/:id').put(isAuthenticated, authRoles('admin'), updateProduct)

router.route('/admin/product/:id').delete(isAuthenticated, authRoles('admin'), deleteProduct)

router.route('/review').put(isAuthenticated, createProductReview)
router.route('/reviews').get(isAuthenticated, getProductReviews)
router.route('/reviews').delete(isAuthenticated, deleteReview)



module.exports = router