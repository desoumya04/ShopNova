import Orederstep from './Orederstep';

const OrderDetails = () => {
  return (
    <section className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <div className="rounded-2xl border border-slate-200 p-4">
          <div className="grid gap-5 md:grid-cols-[140px_1fr] items-start">
            <img
              className="h-36 w-full rounded-2xl object-cover ring-1 ring-slate-200"
              src="https://rukminim2.flixcart.com/image/2940/2940/xif0q/sari/v/w/q/free-fandy-vivan-fab-unstitched-original-imahgzzh6vyqbzsw.jpeg?q=90"
              alt="Pink Floral Patterned Saree"
            />
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Delivered
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  Order #123456789
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600">
                Your order was delivered successfully and is eligible for replacement within 7 days.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-medium text-slate-500">Order Status</h3>
          <div className="mt-3">
            <Orederstep status="Delivered" />
          </div>
        </div>

        <div className="rounded-2xl bg-white shadow-sm border border-slate-100 p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-slate-600">Order Summary</h3>
            <p className="text-sm text-slate-500">Order total</p>
          </div>

          <div className="mt-3 flex flex-col sm:flex-row items-stretch divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
            <div className="sm:flex-1 px-4 py-3 flex flex-col sm:items-center">
              <p className="text-sm text-slate-500">Price</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">₹1,299</p>
            </div>

            <div className="sm:flex-1 px-4 py-3 flex flex-col sm:items-center">
              <p className="text-sm text-slate-500">Quantity</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">2</p>
            </div>

            <div className="sm:flex-1 px-4 py-3 flex flex-col sm:items-center">
              <p className="text-sm text-slate-500">Payment</p>
              <p className="mt-1 text-lg font-semibold text-emerald-700">Paid</p>
            </div>
          </div>

          <div className="mt-4 text-sm text-slate-500">Includes taxes and shipping</div>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-medium text-slate-500">Shipping address</h3>
          <p className="mt-1 text-sm leading-6 text-slate-700">
            24, Green Avenue, MG Road, Bengaluru, Karnataka, India.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-medium text-slate-500">Cancel Order</h3>
          <div className="mt-3">
            <p className="text-sm text-slate-600 mb-3">If you cancel now, the refund will be processed according to the store policy.</p>
            <button
              type="button"
              onClick={() => {
                if (confirm('Are you sure you want to cancel this order?')) {
                  // TODO: replace with API call to cancel order
                  console.log('Order cancelled')
                  alert('Order cancelled')
                }
              }}
              className="inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
              Cancel Order
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OrderDetails