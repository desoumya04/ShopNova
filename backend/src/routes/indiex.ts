import {Router} from  "express"
import { sellerRouter } from "./seller.route.js"
import { productRouter } from "./product.route.js"
import { userRouter } from "./user.route.js"
import { healthRouter } from "./health.route.js"




const router = Router()

router.use('/' ,userRouter)   
router.use('/', productRouter)
router.use('/', sellerRouter )
router.use('/', healthRouter )

export default router
