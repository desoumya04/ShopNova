import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../../Redux_toolkit/Auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../../Redux_toolkit/store";

function Login() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	
	const[email, setEmail] = useState("");

	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const trimmedEmail = email.trim();

		if (!trimmedEmail) {
			setMessage("Please enter your email address.");
			return;
		}

		setLoading(true);
		setMessage("");

		try {
			const resultAction = await dispatch(login({ email: trimmedEmail }));

			if (login.fulfilled.match(resultAction)) {
				setMessage("Login successful.");
				navigate("/");
			} else {
				setMessage("Unable to log in with this email. Please try again.");
			}
		} catch {
			setMessage("Unable to log in with this email. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-[radial-gradient(circle_at_top,_#1f2937,_#0f172a_60%,_#020617)] px-4 py-10 text-white">
			<div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
				<div className="grid w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-black/30 backdrop-blur md:grid-cols-[1.1fr_0.9fr]">
					<div className="hidden flex-col justify-between bg-gradient-to-br from-sky-500 via-cyan-400 to-emerald-400 p-10 text-slate-950 md:flex">
						<div>
							<p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-900/70">
								Shoping
							</p>
							<h1 className="mt-6 max-w-sm text-4xl font-black leading-tight">
								Sign in with your email in a clean, modern flow.
							</h1>
							<p className="mt-4 max-w-md text-sm leading-6 text-slate-900/75">
								Use your email address to access your account quickly.
							</p>
						</div>
						<div className="rounded-2xl border border-slate-900/10 bg-white/40 p-4 text-sm font-medium text-slate-900 shadow-lg shadow-slate-900/10">
							Fast email login, designed for a focused checkout and account experience.
						</div>
					</div>

					<div className="p-6 sm:p-10">
						<div className="mx-auto max-w-md">
							<div className="mb-8 text-center md:text-left">
								<p className="text-sm font-medium uppercase tracking-[0.25em] text-cyan-300">
									Welcome back
								</p>
								<h2 className="mt-3 text-3xl font-bold text-white">
									Login with email
								</h2>
								<p className="mt-3 text-sm leading-6 text-slate-300">
									Enter your email address to continue and access your account.
								</p>
							</div>

							<div className="rounded-2xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-black/20">
								<form onSubmit={handleLogin} className="space-y-5">
									<label className="block">
										<span className="mb-2 block text-sm font-medium text-slate-200">
											Email address
										</span>
										<input
											type="email"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											placeholder="name@example.com"
											className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
											required
										/>
									</label>

									<button
										type="submit"
										disabled={loading}
										className="flex w-full items-center justify-center rounded-2xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
									>
										{loading ? "Signing in..." : "Continue with email"}
									</button>
								</form>

								{message ? (
									<p className="mt-5 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
										{message}
									</p>
								) : null}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
