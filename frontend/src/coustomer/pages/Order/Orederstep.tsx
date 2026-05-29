type OrderStepProps = {
  status?: string;
};

const steps = [
  'Order Placed',
  'Packed',
  'Shipped',
  'Out for Delivery',
  'Delivered',
];

const Orederstep = ({ status = 'Order Placed' }: OrderStepProps) => {
  const activeIndex = Math.max(0, steps.findIndex(s => s.toLowerCase() === status.toLowerCase()));

  return (
    <div className="mt-4">
      <div className="flex flex-col">
        {steps.map((step, i) => {
          const done = i <= activeIndex;
          return (
            <div key={step} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`h-8 w-8 flex items-center justify-center rounded-full text-xs font-semibold ${done ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`}
                >
                  {done ? '✓' : i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className={`h-8 w-px ${i < activeIndex ? 'bg-emerald-600' : 'bg-slate-200'}`} />
                )}
              </div>

              <div className="pt-1">
                <div className={`text-sm ${done ? 'text-emerald-700 font-semibold' : 'text-slate-600'}`}>
                  {step}
                </div>
                {i === activeIndex && (
                  <div className="text-xs text-slate-500 mt-1">Current status</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orederstep;
