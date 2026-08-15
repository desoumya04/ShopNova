import z from "zod";

export const signUpSchema = z.object({
    name: z.string().min(3, "name is too short").max(100, "name is too long"),
    email: z.email("enter valid email"),
    mobile: z.string().length(10, "enter valid mobile number"),
    password: z.string().min(8, "password must be 8 characters long"),

})

export const loginSchema = z.object({
    email: z.email("enter valid email"),
    password: z.string().min(8, "password must be 8 characters long"),
})

export type signUpDataType = z.infer<typeof signUpSchema>;
export type loginDataType = z.infer<typeof loginSchema>






