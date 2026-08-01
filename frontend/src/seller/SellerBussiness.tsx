import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../Redux_toolkit/store'
import { updateBusiness ,updateBusinessAddress} from '../Redux_toolkit/seller/seller'



const SellerBussiness = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const business = useAppSelector(
		(state) => state.seller.business
	)
	const businessAddress = useAppSelector(
		(state) => state.seller.businessAddress
	)
	
	console.log("business:", business)
	console.log("businessAddress:", businessAddress)
	const handleBusinessSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		
		navigate('/seller/onboarding/account')
	}

	return (
		<div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.22),transparent_35%),linear-gradient(180deg,#020617_0%,#0f172a_55%,#111827_100%)] px-4 py-8 text-white sm:px-6 lg:px-8">
			<div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
				<div className="grid w-full overflow-hidden rounded-4xl border border-white/10 bg-white/5 shadow-2xl shadow-black/30 backdrop-blur lg:grid-cols-[0.95fr_1.05fr]">
					<aside className="flex flex-col justify-between bg-linear-to-br from-emerald-400 via-cyan-400 to-sky-500 p-8 text-slate-950 sm:p-10">
						<div>
							<p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-900/70">Seller onboarding</p>
							<h1 className="mt-6 max-w-md text-4xl font-black leading-tight sm:text-5xl">
								Add your business details.
							</h1>
							<p className="mt-4 max-w-lg text-sm leading-6 text-slate-900/75 sm:text-base">
								Capture store identity, category, and tax information before moving to account setup.
							</p>
						</div>
					</aside>

					<section className="p-6 sm:p-8 lg:p-10">
						<div className="mx-auto max-w-2xl">
							<div className="mb-8 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
								<span>Business details</span>
								<span className="h-px flex-1 bg-white/10" />
								<span>Seller</span>
							</div>

							<div className="mb-8">
								<h2 className="text-3xl font-bold text-white">Create the business profile</h2>
								<p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
									Use this step for store identity, category, and tax details.
								</p>
							</div>

							<div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20 sm:p-8">
								<form onSubmit={handleBusinessSubmit} className="space-y-5">
									<div className="grid gap-5 sm:grid-cols-2">
										<label className="block">
											<span className="mb-2 block text-sm font-medium text-slate-200">Store name</span>
											<input
												type="text"
												value={business.storeName}
												onChange={(event) => dispatch(updateBusiness({ storeName: event.target.value }))}
												placeholder="Nova Traders"
												className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
												required
											/>
										</label>

										<label className="block">
											<span className="mb-2 block text-sm font-medium text-slate-200">Store category</span>
											<input
												type="text"
												value={business.storeCategory}
												onChange={(event) => dispatch(updateBusiness({ storeCategory: event.target.value }))}
												placeholder="Electronics, fashion, grocery"
												className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
												required
											/>
										</label>
									</div>

									<div className="grid gap-5 sm:grid-cols-2">
										<label className="block">
											<span className="mb-2 block text-sm font-medium text-slate-200">Business email</span>
											<input
												type="email"
												value={business.businessEmail}
												onChange={(event) => dispatch(updateBusiness({ businessEmail: event.target.value }))}
												placeholder="business@example.com"
												className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
												required
											/>
										</label>

										<label className="block">
											<span className="mb-2 block text-sm font-medium text-slate-200">Business mobile</span>
											<input
												type="tel"
												value={business.businessMobile}
												onChange={(event) => dispatch(updateBusiness({ businessMobile: event.target.value }))}
												placeholder="+91 98765 43210"
												className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
												required
											/>
										</label>
									</div>

									<div className="grid gap-5 sm:grid-cols-2">
										<label className="block">
											<span className="mb-2 block text-sm font-medium text-slate-200">Locality</span>
											<input
												type="text"
												value={businessAddress.locality}
												onChange={(event) => dispatch(updateBusinessAddress({ locality: event.target.value }))}
												placeholder="Local area or sector"
												className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
												required
											/>
										</label>

										<label className="block">
											<span className="mb-2 block text-sm font-medium text-slate-200">Pin code</span>
											<input
												type="text"
												inputMode="numeric"
												pattern="[0-9]*"
												value={businessAddress.pinCode}
												onChange={(event) => dispatch(updateBusinessAddress({ pinCode: event.target.value }))}
												placeholder="400001"
												className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
												required
											/>
										</label>
									</div>

									<div className="grid gap-5 sm:grid-cols-2">
										<label className="block">
											<span className="mb-2 block text-sm font-medium text-slate-200">State</span>
											<input
												type="text"
												value={businessAddress.state}
												onChange={(event) => dispatch(updateBusinessAddress({ state: event.target.value }))}
												placeholder="State"
												className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
												required
											/>
										</label>
									</div>

									<label className="block">
										<span className="mb-2 block text-sm font-medium text-slate-200">Address</span>
										<textarea
											value={businessAddress.address}
											onChange={(event) => dispatch(updateBusinessAddress({ address: event.target.value }))}
											placeholder="Street, city, state, pin code"
											rows={4}
											className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
											required
										/>
									</label>

									<div className="flex flex-col gap-3 sm:flex-row">
										<button
											type="button"
											onClick={() => navigate('/seller/login')}
											className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/5"
										>
											Back
										</button>
										<button
											type="submit"
											className="flex-1 rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
										>
											Save business details
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

export default SellerBussiness