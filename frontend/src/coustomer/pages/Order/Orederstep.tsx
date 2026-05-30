type OrderStep = {
  name: string;
  date?: string;
  value?: string;
};

type OrderStepProps = {
  status?: string;
  steps?: OrderStep[];
};

const defaultSteps: OrderStep[] = [
  { name: 'Order Placed', date: '2026-05-20', value: 'Payment received' },
  { name: 'Packed', date: '2026-05-21', value: 'Packed at warehouse' },
  { name: 'Shipped', date: '2026-05-22', value: 'Left origin hub' },
  { name: 'Out for Delivery', date: '2026-05-23', value: 'With courier' },
  { name: 'Delivered', date: '2026-05-24', value: 'Left at doorstep' },
];

const Orederstep = ({ status = 'Order Placed', steps = defaultSteps }: OrderStepProps) => {
  const idx = steps.findIndex(s => s.name.toLowerCase() === status.toLowerCase());
  const activeIndex = idx; // -1 if not found
  const isCancelled = status?.toLowerCase() === 'cancelled';

  return (
    <div className="mt-4">
      <div className="flex flex-col">
        {steps.map((step, i) => {
          const done = !isCancelled && activeIndex >= 0 && i <= activeIndex;
          return (
            <div key={step.name} className="flex items-start gap-4 py-2">
              <div className="flex flex-col items-center">
                <div
                  className={`h-8 w-8 flex items-center justify-center rounded-full text-xs font-semibold ${isCancelled ? 'bg-red-600 text-white' : (done ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600')}`}
                >
                  {isCancelled ? '✕' : (done ? '✓' : i + 1)}
                </div>
                {i < steps.length - 1 && (
                  <div className={`h-8 w-px ${isCancelled ? 'bg-red-600' : (i < activeIndex ? 'bg-emerald-600' : 'bg-slate-200')}`} />
                )}
              </div>

              <div className="pt-1 flex-1">
                <div className={`flex items-center justify-between ${isCancelled ? 'text-red-700 font-semibold' : (done ? 'text-emerald-700 font-semibold' : 'text-slate-600')}`}>
                  <div className="text-sm">{step.name}</div>
                  {step.date && <div className="text-xs text-slate-500">{step.date}</div>}
                </div>
                {step.value && <div className={`text-sm mt-1 ${isCancelled ? 'text-red-600' : 'text-slate-700'}`}>{step.value}</div>}
                {i === activeIndex && !isCancelled && (
                  <div className="text-xs text-slate-500 mt-1">Current status</div>
                )}
                {isCancelled && (
                  <div className="text-xs text-red-600 mt-1">This order was cancelled</div>
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
