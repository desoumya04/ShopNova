import { useEffect } from 'react';
import Ordercard from './Ordercard';
import { useAppDispatch, useAppSelector } from '../../../Redux_toolkit/store';
import { fetchSuccessOrder } from '../../../Redux_toolkit/order/orderSlice';

const Order = () => {
  const dispatch = useAppDispatch();
  const { orders = [], loading = false, error = null } = useAppSelector((state) => state.order || {});

  useEffect(() => {
    dispatch(fetchSuccessOrder());
  }, [dispatch]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(320px,1fr)]">
        <div className="space-y-4">
          
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">Your orders</p>
            <p className="mt-2 text-sm text-slate-500">
              Review your all items, check the price summary and track your orders.
            </p>
        

          <div className="space-y-4">
            {loading && <p>Loading orders...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && (!orders || orders.length === 0) && <p>No orders found.</p>}
            {!loading &&
              Array.isArray(orders) &&
              orders.map((order) =>
                Array.isArray(order?.items)
                  ? order.items.map((item) => (
                      <Ordercard
                        key={item?.id || Math.random()}
                        orderId={order?.id}
                        itemId={item?.id}
                        title={item?.product?.name || 'Unknown Product'}
                        seller={item?.product?.seller?.business?.name || 'Unknown Seller'}
                        image={item?.product?.images?.[0]?.url || ''}
                        price={`₹${(item?.product?.price || 0) * (item?.quantity || 1)}`}
                        quantity={item?.quantity || 1}
                        status={order?.paymentStatus || 'Unknown'}
                        date={order?.createdAt}
                      />
                    ))
                  : null
              )}
          </div>
        </div>

       
      </div>
    </section>
  );
};

export default Order;