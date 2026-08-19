import {Router} from  "express"
import { sellerRouter } from "./seller.route.js"
import { productRouter } from "./product.route.js"
import { userRouter } from "./user.route.js"
import { healthRouter } from "./health.route.js"
import { addToCartRouter } from "./cart.route.js"
import { wishListRoute } from "./wishList.route.js"
import checkOutRouter from "./checkOut.route.js"
import paymentRouter from "./payment.route.js"
import orderRouter from "./order.route.js"

const router = Router()

router.use('/' ,userRouter)   
router.use('/', productRouter)
router.use('/', sellerRouter )
router.use('/', healthRouter)
router.use('/', addToCartRouter)
router.use('/', wishListRoute)
router.use('/', checkOutRouter)
router.use('/', paymentRouter)
router.use('/', orderRouter)

export default router
