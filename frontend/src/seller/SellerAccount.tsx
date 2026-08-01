import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../Redux_toolkit/store'
import { sellerDetails, updateBank ,resetSeller} from '../Redux_toolkit/seller/seller'




const SellerAccount = () => {
	const navigate = useNavigate()
	
	const dispatch = useAppDispatch()
	const bank  = useAppSelector((state) => state.seller.bank)

	const sellerData = useAppSelector((state) => state.seller)

const handleAccountSubmit = async (
  event: FormEvent<HTMLFormElement>
) => {
  event.preventDefault();

  console.log("Submitting:", sellerData);

  try {
    await dispatch(sellerDetails(sellerData)).unwrap();

    dispatch(resetSeller());

    navigate("/seller", { replace: true });
  } catch (error) {
    console.error(error);
  }
};

	return (
		<div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.22),transparent_35%),linear-gradient(180deg,#020617_0%,#0f172a_55%,#111827_100%)] px-4 py-8 text-white sm:px-6 lg:px-8">
			<div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
				<div className="grid w-full overflow-hidden rounded-4xl border border-white/10 bg-white/5 shadow-2xl shadow-black/30 backdrop-blur lg:grid-cols-[0.95fr_1.05fr]">
					<aside className="flex flex-col justify-between bg-linear-to-br from-emerald-400 via-cyan-400 to-sky-500 p-8 text-slate-950 sm:p-10">
						<div>
							<p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-900/70">Seller onboarding</p>
							<h1 className="mt-6 max-w-md text-4xl font-black leading-tight sm:text-5xl">
								Finish with account details.
							</h1>
							<p className="mt-4 max-w-lg text-sm leading-6 text-slate-900/75 sm:text-base">
								Add the payout account so seller settlements can be routed correctly.
							</p>
						</div>
					</aside>

					<section className="p-6 sm:p-8 lg:p-10">
						<div className="mx-auto max-w-2xl">
							<div className="mb-8 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
								<span>Account details</span>
								<span className="h-px flex-1 bg-white/10" />
								<span>Seller</span>
							</div>

							<div className="mb-8">
								<h2 className="text-3xl font-bold text-white">Create the account profile</h2>
								<p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
									Enter the bank or payout account that should receive seller settlements.
								</p>
							</div>

							<div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20 sm:p-8">
								<form onSubmit={handleAccountSubmit} className="space-y-5">
									<div className="grid gap-5 sm:grid-cols-2">
										<label className="block">
											<span className="mb-2 block text-sm font-medium text-slate-200">Account holder name</span>
											<input
												type="text"
												value={bank.accountHolder}
												onChange={(event) => dispatch(updateBank({ accountHolder: event.target.value }))}
												placeholder="Account holder name"
												className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
												required
											/>
										</label>

										<label className="block">
											<span className="mb-2 block text-sm font-medium text-slate-200">Bank name</span>
											<input
												type="text"
												value={bank.bankName}
												onChange={(event) => dispatch(updateBank({ bankName: event.target.value }))}
												placeholder="Bank name"
												className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
												required
											/>
										</label>
									</div>

									<div className="grid gap-5 sm:grid-cols-2">
										<label className="block">
											<span className="mb-2 block text-sm font-medium text-slate-200">Account number</span>
											<input
												type="text"
												value={bank.accountNumber}
												onChange={(event) => dispatch(updateBank({ accountNumber: event.target.value }))}
												placeholder="123456789012"
												className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
												required
											/>
										</label>

										<label className="block">
											<span className="mb-2 block text-sm font-medium text-slate-200">IFSC code</span>
											<input
												type="text"
												value={bank.ifsc}
												onChange={(event) => dispatch(updateBank({ ifsc: event.target.value }))}
												placeholder="ABCD0123456"
												className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
												required
											/>
										</label>
									</div>

									<div className="flex flex-col gap-3 sm:flex-row">
										<button
											type="button"
											onClick={() => navigate('/seller/onboarding/business')}
											className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/5"
										>
											Back
										</button>
										<button
											type="submit"
											onClick={async (event) => {
												event.preventDefault();
												dispatch(sellerDetails(sellerData));
											}}
											className="flex-1 rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
										>
											Complete onboarding
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

export default SellerAccount