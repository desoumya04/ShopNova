import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../Redux_toolkit/store'
import { updateSeller,updateSellerAddress } from '../Redux_toolkit/seller/seller'

const SellerLogin = () => {
	const navigate = useNavigate()

  const dispatch = useAppDispatch()

	const seller = useAppSelector(
    (state) => state.seller.seller
  )
  const sellerAddress = useAppSelector(
    (state) => state.seller.sellerAddress
  )


	console.log("seller:", seller)

	const handleBasicSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		navigate('/seller/onboarding/business')
	}

	return (
		<div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.22),transparent_35%),linear-gradient(180deg,#020617_0%,#0f172a_55%,#111827_100%)] px-4 py-8 text-white sm:px-6 lg:px-8">
			<div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
				<div className="grid w-full overflow-hidden rounded-4xl border border-white/10 bg-white/5 shadow-2xl shadow-black/30 backdrop-blur lg:grid-cols-[0.95fr_1.05fr]">
					<aside className="flex flex-col justify-between bg-linear-to-br from-emerald-400 via-cyan-400 to-sky-500 p-8 text-slate-950 sm:p-10">
						<div>
							<p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-900/70">Seller onboarding</p>
							<h1 className="mt-6 max-w-md text-4xl font-black leading-tight sm:text-5xl">
								Start with the customer profile.
							</h1>
							<p className="mt-4 max-w-lg text-sm leading-6 text-slate-900/75 sm:text-base">
								Enter the seller user details first, then continue to business and account setup.
							</p>
						</div>
					</aside>

					<section className="p-6 sm:p-8 lg:p-10">
						<div className="mx-auto max-w-2xl">
							<div className="mb-8 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
								<span>Customer data</span>
								<span className="h-px flex-1 bg-white/10" />
								<span>Seller</span>
							</div>

							<div className="mb-8">
								<h2 className="text-3xl font-bold text-white">Create the seller customer record</h2>
								<p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
									We store seller data against the user record first so the account has role, phone, and address information
									before onboarding continues.
								</p>
							</div>

							<div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20 sm:p-8">
								<form onSubmit={handleBasicSubmit} className="space-y-5">
									<div className="grid gap-5 sm:grid-cols-2">
										<label className="block">
											<span className="mb-2 block text-sm font-medium text-slate-200">Full name</span>
											<input
												type="text"
												value={seller.fullName}
												onChange={(event) =>
                           dispatch(updateSeller({ fullName: event.target.value }))}
												placeholder="Enter your name"
												className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
												required
											/>
										</label>

										<label className="block">
											<span className="mb-2 block text-sm font-medium text-slate-200">Email</span>
											<input
												type="email"
												value={seller.email}
												onChange={(event) =>
                           dispatch(updateSeller({ email: event.target.value }))}
												placeholder="you@example.com"
												className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
												required
											/>
										</label>

										<label className="block">
											<span className="mb-2 block text-sm font-medium text-slate-200">Role</span>
											<select
												value={seller.role}
												onChange={(event) =>
                           dispatch(updateSeller({ role: event.target.value }))}
												className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
												required
											>
												<option className="bg-slate-950" value="seller">Seller</option>
												<option className="bg-slate-950" value="customer-seller">Customer seller</option>
											</select>
										</label>
									</div>

									<div className="grid gap-5 sm:grid-cols-2">
										<label className="block">
											<span className="mb-2 block text-sm font-medium text-slate-200">Phone number</span>
											<input
												type="tel"
												value={seller.mobile}
												onChange={(event) =>
                           dispatch(updateSeller({ mobile: event.target.value }))}
												placeholder="+91 98765 43210"
												className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
												required
											/>
										</label>

										<label className="block">
											<span className="mb-2 block text-sm font-medium text-slate-200">Locality</span>
											<input
												type="text"
												value={sellerAddress.locality}
												onChange={(event) =>
                           dispatch(updateSellerAddress({ locality: event.target.value }))}
												placeholder="Local area or sector"
												className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
												required
											/>
										</label>
									</div>

									<div className="grid gap-5 sm:grid-cols-2">
										<label className="block">
											<span className="mb-2 block text-sm font-medium text-slate-200">Pin code</span>
											<input
												type="text"
												inputMode="numeric"
												pattern="[0-9]*"
												value={sellerAddress.pinCode}
												onChange={(event) =>
                           dispatch(updateSellerAddress({ pinCode: event.target.value }))}
												placeholder="400001"
												className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
												required
											/>
										</label>

										<label className="block">
											<span className="mb-2 block text-sm font-medium text-slate-200">State</span>
											<input
												type="text"
												value={sellerAddress.state}
												onChange={(event) =>
                           dispatch(updateSellerAddress({ state: event.target.value }))}
												placeholder="State"
												className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
												required
											/>
										</label>
									</div>

									<label className="block">
										<span className="mb-2 block text-sm font-medium text-slate-200">Address</span>
										<textarea
											value={sellerAddress.address}
											onChange={(event) =>
                           dispatch(updateSellerAddress({ address: event.target.value }))}
											placeholder="Street, city, state, pin code"
											rows={4}
											className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
											required
										/>
									</label>

									<div className="flex flex-col gap-3 sm:flex-row">
										<button
											type="button"
											onClick={() => navigate('/login')}
											className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/5"
										>
											Back to customer login
										</button>
										<button
											type="submit"
											className="flex-1 rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
										>
											Save customer data
										</button>
									</div>
								</form>
							</div>
						</div>
					</section>
				</div>
			</div>
		</div>
	)
}

export default SellerLogin
