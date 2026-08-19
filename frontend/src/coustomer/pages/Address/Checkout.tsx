import { Add } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Skeleton,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import AddressForm, { type AddressData } from "./AddressForm";
import AddressCard from "./AddressCard";
import Pricing from "../Cart/Pricing";
import { api } from "../../../config/api"
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


declare global {
  interface Window {
    Razorpay: any;
  }
}


const Checkout = () => {
  const navigate = useNavigate();
  const [openAddressForm, setOpenAddressForm] = useState(false);
  const [oldAddresses, setOldAddresses] = useState<AddressData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const { orderId } = useParams<{ orderId: string }>();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [isChangingAddress, setIsChangingAddress] = useState(false);
  const hasOrderAddress = orderDetails?.shippingAddress && orderDetails.shippingAddress !== "";
  
  // fetch order details
  useEffect(() => {
    if (orderId) {
      const fetchOrder = async () => {
        try {
          const response = await api.get(`/fetchOrderDetail/${orderId}`);
          setOrderDetails(response.data.data);

          
        } catch (err: any) {
        
        }
      };
      fetchOrder();
    }
  }, [orderId]);

  
  // featch the old address
  useEffect(() => {
    const fetchAddresses = async () => {
      const response = await api.get("/user/address");
      return response.data.data;
    };
    fetchAddresses()
      .then((addresses) => {
        if (addresses && addresses.length > 0){
            setOldAddresses(addresses);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // add the new address
  const handleAddAddress = async(address: AddressData)=>{
    try {
      await api.post(`/addShippingAddress/${orderId}`, address);
      setOldAddresses((prev) => [...prev, address]);
      
      setOrderDetails({...orderDetails,
        shippingAddress: address.address,
        shippingCity: address.locality,
        shippingState: address.state,
        shippingPinCode: address.pinCode
      });
      setIsChangingAddress(false);
      setOpenAddressForm(false);
    } catch (err) {
      console.log(err);
    }
  }


  const handleOpenAddressForm = () => setOpenAddressForm(true);
  const handleCloseAddressForm = () => setOpenAddressForm(false);

  const handleRazorpayPayment = async() => {
    const payOrder = await api.post(`/payment/create-order/${orderId}`)
    console.log(payOrder)
    const paymentData = payOrder.data.data;
    const options = {
      key: paymentData.key,
      amount: paymentData.order.amount,
      currency: paymentData.order.currency,
      order_id: paymentData.order.id,
      handler: async function (response: any) {
        try{
          const res = await api.post(`/payment/verify/${orderId}`,{
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          })

          if (res.data.success){
            toast.success("Payment Successful");
            navigate('/order')
          }
        }catch(error:any){
          console.log(error)
          toast.error(error.message);
        }

      },
     
      theme: {
        color: "#3399cc",
      },
    }
    const rzp = new  window.Razorpay(options)
    rzp.open()
      
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
                      Delivery Address
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                      {hasOrderAddress && !isChangingAddress 
                        ? "Where your order will be delivered."
                        : "Choose where your order should be delivered."}
                    </p>
                  </div>
                  {hasOrderAddress && !isChangingAddress && (
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => setIsChangingAddress(true)}
                    >
                      Change
                    </Button>
                  )}
                  {(!hasOrderAddress || isChangingAddress) && (
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      startIcon={<Add />}
                      onClick={handleOpenAddressForm}
                    >
                      Add New Address
                    </Button>
                  )}
                </div>

                {hasOrderAddress && !isChangingAddress ? (
                  <div className="border border-slate-200 rounded-xl p-5 bg-slate-50 relative overflow-hidden shadow-sm">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600"></div>
                    <p className="font-bold text-slate-900 text-sm mb-2 uppercase tracking-wide">Delivering to:</p>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      <span className="block mb-1">{orderDetails.shippingAddress}</span>
                      <span className="block">{orderDetails.shippingCity}, {orderDetails.shippingState} - {orderDetails.shippingPinCode}</span>
                    </p>
                  </div>
                ) : (
                  <>
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

                    {!loading && !error && oldAddresses.length === 0 && (
                      <div className="border border-dashed border-slate-300 rounded-2xl p-8 text-center text-slate-400 bg-slate-50/80">
                        <p className="text-sm">No saved addresses yet.</p>
                        <p className="text-xs mt-1">
                          Click "Add New Address" to get started.
                        </p>
                      </div>
                    )}

                    {!loading && !error && oldAddresses.length > 0 && (
                      <div className="space-y-4">
                        {oldAddresses.map((addr, idx) => (
                          <div key={idx} className="relative group">
                            <AddressCard addr={addr} />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button 
                                  variant="contained" 
                                  size="small" 
                                  onClick={async () => {
                                    try {
                                      await api.put(`/checkOut/changeShippingAddress/${orderId}`, {
                                        addressId: addr.id
                                      });
                                      setIsChangingAddress(false);
                                      setOrderDetails({...orderDetails, 
                                        shippingAddress: addr.address,
                                        shippingCity: addr.locality,
                                        shippingState: addr.state,
                                        shippingPinCode: addr.pinCode
                                      });
                                    } catch (err) {
                                      console.error("Failed to update shipping address", err);
                                    }
                                  }}
                                >
                                  Select
                                </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Ordered Images Section */}
          {orderDetails && orderDetails.items && orderDetails.items.length > 0 && (
            <Card
              variant="outlined"
              sx={{
                borderRadius: 4,
                boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
                mt: 3
              }}
            >
              <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
                <h2 className="text-xl font-semibold text-slate-900 mb-4">
                  Ordered Items
                </h2>
                <div className="flex flex-col gap-4">
                  {orderDetails.items.map((item: any) => {
                    const imageUrl = item.product?.images?.[0]?.url;
                    const variant = item.product?.variants?.[0]; // Get first variant if it exists

                    return (
                      <div key={item.id} className="flex items-start gap-4 p-3 rounded-xl border border-slate-200 shadow-sm bg-white hover:shadow-md transition-shadow">
                        <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border border-slate-100 bg-slate-50">
                          {imageUrl ? (
                            <img src={imageUrl} alt={item.product?.name || item.productName} className="w-full h-full object-cover mix-blend-multiply" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">No Image</div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0 py-1 flex flex-col h-full justify-between">
                          <div>
                            <h3 className="text-sm font-semibold text-slate-900 line-clamp-2 leading-tight">
                              {item.product?.name || item.productName}
                            </h3>
                            
                            {variant && (
                              <div className="flex flex-wrap gap-2 mt-2">
                                {variant.color && (
                                  <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                                    Color: {variant.color}
                                  </span>
                                )}
                                {variant.size && (
                                  <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                                    Size: {variant.size}
                                  </span>
                                )}
                                {variant.storage && (
                                  <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                                    Storage: {variant.storage}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                          
                          <div className="mt-3 flex items-center justify-between">
                            <span className="text-base font-bold text-slate-900">
                              ₹{Number(item.price || item.product?.price || 0).toLocaleString("en-IN")}
                            </span>
                            <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                              Qty: {item.quantity}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
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

              <Pricing item={orderDetails?.items ?? []} />
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
            onSubmit={handleAddAddress}
            onCancel={handleCloseAddressForm}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Checkout;
