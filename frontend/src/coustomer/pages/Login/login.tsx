
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod"
import { toast } from "sonner";
import { api } from "../../../config/api";



const loginData = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

type loginDataType = z.infer<typeof loginData>


function Login() {

	const navigate = useNavigate();

	const loginFrom = useForm<loginDataType>({
		resolver: zodResolver(loginData),
		defaultValues: {
			email: "",
			password: ""
		}
	})


	const handleLogin = async (data: loginDataType) => {

		try {
			const resultAction = await api.post("/auth/login", {
				email: data.email,
				password: data.password
			});

			if (resultAction.status === 200) { }

			navigate("/");

		} catch (error: any) {
			const message =
				error?.response?.data?.message ||
				error?.response?.data?.error ||
				"Failed to login";
			toast.error(message);
			console.error(error);
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
								<form onSubmit={loginFrom.handleSubmit(handleLogin)} className="space-y-5">
									<label className="block">
										<span className="mb-2 block text-sm font-medium text-slate-200">
											Email address
										</span>
										<input
											type="email"

											placeholder="name@example.com"
											{...loginFrom.register("email")}
											className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
											required
										/>
									</label>
									<label className="block">
										<span className="mb-2 block text-sm font-medium text-slate-200">
											Password
										</span>
										<input
											type="password"

											placeholder="Enter your password"
											{...loginFrom.register("password")}
											className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
											required
										/>
									</label>

									<button
										type="submit"
										disabled={loginFrom.formState.isSubmitting}
										className="flex w-full items-center justify-center rounded-2xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
									>
										{loginFrom.formState.isSubmitting ? "Signing in..." : "Continue with email"}
									</button>
								</form>

							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
