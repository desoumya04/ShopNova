import { useEffect, useState } from 'react'
import { Add, AddShoppingCart, Favorite, Remove, Star } from '@mui/icons-material'
import { Button, Divider } from '@mui/material'
import SimilarProduct from './SimilarProduct'
import { useLocation } from 'react-router'
import { useAppSelector, useAppDispatch } from '../../../../Redux_toolkit/store'
import { addItemToCart, updateCartItem } from '../../../../Redux_toolkit/cart/cartSlice'
import { api } from '../../../../config/api'
import { toast } from 'sonner'
import { addToWishlist } from '../../../../Redux_toolkit/wishlist/wishListSlice'

type ProductImage = {
  id: string
  url: string
}

type Product = {
  id: string
  title: string
  description: string
  price: number
  costPrice: number
  discountPrice: number
  averageRating: number
  images: ProductImage[]
  stock: number
}



const ProductDetails = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()

  const routeKey = location.pathname.split("/").filter(Boolean).pop() as string
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentImage, setCurrentImage] = useState(0)
  const [quantity, setQuantity] = useState(0)

  const { cartItems } = useAppSelector((state) => state.cart)

  const itemInCart = (cartItems as any[])?.find((item) => item.productId === routeKey)
  const alreadyInCart = itemInCart ? itemInCart.quantity : 0
  const availableStock = product ? product.stock - alreadyInCart : 0
  const isOutOfStock = availableStock <= 0
  // for wishlist
  const wishItems = useAppSelector((some)=>some.wishlist.wishlistItems)
  console.log("wishItems",wishItems)
  // fetch the product by id
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await api.get(`/product/getProductByProductId`, {
          params: { productId: routeKey }
        })
        const data = response.data.data

        setProduct(data.product || data)
      } catch (error) {
        console.error("Error fetching product details", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [routeKey])




  const handleWishList = async () => {
    try {
      await dispatch(addToWishlist(routeKey)).unwrap()
      toast.success("Item added to wishlist successfully!");
    } catch (error: any) {
      toast.error(error || "something went wrong in adding to wishlist")
    }
  }
  const isWishlisted = wishItems.some((item: any) => item.productId === routeKey)



  const addToCart = async () => {
    try {
      await dispatch(addItemToCart({ productId: routeKey, quantity })).unwrap()
      toast.success("Item added to cart successfully!");
    } catch (error: any) {
      toast.error(error || "something went wrong in adding to cart")
    }
  }



  const handleUpdateCartItem = async (newQuantity: number) => {
    try {
      await dispatch(updateCartItem({ productId: routeKey, quantity: newQuantity })).unwrap()
      if (newQuantity === 0) {
        toast.success("Item removed from cart")
        setQuantity(0);
      }
    } catch (error: any) {
      toast.error(error || "Failed to update cart item")
    }
  }
  if (loading || !product) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  const images = product?.images ?? []
  //console.log("the product is ", images)



  const handleQuantity = (value: number) => {
    //check the stock avilability

    if (quantity + value > availableStock) {
      toast.error(`Only ${availableStock} more available in stock`)
      return
    }
    if (quantity + value > 0) {
      setQuantity(quantity + value)
    }
  }
  const handleImageChange = (index: number) => {
    setCurrentImage(index)
  }
  return (
    <div className='min-h-screen bg-slate-50 py-10 px-5 lg:px-20'>
      <div className='mx-auto max-w-7xl rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:p-10'>
        <div className='grid grid-cols-1 gap-12 lg:grid-cols-2'>
          {/* Image Gallery */}
          <section className='flex flex-col-reverse gap-4 lg:flex-row'>
            {/* Thumbnails */}
            <div className='flex gap-3 overflow-x-auto pb-2 lg:w-24 lg:flex-col lg:overflow-visible lg:pb-0'>
              {images.map((image: any, index: number) => (
                <button
                  key={index}
                  onClick={() => handleImageChange(index)}
                  className={`relative flex-shrink-0 overflow-hidden rounded-xl bg-slate-100 transition-all ${
                    currentImage === index 
                      ? 'ring-2 ring-blue-600 ring-offset-2' 
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={image.url} className='h-20 w-20 object-cover lg:h-24 lg:w-24' alt={`Thumbnail ${index + 1}`} />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className='relative flex-1 overflow-hidden rounded-2xl bg-slate-100'>
              <img 
                src={images[currentImage]?.url} 
                alt={product?.title} 
                className="h-full w-full object-cover mix-blend-multiply transition-transform duration-500 hover:scale-105" 
              />
              <button 
                onClick={handleWishList}
                className='absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md transition-transform hover:scale-110'
              >
                <Favorite color={isWishlisted ? 'error' : 'action'} />
              </button>
            </div>
          </section>

          {/* Product Info */}
          <section className='flex flex-col'>
            <div className='mb-6'>
              <h1 className='text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl'>
                {product?.title}
              </h1>
              
              <div className='mt-4 flex items-center gap-4'>
                <div className='flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700 ring-1 ring-amber-600/20'>
                  <span className='font-bold'>{product?.averageRating || 0}</span>
                  <Star className='h-4 w-4' />
                </div>
                <div className='h-4 w-px bg-slate-200' />
                <span className='text-sm text-slate-500 font-medium'> Ratings</span>
              </div>
            </div>

            <div className='mb-8'>
              <div className='flex items-end gap-3'>
                <span className='text-4xl font-extrabold text-slate-900'>
                  ₹{Number(product?.price || 0).toLocaleString("en-IN")}
                </span>
                <span className='mb-1 text-lg text-slate-400 line-through'>
                  ₹{Number(product?.costPrice || 0).toLocaleString("en-IN")}
                </span>
                <span className='mb-1 rounded-md bg-emerald-100 px-2 py-1 text-sm font-semibold text-emerald-700'>
                  ₹{Number(product?.discountPrice || 0)} off
                </span>
              </div>
              <p className='mt-2 text-sm text-slate-500'>Inclusive of all taxes</p>
            </div>

            <div className='mb-8'>
              <h3 className='text-sm font-semibold uppercase tracking-wider text-slate-900'>Description</h3>
              <p className='mt-3 leading-relaxed text-slate-600'>
                {product?.description}
              </p>
            </div>

            <div className='mb-8 rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200'>
              {alreadyInCart > 0 ? (
                <div>
                  <h3 className='text-sm font-semibold text-slate-900'>Quantity in Cart</h3>
                  <div className='mt-3 flex w-32 items-center justify-between rounded-lg bg-white ring-1 ring-slate-200'>
                    <button 
                      onClick={() => handleUpdateCartItem(alreadyInCart - 1)}
                      className='flex h-10 w-10 items-center justify-center text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 rounded-l-lg'
                    >
                      <Remove fontSize="small" />
                    </button>
                    <span className='font-semibold text-slate-900'>{alreadyInCart}</span>
                    <button
                      disabled={product ? alreadyInCart >= product.stock : false}
                      onClick={() => {
                        if (product && alreadyInCart >= product.stock) {
                          import('sonner').then(({ toast }) => toast.error(`Maximum stock limit reached`));
                        } else {
                          handleUpdateCartItem(alreadyInCart + 1)
                        }
                      }}
                      className='flex h-10 w-10 items-center justify-center text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 rounded-r-lg disabled:opacity-50'
                    >
                      <Add fontSize="small" />
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className='text-sm font-semibold text-slate-900'>Quantity</h3>
                  <div className='mt-3 flex w-32 items-center justify-between rounded-lg bg-white ring-1 ring-slate-200'>
                    <button 
                      onClick={() => handleQuantity(-1)}
                      className='flex h-10 w-10 items-center justify-center text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 rounded-l-lg'
                    >
                      <Remove fontSize="small" />
                    </button>
                    <span className='font-semibold text-slate-900'>{quantity}</span>
                    <button 
                      onClick={() => handleQuantity(1)}
                      className='flex h-10 w-10 items-center justify-center text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 rounded-r-lg'
                    >
                      <Add fontSize="small" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className='mt-auto flex gap-4'>
              {alreadyInCart === 0 && (
                <Button
                  startIcon={<AddShoppingCart />}
                  variant='contained'
                  onClick={addToCart}
                  disabled={isOutOfStock || quantity === 0}
                  className='!flex-1 !rounded-xl !py-3.5 !text-base !font-semibold !shadow-none hover:!shadow-md transition-shadow'
                  disableElevation
                >
                  {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                </Button>
              )}
              <Button 
                variant={alreadyInCart > 0 ? 'contained' : 'outlined'} 
                className={`!flex-1 !rounded-xl !py-3.5 !text-base !font-semibold transition-shadow ${alreadyInCart > 0 ? '!shadow-none hover:!shadow-md' : 'border-2'}`}
                disableElevation
              >
                Buy Now
              </Button>
            </div>
            
            {/* Trust Badges */}
            <div className='mt-8 flex flex-wrap items-center justify-center gap-6 border-t border-slate-200 pt-6 text-sm font-medium text-slate-600'>
               <div className="flex items-center gap-2">
                 <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-lg">🛡️</div>
                 <span>1 Year Warranty</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-lg">🚚</div>
                 <span>Free Shipping</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-lg">↩️</div>
                 <span>Easy Returns</span>
               </div>
            </div>
          </section>
        </div>
      </div>

      <section className='mx-auto mt-16 max-w-7xl'>
        <div className="mb-8">
          <h2 className='text-2xl font-bold tracking-tight text-slate-900'>Similar Products</h2>
          <div className='mt-1 h-1 w-20 rounded-full bg-blue-600'></div>
        </div>
        <div>
          <SimilarProduct />
        </div>
      </section>
    </div>
  )
}

export default ProductDetails