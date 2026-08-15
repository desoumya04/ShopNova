import { z } from "zod"

export const sellerSignupSchema = z.object({
    password:z.string().min(8, "password must be 8 characters long"),
})
export const sellerAddressSchema = z.object({
    locality: z.string().min(3, "locality is too short").max(100, "locality is too long"),
    pinCode: z.coerce.string().length(6, "enter valid pin code").transform((val) => Number(val)),
    state: z.string().min(3, "state is too short").max(100, "state is too long"),
    address: z.string().min(3, "address is too short").max(100, "address is too long"),
})
export const sellerBusinessSchema = z.object({
    name: z.string().min(3, "business name is too short").max(100, "business name is too long"),
    email: z.email("enter valid business email"),
    mobile: z.string().length(10, "enter valid business mobile number"),
    category: z.enum([
      "ELECTRONICS",
      "FASHION",
      "GROCERY",
      "BEAUTY",
      "SPORTS",
      "HOME_APPLIANCES",
      "BOOKS",
      "TOYS",
      "OTHER"
    ]),
    gstIn: z.string().min(3, "business gst in is too short").max(100, "business gst in is too long").optional().or(z.literal("")),
})

export const sellerBusinessAddressSchema = z.object({
    locality: z.string().min(3, "locality is too short").max(100, "locality is too long"),
    pinCode: z.coerce.string().length(6, "enter valid pin code").transform((val) => Number(val)),
    state: z.string().min(3, "state is too short").max(100, "state is too long"),
    address: z.string().min(3, "address is too short").max(100, "address is too long"),
})

export const sellerBankSchema = z.object({
    bankName: z.string().min(3, "bank name is too short").max(100, "bank name is too long"),
    accountHolder: z.string().min(3, "account holder name is too short").max(100, "account holder name is too long"),
    accountNumber: z.string().min(3, "account number is too short").max(100, "account number is too long"),
    ifcCode: z.string().min(3, "ifc code is too short").max(100, "ifc code is too long"),
})


export const sellerLoginSchema = z.object({
    email: z.email("enter valid email"),
    password: z.string().min(8, "password must be 8 characters long"),
})



export type sellerBusinessDataType = z.infer<typeof sellerBusinessSchema>;
export type sellerBusinessAddressDataType = z.infer<typeof sellerBusinessAddressSchema>;
export type sellerBankDataType = z.infer<typeof sellerBankSchema>;
export type sellerSignupDataType = z.infer<typeof sellerSignupSchema>;
export type sellerAddressDataType = z.infer<typeof sellerAddressSchema>;
export type sellerLoginDataType = z.infer<typeof sellerLoginSchema>;
