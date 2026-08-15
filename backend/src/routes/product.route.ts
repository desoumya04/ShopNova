import express from 'express'
import { productControllerInstance } from '../controllers/product.controller.js'
import { upload } from '../controllers/multer.controller.js'


const productRouter = express.Router()

productRouter.get('/product/getCategory', productControllerInstance.getCategory)
productRouter.post('/product/createProduct',upload.array("productImages", 5), productControllerInstance.createProduct)
productRouter.get('/product/sellerProductDetails',productControllerInstance.sellerProductDetails)

productRouter   .post("/product/categoryProducts",productControllerInstance.getCategoryProducts)
productRouter.get("/product/getProductByProductId",productControllerInstance.getProductById)

export {productRouter}