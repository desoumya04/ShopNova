import { Add } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Skeleton,
} from "@mui/material";
import { useState, useEffect } from "react";
import AddressForm, { type AddressData } from "./AddressForm";
import Pricing from "../Cart/Pricing";

// Simulated fetch — replace with your real API call
async function fetchAddresses(): Promise<AddressData[]> {
  const response = await fetch("/api/addresses"); // 👈 your endpoint
  if (!response.ok) throw new Error("Failed to fetch addresses");
  return response.json();
}

const Checkout = () => {
  const [openAddressForm, setOpenAddressForm] = useState(false);
  const [addresses, setAddresses] = useState<AddressData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");

  const subtotal = 1299;
  const deliveryCharge = 49;
  const tax = 78;
  const totalAmount = subtotal + deliveryCharge + tax;

  useEffect(() => {
    fetchAddresses()
      .then((data) => {
        setAddresses(data);
        // auto-select first if it has a defined id
        if (data.length > 0 && data[0].id !== undefined)
          setSelectedId(data[0].id as string);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleOpenAddressForm = () => setOpenAddressForm(true);
  const handleCloseAddressForm = () => setOpenAddressForm(false);

  const handleRazorpayPayment = () => {
    console.log("Razorpay Payment");
  };

  const handleStripePayment = () => {
    console.log("Stripe Payment");
  };

  const handlePayNow = () => {
    if (paymentMethod === "razorpay") {
      handleRazorpayPayment();
      return;
    }

    handleStripePayment();
  };

  const handleAddressSubmit = (data: AddressData) => {
    setAddresses((prev) => [...prev, data]);
    setSelectedId(data.id ?? null);
    handleCloseAddressForm();
  };

  return (
    <div className="pt-10 px-5 sm:px-10 md:px-40 min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="space-y-6 lg:col-span-2">
          <Card
            variant="outlined"
            sx={{
              borderRadius: 4,
              boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
            }}
          >
            <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
              <div className="space-y-4">
                <div className="flex justify-between items-center gap-3">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">
                      Select Delivery Address
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                      Choose where your order should be delivered.
                    </p>
                  </div>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    startIcon={<Add />}
                    onClick={handleOpenAddressForm}
                  >
                    Add New Address
                  </Button>
                </div>

                {loading && (
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} variant="rounded" height={80} />
                    ))}
                  </div>
                )}

                {!loading && error && (
                  <p className="text-red-500 text-sm">
                    Failed to load addresses: {error}
                  </p>
                )}

                {!loading && !error && addresses.length === 0 && (
                  <div className="border border-dashed border-slate-300 rounded-2xl p-8 text-center text-slate-400 bg-slate-50/80">
                    <p className="text-sm">No saved addresses yet.</p>
                    <p className="text-xs mt-1">
                      Click "Add New Address" to get started.
                    </p>
                  </div>
                )}

                {!loading && !error && addresses.length > 0 && (
                  <div className="space-y-3">
                    {addresses.map((addr) => (
                      <div
                        key={addr.id}
                        onClick={() => setSelectedId(addr.id ?? null)}
                        className={`border rounded-2xl p-5 cursor-pointer transition-all duration-200 ${
                          selectedId === addr.id
                            ? "border-blue-500 bg-blue-50 shadow-sm"
                            : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                        }`}
                      >
                        <div className="flex justify-between items-center gap-3">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg text-slate-900">
                              {addr.label}
                            </h3>
                            {selectedId === addr.id && (
                              <Chip
                                label="Selected"
                                color="primary"
                                size="small"
                              />
                            )}
                          </div>
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                          >
                            Edit
                          </Button>
                        </div>
                        <p className="text-slate-600 text-sm mt-2">
                          {addr.city}, {addr.state} - {addr.pincode}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-1 w-full">
          <section className="sticky top-6 w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Payment Method
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Select your preferred payment method.
                </p>
              </div>

              <FormControl component="fieldset">
                <RadioGroup
                  row
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="flex items-center gap-4"
                >
                  <FormControlLabel
                    value="razorpay"
                    control={<Radio />}
                    label="Razorpay"
                    className="m-0"
                  />
                  <FormControlLabel
                    value="stripe"
                    control={<Radio />}
                    label="Stripe"
                    className="m-0"
                  />
                </RadioGroup>
              </FormControl>
            </div>

            <hr className="my-6 border-slate-300" />

            <div className="space-y-5">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Order Summary
                </p>
                <h3 className="text-lg font-semibold mt-1 text-slate-900">
                  Pricing Details
                </h3>
              </div>

              <Pricing
                tone="light"
                className="space-y-5"
                rows={[
                  {
                    label: "Subtotal",
                    value: `₹${subtotal.toFixed(2)}`,
                  },
                  {
                    label: "Delivery Charge",
                    value: `₹${deliveryCharge.toFixed(2)}`,
                  },
                  {
                    label: "Tax",
                    value: `₹${tax.toFixed(2)}`,
                  },
                ]}
                totalLabel="Total Amount"
                totalValue={`₹${totalAmount.toFixed(2)}`}
                footerText="Includes all applicable charges"
              />
            </div>
            <div className="mt-6">
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handlePayNow}
              >
                Pay Now
              </Button>
            </div>
          </section>
        </div>
      </div>

      {/* Add Address Dialog */}
      <Dialog
        open={openAddressForm}
        onClose={handleCloseAddressForm}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Address</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <AddressForm
            onSubmit={handleAddressSubmit}
            onCancel={handleCloseAddressForm}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Checkout;
