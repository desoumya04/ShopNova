import { Add } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import AddressForm, { type AddressData } from "./AddressForm";

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
        if (data.length > 0 && data[0].id !== undefined) setSelectedId(data[0].id as string);
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
    <div className="pt-10 px-5 sm:px-10 md:px-60 min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="space-y-6 lg:col-span-2">

          <Card
            variant="outlined"
            sx={{ borderRadius: 4, boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)" }}
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
                          <Button variant="outlined" color="primary" size="small">
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

          <Card
            variant="outlined"
            sx={{ borderRadius: 4, boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)" }}
          >
            <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    Payment Method
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Select a secure payment option to complete your order.
                  </p>
                </div>

                <FormControl>
                  <RadioGroup
                    value={paymentMethod}
                    onChange={(event) => setPaymentMethod(event.target.value)}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <FormControlLabel
                        value="razorpay"
                        control={<Radio />}
                        label="Razorpay"
                        className="m-0 rounded-2xl border border-slate-200 px-4 py-2.5 bg-white hover:border-blue-400 transition-colors"
                      />
                      <FormControlLabel
                        value="stripe"
                        control={<Radio />}
                        label="Stripe"
                        className="m-0 rounded-2xl border border-slate-200 px-4 py-2.5 bg-white hover:border-blue-400 transition-colors"
                      />
                    </div>
                  </RadioGroup>
                </FormControl>

                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={handlePayNow}
                  sx={{
                    py: 1.5,
                    borderRadius: 999,
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                    boxShadow: "0 16px 28px rgba(37, 99, 235, 0.28)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)",
                    },
                  }}
                >
                  Pay Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-1 w-full">
          <Card
            sx={{
              borderRadius: 4,
              position: "sticky",
              top: 24,
              boxShadow: "0 16px 40px rgba(15, 23, 42, 0.12)",
              background:
                "linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.98) 100%)",
              color: "white",
            }}
          >
            <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
              <div className="space-y-5">
                <div>
                  <Typography variant="overline" sx={{ color: "rgba(255,255,255,0.7)" }}>
                    Order Summary
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5 }}>
                    Pricing Details
                  </Typography>
                </div>

                <Stack spacing={2} divider={<Divider sx={{ borderColor: "rgba(255,255,255,0.12)" }} />}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">Subtotal</span>
                    <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">Delivery Charge</span>
                    <span className="font-semibold">₹{deliveryCharge.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">Tax</span>
                    <span className="font-semibold">₹{tax.toFixed(2)}</span>
                  </div>
                </Stack>

                <Divider sx={{ borderColor: "rgba(255,255,255,0.14)" }} />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-300">Total Amount</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Includes all applicable charges
                    </p>
                  </div>
                  <p className="text-2xl font-bold">₹{totalAmount.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
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