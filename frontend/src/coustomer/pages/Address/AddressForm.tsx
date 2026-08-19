import React, { useState } from "react";
import {
  TextField,
  Button,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import PinDropOutlinedIcon from "@mui/icons-material/PinDropOutlined";
import LocationCityOutlinedIcon from "@mui/icons-material/LocationCityOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

export interface AddressData {
  id?: string;
  locality: string;
  pinCode: string | number;
  state: string;
  address: string;
}

interface AddressFormProps {
  onSubmit?: (data: AddressData) => void;
  onCancel?: () => void;
  initialData?: Partial<AddressData>;
  loading?: boolean;
}

type FormErrors = Partial<Record<keyof AddressData, string>>;

const EMPTY_FORM: AddressData = {
  locality: "",
  pinCode: "",
  state: "",
  address: "",
};

async function lookupPincode(
  pin: string
): Promise<{ state: string } | null> {
  if (pin.length !== 6) return null;
  try {
    const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
    const data = await res.json();
    if (data?.[0]?.Status === "Success") {
      const po = data[0].PostOffice?.[0];
      return { state: po?.State ?? "" };
    }
  } catch {
    // silently fail
  }
  return null;
}

function validate(formData: AddressData): FormErrors {
  const errors: FormErrors = {};
  if (!formData.locality.trim()) errors.locality = "Locality is required";
  if (!/^\d{6}$/.test(String(formData.pinCode)))
    errors.pinCode = "Enter a valid 6-digit pin code";
  if (!formData.address.trim()) errors.address = "Address is required";
  if (!formData.state.trim()) errors.state = "State is required";
  return errors;
}

const AddressForm = ({ onSubmit, onCancel, initialData, loading = false }: AddressFormProps) => {
  const [formData, setFormData] = useState<AddressData>({
    ...EMPTY_FORM,
    ...initialData,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [pinLoading, setPinLoading] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<keyof AddressData, boolean>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof AddressData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    
    if (name === "pinCode" && value.length === 6) {
      setPinLoading(true);
      lookupPincode(value).then((result) => {
        if (result) {
          setFormData((prev) => ({
            ...prev,
            state: result.state,
          }));
          setErrors((prev) => ({ ...prev, state: undefined }));
        }
        setPinLoading(false);
      });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldErrors = validate(formData);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldErrors[name as keyof AddressData],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = Object.keys(EMPTY_FORM).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    );
    setTouched(allTouched);
    
    const fieldErrors = validate(formData);
    setErrors(fieldErrors);
    
    if (Object.keys(fieldErrors).length > 0) return;

    onSubmit?.({
      ...formData,
      pinCode: Number(formData.pinCode),
    });
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      noValidate 
      className="flex flex-col gap-5 p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 to-teal-500" />
      
      <div className="mb-2">
        <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
          {initialData ? "Edit Address" : "Add New Address"}
        </h3>
        <p className="text-sm text-slate-500 mt-1">Please enter your exact location details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <TextField
          label="Locality / Town"
          name="locality"
          value={formData.locality}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.locality && !!errors.locality}
          helperText={touched.locality ? errors.locality : ""}
          required
          fullWidth
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': { borderRadius: '12px' },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationCityOutlinedIcon className="text-emerald-500" />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Pin Code"
          name="pinCode"
          value={formData.pinCode}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.pinCode && !!errors.pinCode}
          helperText={touched.pinCode ? errors.pinCode : ""}
          required
          fullWidth
          variant="outlined"
          type="number"
          sx={{
            '& .MuiOutlinedInput-root': { borderRadius: '12px' },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {pinLoading ? (
                  <CircularProgress size={20} className="text-emerald-500" />
                ) : (
                  <PinDropOutlinedIcon className="text-emerald-500" />
                )}
              </InputAdornment>
            ),
          }}
        />
      </div>

      <TextField
        label="State"
        name="state"
        value={formData.state}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.state && !!errors.state}
        helperText={touched.state ? errors.state : ""}
        required
        fullWidth
        variant="outlined"
        sx={{
          '& .MuiOutlinedInput-root': { borderRadius: '12px' },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MapOutlinedIcon className="text-emerald-500" />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        label="Full Address (House No, Building, Street)"
        name="address"
        value={formData.address}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.address && !!errors.address}
        helperText={touched.address ? errors.address : ""}
        required
        fullWidth
        multiline
        rows={3}
        variant="outlined"
        sx={{
          '& .MuiOutlinedInput-root': { borderRadius: '12px' },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1 }}>
              <HomeOutlinedIcon className="text-emerald-500" />
            </InputAdornment>
          ),
        }}
      />

      <div className="flex flex-col sm:flex-row gap-3 pt-4 mt-2 border-t border-slate-100">
        <Button
          type="button"
          onClick={onCancel}
          variant="outlined"
          color="inherit"
          fullWidth
          startIcon={<CancelOutlinedIcon />}
          sx={{
            borderRadius: '12px',
            textTransform: 'none',
            fontSize: '1rem',
            py: 1.2,
            color: '#64748b',
            borderColor: '#e2e8f0',
            '&:hover': {
              backgroundColor: '#f8fafc',
              borderColor: '#cbd5e1',
            }
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveOutlinedIcon />}
          sx={{
            borderRadius: '12px',
            textTransform: 'none',
            fontSize: '1rem',
            py: 1.2,
            backgroundColor: '#10b981',
            boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.39)',
            '&:hover': {
              backgroundColor: '#059669',
              boxShadow: '0 6px 20px rgba(16, 185, 129, 0.23)',
            }
          }}
        >
          {loading ? "Saving..." : "Save Address"}
        </Button>
      </div>
    </form>
  );
};

export default AddressForm;