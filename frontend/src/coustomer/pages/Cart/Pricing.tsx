type PricingRow = {
  label: string;
  value: string;
  valueClassName?: string;
};

type PricingProps = {
  rows?: PricingRow[];
  totalLabel?: string;
  totalValue?: string;
  footerText?: string;
  tone?: "light" | "dark";
  className?: string;
};

const defaultRows: PricingRow[] = [
  {
    label: "Price (5 items)",
    value: "₹6,499",
    valueClassName: "font-semibold text-lg",
  },
  {
    label: "Discount",
    value: "-₹1,200",
    valueClassName: "font-semibold text-lg text-green-600",
  },
  {
    label: "Delivery Charges",
    value: "Free",
    valueClassName: "font-semibold text-lg text-green-600",
  },
];

const Pricing = ({
  rows = defaultRows,
  totalLabel = "Total Amount",
  totalValue = "₹5,299",
  footerText = "You will save ₹1,200 on this order",
  tone = "light",
  className = "",
}: PricingProps) => {
  const isDark = tone === "dark";
  const labelClassName = isDark ? "text-slate-300" : "text-gray-600";
  const totalLabelClassName = isDark
    ? "text-slate-100 font-semibold text-lg"
    : "text-gray-600 font-semibold text-lg";
  const totalValueClassName = isDark
    ? "font-semibold text-xl text-emerald-300"
    : "font-semibold text-xl text-teal-700";
  const footerClassName = isDark ? "text-xs text-slate-400 mt-3" : "text-xs text-gray-400 mt-3";

  return (
    <div className={className}>
      <div className="space-y-3">
        {rows.map((row) => (
          <div key={row.label} className="flex justify-between items-center gap-4">
            <span className={labelClassName}>{row.label}</span>
            <span
              className={row.valueClassName ?? (isDark ? "font-semibold text-lg text-white" : "font-semibold text-lg")}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>

      <hr className={isDark ? "my-4 border-slate-700" : "my-3"} />

      <div className="flex justify-between items-center gap-4">
        <span className={totalLabelClassName}>{totalLabel}</span>
        <span className={totalValueClassName}>{totalValue}</span>
      </div>

      {footerText && <p className={footerClassName}>{footerText}</p>}
    </div>
  );
};

export default Pricing;