import { useState, type FormEvent } from "react";
import { sendLoginOtp, verifyLoginOtp } from "../../../Redux_toolkit/Auth/authSlice";

function Signup() {
	const [isOtpSent, setIsOtpSent] = useState(false);

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
	});

	const [otp, setOtp] = useState("");
	const [loading, setLoading] = useState(false);

	const updateField = (
		field: "name" | "email" | "phone",
		value: string
	) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleSendOtp = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setLoading(true);

		try {
			await sendLoginOtp({ email: formData.email });
			setIsOtpSent(true);
		} finally {
			setLoading(false);
		}
	};

	const handleVerifyOtp = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setLoading(true);

		try {
			await verifyLoginOtp({ email: formData.email, otp });
			console.log("OTP Verified");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="w-full max-w-md rounded-xl bg-white p-6 shadow">
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-700">
          {isOtpSent ? "Verify OTP" : "Sign Up"}
        </h2>
				{!isOtpSent ? (
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
							placeholder="Phone"
							value={formData.phone}
							onChange={(e) =>
								updateField("phone", e.target.value)
							}
							className="w-full rounded border p-3"
							required
						/>

						<button
							type="submit"
							disabled={loading}
							className="w-full rounded bg-blue-600 p-3 text-white"
						>
							{loading ? "Sending..." : "Send OTP"}
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
							disabled={loading}
							className="w-full rounded bg-green-600 p-3 text-white"
						>
							{loading ? "Verifying..." : "Verify OTP"}
						</button>

					</form>
				)}

			</div>
		</div>
	);
}

export default Signup;