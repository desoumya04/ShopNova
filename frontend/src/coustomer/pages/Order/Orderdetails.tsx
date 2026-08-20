import Orederstep from './Orederstep';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../Redux_toolkit/store';
import { fetchSuccessOrder } from '../../../Redux_toolkit/order/orderSlice';

const OrderDetails = () => {
  const { orderId, itemId } = useParams<{ orderId: string; itemId: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { orders = [], loading = false } = useAppSelector((state) => state.order || {});
  
  useEffect(() => {
    if (!orders || orders.length === 0) {
      dispatch(fetchSuccessOrder());
    }
  }, [dispatch, orders.length]);

  const order = orders.find((o) => o.id === orderId);
  const item = order?.items?.find((i) => i.id === itemId);

  const [status, setStatus] = useState(order?.status || 'PENDING');

  useEffect(() => {
    if (order?.status) {
      setStatus(order.status);
    }
  }, [order?.status]);

  if (loading) {
    return <div className="p-8 text-center">Loading order details...</div>;
  }

  if (!order || !item) {
    // If not loading and not found
    if (!loading && orders.length > 0) {
       return <div className="p-8 text-center">Order or item not found.</div>;
    }
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <div className="rounded-2xl border border-slate-200 p-4">
          <div className="grid gap-5 md:grid-cols-[140px_1fr] items-start">
            <img
              className="h-36 w-full rounded-2xl object-cover ring-1 ring-slate-200"
              src={item.product?.images?.[0]?.url || 'https://via.placeholder.com/150'}
              alt={item.product?.name || 'Product Image'}
            />
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${status.toLowerCase() === 'cancelled' ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'}`}>
                  {status}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  Order #{order.id}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600">
                Your order was {status.toLowerCase()} and is eligible for replacement within 7 days.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-medium text-slate-500">Order Status</h3>
          <div className="mt-3">
            <Orederstep status={status} />
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
              <p className="mt-1 text-2xl font-bold text-slate-900">₹{(item.product?.price || 0) * (item.quantity || 1)}</p>
            </div>

            <div className="sm:flex-1 px-4 py-3 flex flex-col sm:items-center">
              <p className="text-sm text-slate-500">Quantity</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">{item.quantity}</p>
            </div>

            <div className="sm:flex-1 px-4 py-3 flex flex-col sm:items-center">
              <p className="text-sm text-slate-500">Payment</p>
              <p className="mt-1 text-lg font-semibold text-emerald-700">{order.paymentStatus}</p>
            </div>
          </div>

          <div className="mt-4 text-sm text-slate-500">Includes taxes and shipping</div>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-medium text-slate-500">Shipping address</h3>
          <p className="mt-1 text-sm leading-6 text-slate-700">
            {order.shippingAddress}, {order.shippingCity}, {order.shippingState}, {order.shippingPinCode}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-medium text-slate-500">Cancel Order</h3>
          <div className="mt-3">
            <p className="text-sm text-slate-600 mb-3">If you cancel now, the refund will be processed according to the store policy.</p>
            <button
              type="button"
              onClick={() => {
                try {
                  const proceed = (typeof confirm === 'function') ? confirm('Are you sure you want to cancel this order?') : true;
                  if (proceed) {
                    // TODO: replace with API call to cancel order
                    setStatus('CANCELLED')
                    console.log('Order cancelled')
                  }
                } catch (err) {
                  console.error('Cancel handler error', err)
                  // fallback: mark as cancelled to avoid leaving UI broken
                  setStatus('CANCELLED')
                }
              }}
              disabled={status.toLowerCase() === 'cancelled'}
              className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold text-white ${status.toLowerCase() === 'cancelled' ? 'bg-red-300 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
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