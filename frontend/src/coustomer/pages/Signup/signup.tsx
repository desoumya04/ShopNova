import { useState, type FormEvent } from "react";
import { login, sendLoginOtp } from "../../../Redux_toolkit/Auth/authSlice";
import { useAppSelector, useAppDispatch } from "../../../Redux_toolkit/store";

function Signup() {
	const {auth} = useAppSelector((state) => state);
	const dispatch = useAppDispatch();


	const [formData, setFormData] = useState({
		name: "",
		mobile: "",
		email: "",
		
	});

	const [otp, setOtp] = useState("");
	
	const updateField = (
		field: "name" | "email" | "mobile",
		value: string
	) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleSendOtp = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await dispatch(sendLoginOtp({ name: formData.name, mobile: formData.mobile, email: formData.email }));
	};

	const handleVerifyOtp = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

	

		try {
			await dispatch(login({  otp }));
			console.log("OTP Verified");
		} finally {
			
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="w-full max-w-md rounded-xl bg-white p-6 shadow">
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-700">
          {auth.otpSent ? "Verify OTP" : "Sign Up"}
        </h2>
				{!auth.otpSent ? (
					<form onSubmit={handleSendOtp} className="space-y-4">

						<input
							type="text"
							placeholder="Name"
							value={formData.name}
							onChange={(e) =>
								updateField("name", e.target.value)
							}
							className="w-full rounded border p-3"
							required
						/>

						<input
							type="email"
							placeholder="Email"
							value={formData.email}
							onChange={(e) =>
								updateField("email", e.target.value)
							}
							className="w-full rounded border p-3"
							required
						/>

						<input
							type="tel"
							placeholder="Mobile Number"
							value={formData.mobile}
							onChange={(e) =>
								updateField("mobile", e.target.value)
							}
							className="w-full rounded border p-3"
							required
						/>

						<button
							type="submit"
							disabled={auth.loading}
							className="w-full rounded bg-blue-600 p-3 text-white"
						>
							{auth.loading ? "Sending..." : "Send OTP"}
						</button>

					</form>
				) : (
					<form onSubmit={handleVerifyOtp} className="space-y-4">

						<input
							type="text"
							value={otp}
							onChange={(e) =>
								setOtp(e.target.value.replace(/\D/g, ""))
							}
							maxLength={6}
							placeholder="Enter OTP"
							className="w-full rounded border p-3 text-center"
							required
						/>

						<button
							type="submit"
							disabled={auth.loading}
							className="w-full rounded bg-green-600 p-3 text-white"
						>
							{auth.loading ? "Verifying..." : "Verify OTP"}
						</button>

					</form>
				)}

			</div>
		</div>
	);
}

export default Signup;