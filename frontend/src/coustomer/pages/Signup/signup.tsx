import { useState } from "react";
import { api } from "../../../config/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form"

const veryficationSchema = z.object({
	otp: z.string().min(6, "OTP must be at least 6 digits long"),
	email: z.email("Invalid email address"),
})

const loginSchema = z.object({
	name: z.string().min(3, "Name must be at least 3 characters long"),
	email: z.email("Invalid email address"),
	mobile: z.string().min(10, "Mobile number must be at least 10 digits long").max(10,"Mobile number must be at most 10 digits long"),
	password: z.string().min(8, "Password must be at least 8 characters long"),
	confirmPassword: z.string().min(8, "Confirm password must be at least 8 characters long"),
});

type LoginDataType = z.infer<typeof loginSchema>
type VeryficationDataType = z.infer<typeof veryficationSchema>


function Signup() {
	const navigate = useNavigate();
	const loginForm = useForm<LoginDataType>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			name: "",
			mobile: "",
			email: "",
			password: "",
			confirmPassword: "",
		}
	});
	
	const [otpSent, setOtpSent] = useState(false);
	


	//react hook form



	const handleSendOtp = async (data: LoginDataType) => {
		if (data.password !== data.confirmPassword) {
			toast.error("Passwords do not match!");
			return;
		}
		try {
			const response = await api.post("/auth/signup", {
				name: data.name,
				email: data.email,
				mobile: data.mobile,
				password: data.password,
			});

			console.log(response.data);
			toast.success("OTP sent to your email!");
			verificationForm.setValue("email", data.email);
			setOtpSent(true);
		} catch (error: any) {
			const message =
				error?.response?.data?.message ||
				error?.response?.data?.error ||
				"Failed to send OTP";
			toast.error(message);
			console.error(error);
		} 
	};


	const verificationForm = useForm<VeryficationDataType>({
		resolver: zodResolver(veryficationSchema),
		defaultValues: {
			otp: "",
			email: "",
		}
	});

	const handleVerifyOtp = async (data: VeryficationDataType) => {
	
		try {
			const res = await api.post("/auth/verify_otp", {
				email: data.email,
				otp: data.otp,
			});
			console.log("OTP Verified", res.data);
			toast.success("OTP verified successfully!");
			navigate("/");
		} catch (error: any) {
			const message =
				error?.response?.data?.message ||
				error?.response?.data?.error ||
				"Failed to verify OTP";
			toast.error(message);
			console.error(error);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="w-full max-w-md rounded-xl bg-white p-6 shadow">
				<h2 className="mb-6 text-center text-2xl font-semibold text-gray-700">
					{otpSent ? "Verify OTP" : "Sign Up"}
				</h2>
				{!otpSent ? (
					<form onSubmit={loginForm.handleSubmit(handleSendOtp)} className="space-y-4">
						<input
							type="text"
							placeholder="Name"
							{...loginForm.register("name")}
							className="w-full rounded border p-3"
							required
						/>

						{
							loginForm.formState.errors.name?.message && (
								<p className="text-red-500 text-sm">
									{loginForm.formState.errors.name?.message}
								</p>
							)
						}
						<input
							type="email"
							placeholder="Email"
							{...loginForm.register("email")}
							className="w-full rounded border p-3"
							required
						/>

						{
							loginForm.formState.errors.email?.message && (
								<p className="text-red-500 text-sm">
									{loginForm.formState.errors.email?.message}
								</p>
							)		
						}
						<input
							type="tel"
							placeholder="Mobile Number"
							{...loginForm.register("mobile")}
							className="w-full rounded border p-3"
							required
						/>

						{
							loginForm.formState.errors.mobile?.message && (
								<p className="text-red-500 text-sm">
									{loginForm.formState.errors.mobile?.message}
								</p>
							)		
						}
						<input
							type="password"
							placeholder="Password"
							{...loginForm.register("password")}
							className="w-full rounded border p-3"
							required
						/>

						{
							loginForm.formState.errors.password?.message && (
								<p className="text-red-500 text-sm">
									{loginForm.formState.errors.password?.message}
								</p>
							)		
						}
						<input
							type="password"
							placeholder="Confirm Password"
							{...loginForm.register("confirmPassword")}
							className="w-full rounded border p-3"
							required
						/>

						{
							loginForm.formState.errors.confirmPassword?.message && (
								<p className="text-red-500 text-sm">
									{loginForm.formState.errors.confirmPassword?.message}
								</p>
							)		
						}
						<button
							type="submit"
							disabled={loginForm.formState.isSubmitting}
							className="w-full rounded bg-blue-600 p-3 text-white disabled:opacity-50"
						>
							{loginForm.formState.isSubmitting ? "Sending..." : "Send OTP"}
						</button>
					</form>
				) : (
					<form onSubmit={verificationForm.handleSubmit(handleVerifyOtp)} className="space-y-4">
						<input
							type="text"
							{...verificationForm.register("email")}
							className="w-full rounded border p-3 text-center bg-gray-50"
							readOnly
						/>

						{ verificationForm.formState.errors.email?.message && (
							<p className="text-red-500 text-sm">
								{verificationForm.formState.errors.email?.message}
							</p>
						) }
						<input
							type="text"
							{...verificationForm.register("otp")}
							maxLength={6}
							placeholder="Enter OTP"
							className="w-full rounded border p-3 text-center"
							required
						/>

						{
							verificationForm.formState.errors.otp?.message && (
								<p className="text-red-500 text-sm">
									{verificationForm.formState.errors.otp?.message}
								</p>
							)
						}

						<button
							type="submit"
							disabled={verificationForm.formState.isSubmitting}
							className="w-full rounded bg-green-600 p-3 text-white disabled:opacity-50"
						>
							{verificationForm.formState.isSubmitting ? "Verifying..." : "Verify OTP"}
						</button>

						<button
							type="button"
							onClick={() => setOtpSent(false)}
							className="w-full text-center text-sm text-gray-500 hover:text-gray-700"
						>
							Back to Sign Up
						</button>
					</form>
				)}
			</div>
		</div>
	);
}

export default Signup;