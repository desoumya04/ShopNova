import Ordercard from './Ordercard';

const ORDER_ITEMS = [
  {
    title: 'Josh Bager',
    seller: 'Jio Mart Private Limited',
    image: 'https://rukminim2.flixcart.com/image/2940/2940/xif0q/sari/v/w/q/free-fandy-vivan-fab-unstitched-original-imahgzzh6vyqbzsw.jpeg?q=90',
    price: '₹1,299',
    quantity: 2,
    status: 'Delivered',
  },
  {
    title: 'Noise Headphones',
    seller: 'Noise India',
    image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/headphone/g/r/1/-original-imagyqg3k3zjz2rn.jpeg?q=70',
    price: '₹2,499',
    quantity: 1,
    status: 'Shipped',
  },
  {
    title: 'Josh Bager',
    seller: 'Jio Mart Private Limited',
    image: 'https://rukminim2.flixcart.com/image/2940/2940/xif0q/sari/v/w/q/free-fandy-vivan-fab-unstitched-original-imahgzzh6vyqbzsw.jpeg?q=90',
    price: '₹1,299',
    quantity: 2,
    status: 'Delivered',
  },
  {
    title: 'Josh Bager',
    seller: 'Jio Mart Private Limited',
    image: 'https://rukminim2.flixcart.com/image/2940/2940/xif0q/sari/v/w/q/free-fandy-vivan-fab-unstitched-original-imahgzzh6vyqbzsw.jpeg?q=90',
    price: '₹1,299',
    quantity: 2,
    status: 'Delivered',
  },
  {
    title: 'Josh Bager',
    seller: 'Jio Mart Private Limited',
    image: 'https://rukminim2.flixcart.com/image/2940/2940/xif0q/sari/v/w/q/free-fandy-vivan-fab-unstitched-original-imahgzzh6vyqbzsw.jpeg?q=90',
    price: '₹1,299',
    quantity: 2,
    status: 'Delivered',
  },
];

const Order = () => {

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(320px,1fr)]">
        <div className="space-y-4">
          
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">Your orders</p>
            <p className="mt-2 text-sm text-slate-500">
              Review your all items, check the price summary and track your orders.
            </p>
        

          <div className="space-y-4">
            {ORDER_ITEMS.map((item) => (
              <Ordercard key={`${item.title}-${item.status}`} {...item} />
            ))}
          </div>
        </div>

       
      </div>
    </section>
  );
};

export default Order;