import React from "react";
type OrderCardProps = {
  title: string;
  seller: string;
  image: string;
  price: string;
  quantity: number;
  status: string;
};
import { useNavigate } from "react-router-dom";


const Ordercard = ({ title, seller, image, price, quantity, status }: OrderCardProps) => {
  const navigate = useNavigate();

  return (
    
    <div  onClick={() => navigate('/account/order/1/item/1')} className="relative rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="flex gap-4">
        <img
          className="h-24 w-24 rounded-xl object-cover ring-1 ring-slate-200"
          src={image}
          alt={title}
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-slate-900">{title}</h3>
              <p className="mt-1 text-sm text-slate-500">Sold by {seller}</p>
            </div>

            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
              {status}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <span className="rounded-full bg-slate-100 px-3 py-1">Qty {quantity}</span>
            <span className="rounded-full bg-slate-100 px-3 py-1">7 days replacement</span>
            <span className="rounded-full bg-slate-100 px-3 py-1">Free delivery</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
        <span className="text-sm text-slate-500">Total</span>
        <span className="text-lg font-bold text-slate-900">{price}</span>
      </div>
    </div>
  );
};

export default Ordercard;