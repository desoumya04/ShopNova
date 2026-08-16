type PricingRow = {
  label: string;
  value: string;
  valueClassName?: string;
};

type PricingProps = {
  item?: any[];
};

const Pricing = ({
  item = [],
}: PricingProps) => {





  const totalItems = item.reduce((acc, curr) => acc + (curr.quantity || 1), 0);
  const totalMRP = item.reduce((acc, curr) => acc + (curr.product?.costPrice || 0) * (curr.quantity || 1), 0);
  const totalSellingPrice = item.reduce((acc, curr) => acc + (curr.product?.price || 0) * (curr.quantity || 1), 0);
  const totalDiscount = totalMRP > totalSellingPrice ? totalMRP - totalSellingPrice : 0;






  const rows: PricingRow[] = [
    {
      label: `Price (${totalItems} item${totalItems !== 1 ? 's' : ''})`,
      value: `₹${totalMRP}`,
      valueClassName: "font-medium text-[15px] text-gray-800",
    },
    {
      label: "Discount",
      value: totalDiscount > 0 ? `-₹${totalDiscount}` : "₹0",
      valueClassName: "font-medium text-[15px] text-green-600",
    },
    {
      label: "Delivery Charges",
      value: "Free",
      valueClassName: "font-medium text-[15px] text-green-600",
    },
  ];

  return (
    <div className={`w-full`}>
      <div className="space-y-4 pt-2">
        {rows.map((row) => (
          <div key={row.label} className="flex justify-between items-center">
            <span className="text-gray-600 text-[15px]">{row.label}</span>
            <span
              className={row.valueClassName ?? "font-medium text-[15px] text-gray-800"}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>

      <div className="my-4 border-t border-dashed border-gray-300" />

      <div className="flex justify-between items-center pb-2">
        <span className="text-gray-800 font-bold text-[17px]">Total Amount</span>
        <span className="font-bold text-[18px] text-gray-900">₹{totalSellingPrice}</span>
      </div>

      {totalDiscount > 0 && (
        <>
          <div className="my-2 border-t border-dashed border-gray-300" />
          <div className="pt-2">
            <p className="font-semibold text-[15px] text-green-600">
              You will save ₹{totalDiscount} on this order
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Pricing;