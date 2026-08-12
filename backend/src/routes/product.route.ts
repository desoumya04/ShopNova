import express from 'express'
import { productControllerInstance } from '../controllers/product.controller.js'
import { upload } from '../controllers/multer.controller.js'


const router = express.Router()

router.get('/product/getCategory', productControllerInstance.getCategory)
router.post('/product/createProduct',upload.array("productImages", 5), productControllerInstance.createProduct)
router.get('/product/sellerProductDetails',productControllerInstance.sellerProductDetails)

router.post("/product/categoryProducts",productControllerInstance.getCategoryProducts)
router.get("/product/getProductByProductId",productControllerInstance.getProductById)

export default router