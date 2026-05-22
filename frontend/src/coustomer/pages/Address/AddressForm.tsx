import React, { useState } from "react";
import {
  TextField,
  Button,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ApartmentIcon from "@mui/icons-material/Apartment";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import PinDropOutlinedIcon from "@mui/icons-material/PinDropOutlined";

interface AddressFormProps {
  onSubmit?: (data: AddressData) => void;
  onCancel?: () => void;
  initialData?: Partial<AddressData>;
}

export interface AddressData {
  id?: string;
  label?: string;
  name: string;
  phone: string;
  pincode: string;
  address: string;
  city: string;
  state: string;
}

type FormErrors = Partial<Record<keyof AddressData, string>>;

const EMPTY_FORM: AddressData = {
  name: "",
  phone: "",
  pincode: "",
  address: "",
  city: "",
  state: "",
};

async function lookupPincode(
  pin: string
): Promise<{ city: string; state: string } | null> {
  if (pin.length !== 6) return null;
  try {
    const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
    const data = await res.json();
    if (data?.[0]?.Status === "Success") {
      const po = data[0].PostOffice?.[0];
      return { city: po?.District ?? "", state: po?.State ?? "" };
    }
  } catch {
    // silently fail
  }
  return null;
}

function validate(formData: AddressData): FormErrors {
  const errors: FormErrors = {};
  if (!formData.name.trim()) errors.name = "Name is required";
  if (!/^[6-9]\d{9}$/.test(formData.phone))
    errors.phone = "Enter a valid 10-digit mobile number";
  if (!/^\d{6}$/.test(formData.pincode))
    errors.pincode = "Enter a valid 6-digit pincode";
  if (!formData.address.trim()) errors.address = "Address is required";
  if (!formData.city.trim()) errors.city = "City is required";
  if (!formData.state.trim()) errors.state = "State is required";
  return errors;
}

const AddressForm = ({ onSubmit, onCancel, initialData }: AddressFormProps) => {
  const [formData, setFormData] = useState<AddressData>({
    ...EMPTY_FORM,
    ...initialData,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [pinLoading, setPinLoading] = useState(false);
  const [touched, setTouched] = useState<
    Partial<Record<keyof AddressData, boolean>>
  >({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof AddressData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (name === "pincode" && value.length === 6) {
      setPinLoading(true);
      lookupPincode(value).then((result) => {
        if (result) {
          setFormData((prev) => ({
            ...prev,
            city: result.city,
            state: result.state,
          }));
          setErrors((prev) => ({ ...prev, city: undefined, state: undefined }));
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
      id: formData.id ?? crypto.randomUUID(),
      label: formData.label ?? formData.name,
    });

    setFormData(EMPTY_FORM);
    setTouched({});
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

      {/* Row 1 — Name & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextField
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.name && !!errors.name}
          helperText={touched.name ? errors.name : ""}
          required
          fullWidth
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutlineIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.phone && !!errors.phone}
          helperText={touched.phone ? errors.phone : ""}
          required
          fullWidth
          size="small"
          type="tel"
          inputProps={{ maxLength: 10 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
      </div>

      {/* Row 2 — Street Address */}
      <TextField
        label="Street Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.address && !!errors.address}
        helperText={touched.address ? errors.address : ""}
        required
        fullWidth
        size="small"
        multiline
        rows={2}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <HomeOutlinedIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
      />

      {/* Row 3 — Pincode, City, State */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <TextField
          label="Pincode"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.pincode && !!errors.pincode}
          helperText={touched.pincode ? errors.pincode : ""}
          required
          fullWidth
          size="small"
          inputProps={{ maxLength: 6 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PinDropOutlinedIcon fontSize="small" />
              </InputAdornment>
            ),
            endAdornment: pinLoading ? (
              <InputAdornment position="end">
                <CircularProgress size={16} />
              </InputAdornment>
            ) : null,
          }}
        />
        <TextField
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.city && !!errors.city}
          helperText={touched.city ? errors.city : ""}
          required
          fullWidth
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ApartmentIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
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
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MapOutlinedIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-1">
        <Button variant="outlined" onClick={onCancel} type="button">
          Cancel
        </Button>
        <Button variant="contained" color="primary" type="submit">
          {initialData ? "Save Changes" : "Add Address"}
        </Button>
      </div>

    </form>
  );
};

export default AddressForm;