import { Add } from "@mui/icons-material";
import { Button, Dialog, DialogTitle, DialogContent, Skeleton, Chip } from "@mui/material";
import React, { useState, useEffect } from "react";
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

  const handleAddressSubmit = (data: AddressData) => {
    setAddresses((prev) => [...prev, data]);
    setSelectedId(data.id ?? null);
    handleCloseAddressForm();
  };

  return (
    <div className="pt-10 px-5 sm:px-10 md:px-60 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="space-y-3 lg:col-span-2">

          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Select Delivery Address</h2>
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

          {/* Loading skeletons */}
          {loading && (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} variant="rounded" height={80} />
              ))}
            </div>
          )}

          {/* Error state */}
          {!loading && error && (
            <p className="text-red-500 text-sm">
              Failed to load addresses: {error}
            </p>
          )}

          {/* Empty state */}
          {!loading && !error && addresses.length === 0 && (
            <div className="border border-dashed border-gray-300 rounded-md p-8 text-center text-gray-400">
              <p className="text-sm">No saved addresses yet.</p>
              <p className="text-xs mt-1">
                Click "Add New Address" to get started.
              </p>
            </div>
          )}

          {/* Address list */}
          {!loading && !error && addresses.length > 0 && (
            <div className="space-y-3">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  onClick={() => setSelectedId(addr.id ?? null)}
                  className={`border rounded-md p-5 cursor-pointer transition-colors ${
                    selectedId === addr.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{addr.label}</h3>
                      {selectedId === addr.id && (
                        <Chip label="Selected" color="primary" size="small" />
                      )}
                    </div>
                    <Button variant="outlined" color="primary" size="small">
                      Edit
                    </Button>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">
                    {addr.city}, {addr.state} - {addr.pincode}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order summary column */}
        <div className="col-span-1 space-y-3 w-full" />
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