import Orederstep from './Orederstep';

const OrderDetails = () => {
  return (
    <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
                  <div className="space-y-5">
          <div className="space-y-2">
            <div className="grid gap-5 md:grid-cols-[280px_minmax(0,1fr)]">
              <img
                className="h-72 w-full rounded-2xl object-cover ring-1 ring-slate-200"
                src="https://rukminim2.flixcart.com/image/2940/2940/xif0q/sari/v/w/q/free-fandy-vivan-fab-unstitched-original-imahgzzh6vyqbzsw.jpeg?q=90"
                alt="Pink Floral Patterned Saree"
              />

              <div className="space-y-5">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      Delivered
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                      Order #123456789
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">
                    Your order was delivered successfully and is eligible for replacement within 7 days.
                  </p>
                </div>

                <div className="space-y-5">
                  <Orederstep status="Delivered" />

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-sm font-medium text-slate-500">Price</p>
                    <p className="mt-1 text-2xl font-bold text-slate-900">₹1,299</p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 p-4">
                      <p className="text-sm font-medium text-slate-500">Quantity</p>
                      <p className="mt-1 text-lg font-semibold text-slate-900">2</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 p-4">
                      <p className="text-sm font-medium text-slate-500">Payment</p>
                      <p className="mt-1 text-lg font-semibold text-slate-900">Paid</p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-4">
                    <p className="text-sm font-medium text-slate-500">Shipping address</p>
                    <p className="mt-1 text-sm leading-6 text-slate-700">
                      24, Green Avenue, MG Road, Bengaluru, Karnataka, India.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default OrderDetails