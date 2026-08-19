import express from 'express'
import { productControllerInstance } from '../controllers/product.controller.js'
import { upload } from '../controllers/multer.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'


const productRouter = express.Router()

productRouter.get('/product/getCategory', productControllerInstance.getCategory)
productRouter.post('/product/createProduct', authMiddleware, upload.array("productImages", 5), productControllerInstance.createProduct)
productRouter.put('/product/:productId', authMiddleware,upload.array("updatedImage", 5), productControllerInstance.updateProduct)
productRouter.get('/product/sellerProductDetails', authMiddleware, productControllerInstance.sellerProductDetails)
productRouter.patch('/product/:productId/archive', authMiddleware, productControllerInstance.archiveProduct)

productRouter.post("/product/categoryProducts", authMiddleware, productControllerInstance.getCategoryProducts)
productRouter.get("/product/getProductByProductId", authMiddleware, productControllerInstance.getProductById)

export {productRouter}