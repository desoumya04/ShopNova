import express from 'express'
import { productControllerInstance } from '../controllers/product.controller.js'


const router = express.Router()

router.get('/product/getCategory', productControllerInstance.getCategory)

export default router