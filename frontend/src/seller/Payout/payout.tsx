import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	ArrowForward,
	AccountBalanceWalletOutlined,
	CheckCircleOutline,
	CreditScoreOutlined,
	PaymentsOutlined,
	Search,
	ScheduleOutlined,
} from '@mui/icons-material'
import SellerNavbar from '../Navbar'

type PayoutStatus = 'Scheduled' | 'Processing' | 'Paid' | 'On hold'

type Payout = {
	id: string
	date: string
	amount: string
	status: PayoutStatus
	method: string
	note: string
}

const PAYOUTS: Payout[] = [
	{
		id: 'P-1001',
		date: 'Today',
		amount: '$2,480.00',
		status: 'Processing',
		method: 'Bank Transfer',
		note: 'Pending bank confirmation',
	},
	{
		id: 'P-1002',
		date: 'Yesterday',
		amount: '$1,860.00',
		status: 'Paid',
		method: 'Bank Transfer',
		note: 'Sent to account ending 8821',
	},
	{
		id: 'P-1003',
		date: '2 days ago',
		amount: '$760.00',
		status: 'Scheduled',
		method: 'UPI',
		note: 'Scheduled for Friday morning',
	},
	{
		id: 'P-1004',
		date: '4 days ago',
		amount: '$1,290.00',
		status: 'On hold',
		method: 'Bank Transfer',
		note: 'Verify tax details to release',
	},
]

const FILTERS: Array<'All' | PayoutStatus> = ['All', 'Scheduled', 'Processing', 'Paid', 'On hold']

const statusConfig: Record<PayoutStatus, { label: string; className: string; icon: typeof CheckCircleOutline }> = {
	Scheduled: {
		label: 'Scheduled',
		className: 'bg-sky-50 text-sky-700',
		icon: ScheduleOutlined,
	},
	Processing: {
		label: 'Processing',
		className: 'bg-amber-50 text-amber-700',
		icon: PaymentsOutlined,
	},
	Paid: {
		label: 'Paid',
		className: 'bg-emerald-50 text-emerald-700',
		icon: CheckCircleOutline,
	},
	'On hold': {
		label: 'On hold',
		className: 'bg-rose-50 text-rose-700',
		icon: AccountBalanceWalletOutlined,
	},
}

const SellerPayoutPage = () => {
	const navigate = useNavigate()
	const [search, setSearch] = useState('')
	const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All')

	const metrics = useMemo(
		() => [
			{
				label: 'Available Balance',
				value: '$8,240.00',
				note: 'Ready for next payout cycle',
				icon: AccountBalanceWalletOutlined,
				tone: 'from-emerald-400 to-green-500',
			},
			{
				label: 'Pending Payouts',
				value: '$2,480.00',
				note: 'Under processing right now',
				icon: PaymentsOutlined,
				tone: 'from-amber-400 to-orange-500',
			},
			{
				label: 'Paid This Month',
				value: '$14,920.00',
				note: '4 successful transfers',
				icon: CreditScoreOutlined,
				tone: 'from-cyan-400 to-sky-500',
			},
			{
				label: 'Next Payout',
				value: 'Friday',
				note: 'Estimated release in 2 days',
				icon: ScheduleOutlined,
				tone: 'from-rose-400 to-pink-500',
			},
		],
		[],
	)

	const filteredPayouts = useMemo(() => {
		return PAYOUTS.filter((payout) => {
			const searchText = `${payout.id} ${payout.amount} ${payout.method} ${payout.note}`.toLowerCase()
			const matchesSearch = searchText.includes(search.toLowerCase())
			const matchesFilter = filter === 'All' ? true : payout.status === filter

			return matchesSearch && matchesFilter
		})
	}, [filter, search])

	return (
		<div className="min-h-screen bg-slate-100">
			

			<main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
				<section className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
					<div className="bg-slate-950 px-6 py-8 text-white sm:px-8">
						<div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
							<div className="max-w-2xl">
								<p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
									Seller Payouts
								</p>
								<h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
									Track your earnings and transfers
								</h1>
								<p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
									Review available balance, pending payouts, and your payout history in one clear
									place.
								</p>
							</div>

							<div className="flex flex-wrap gap-3">
								<button
									type="button"
									onClick={() => navigate('/seller/dashboard')}
									className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
								>
									Dashboard
									<ArrowForward fontSize="small" />
								</button>
								<button
									type="button"
									onClick={() => navigate('/seller/products/new')}
									className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
								>
									Request Payout
								</button>
							</div>
						</div>
					</div>

					<div className="grid gap-4 p-6 sm:grid-cols-2 xl:grid-cols-4 sm:p-8">
						{metrics.map((metric) => {
							const Icon = metric.icon

							return (
								<article
									key={metric.label}
									className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm"
								>
									<div className="flex items-start justify-between gap-3">
										<div>
											<p className="text-sm font-medium text-slate-500">{metric.label}</p>
											<p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
												{metric.value}
											</p>
											<p className="mt-2 text-sm text-slate-500">{metric.note}</p>
										</div>
										<span
											className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br ${metric.tone} text-slate-950 shadow-lg`}
										>
											<Icon />
										</span>
									</div>
								</article>
							)
						})}
					</div>

					<div className="grid gap-6 px-6 pb-6 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:pb-8">
						<article className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
							<div className="flex items-center justify-between gap-3">
								<div>
									<h2 className="text-lg font-semibold">Payout Overview</h2>
									<p className="text-sm text-slate-400">This month&apos;s payment flow</p>
								</div>
								<span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-emerald-400">
									Up to date
								</span>
							</div>

							<div className="mt-6 space-y-4">
								<OverviewBar label="Released" value="74%" />
								<OverviewBar label="Pending review" value="18%" />
								<OverviewBar label="On hold" value="8%" />
							</div>

							<div className="mt-6 rounded-2xl bg-white/5 p-4">
								<p className="text-sm font-medium text-slate-200">Next payout window</p>
								<p className="mt-2 text-sm leading-6 text-slate-400">
									Your next transfer is scheduled for Friday morning after the settlement cycle is
									complete.
								</p>
							</div>
						</article>

						<article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
							<div className="flex items-center justify-between gap-3">
								<div>
									<h2 className="text-lg font-semibold text-slate-900">Payout Actions</h2>
									<p className="text-sm text-slate-500">Common money management actions.</p>
								</div>
							</div>

							<div className="mt-5 space-y-3">
								<button
									type="button"
									className="flex w-full items-center justify-between rounded-2xl bg-slate-950 px-4 py-4 text-left text-white transition hover:bg-slate-800"
								>
									<span>
										<span className="block font-semibold">Withdraw balance</span>
										<span className="block text-sm text-slate-300">Transfer available funds</span>
									</span>
									<PaymentsOutlined />
								</button>

								<button
									type="button"
									className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-left transition hover:bg-slate-100"
									onClick={() => navigate('/seller/orders')}
								>
									<span>
										<span className="block font-semibold text-slate-900">Review related orders</span>
										<span className="block text-sm text-slate-500">Check payout-linked orders</span>
									</span>
									<ArrowForward className="text-slate-600" />
								</button>
							</div>

							<div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
								<p className="text-sm font-semibold text-slate-900">Bank details</p>
								<p className="mt-2 text-sm text-slate-500">Bank ending 8821</p>
								<p className="mt-1 text-sm text-slate-500">IFSC: HDFC0001234</p>
							</div>
						</article>

						<article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
							<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
								<div>
									<h2 className="text-lg font-semibold text-slate-900">Payout History</h2>
									<p className="text-sm text-slate-500">Search and filter payment transfers.</p>
								</div>

								<div className="flex flex-1 flex-col gap-3 lg:max-w-3xl lg:flex-row lg:items-center lg:justify-end">
									<div className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm">
										<Search className="text-slate-400" />
										<input
											type="search"
											value={search}
											onChange={(event) => setSearch(event.target.value)}
											placeholder="Search payout id, amount, or method"
											className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
										/>
									</div>

									<div className="flex flex-wrap gap-2">
										{FILTERS.map((item) => (
											<button
												key={item}
												type="button"
												onClick={() => setFilter(item)}
												className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
													filter === item
														? 'bg-slate-950 text-white shadow-sm'
														: 'bg-slate-100 text-slate-600 hover:bg-slate-200'
												}`}
											>
												{item}
											</button>
										))}
									</div>
								</div>
							</div>

							<div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
								<div className="hidden grid-cols-[0.8fr_0.9fr_1fr_0.8fr_1fr_1.2fr] border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 lg:grid">
									<span>ID</span>
									<span>Date</span>
									<span>Method</span>
									<span>Amount</span>
									<span>Status</span>
									<span className="text-right">Notes</span>
								</div>

								<div className="divide-y divide-slate-200">
									{filteredPayouts.length ? (
										filteredPayouts.map((payout) => {
											const StatusIcon = statusConfig[payout.status].icon

											return (
												<article
													key={payout.id}
													className="grid gap-4 px-5 py-5 lg:grid-cols-[0.8fr_0.9fr_1fr_0.8fr_1fr_1.2fr] lg:items-center"
												>
													<div className="flex items-center justify-between gap-3 lg:block">
														<div>
															<p className="text-xs font-semibold uppercase tracking-wide text-slate-400 lg:hidden">
																ID
															</p>
															<p className="font-semibold text-slate-900">{payout.id}</p>
														</div>
													</div>

													<div className="flex items-center justify-between gap-3 lg:block">
														<div>
															<p className="text-xs font-semibold uppercase tracking-wide text-slate-400 lg:hidden">
																Date
															</p>
															<p className="font-medium text-slate-700">{payout.date}</p>
														</div>
													</div>

													<div className="flex items-center justify-between gap-3 lg:block">
														<div>
															<p className="text-xs font-semibold uppercase tracking-wide text-slate-400 lg:hidden">
																Method
															</p>
															<p className="font-medium text-slate-700">{payout.method}</p>
														</div>
													</div>

													<div className="flex items-center justify-between gap-3 lg:block">
														<div>
															<p className="text-xs font-semibold uppercase tracking-wide text-slate-400 lg:hidden">
																Amount
															</p>
															<p className="font-semibold text-slate-900">{payout.amount}</p>
														</div>
													</div>

													<div className="flex items-center justify-between gap-3 lg:block">
														<div>
															<p className="text-xs font-semibold uppercase tracking-wide text-slate-400 lg:hidden">
																Status
															</p>
															<span
																className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${statusConfig[payout.status].className}`}
															>
																<StatusIcon fontSize="small" />
																{statusConfig[payout.status].label}
															</span>
														</div>
													</div>

													<div className="flex items-center justify-between gap-3 lg:block lg:text-right">
														<div>
															<p className="text-xs font-semibold uppercase tracking-wide text-slate-400 lg:hidden">
																Notes
															</p>
															<p className="text-sm text-slate-500">{payout.note}</p>
														</div>
													</div>
												</article>
											)
										})
									) : (
										<div className="px-5 py-16 text-center">
											<p className="text-lg font-semibold text-slate-900">No payouts found</p>
											<p className="mt-2 text-sm text-slate-500">
												Try a different search term or switch to another payout status.
											</p>
										</div>
									)}
								</div>
							</div>
						</article>
					</div>
				</section>
			</main>
		</div>
	)
}

const OverviewBar = ({ label, value }: { label: string; value: string }) => {
	return (
		<div>
			<div className="mb-2 flex items-center justify-between text-sm">
				<span className="text-slate-300">{label}</span>
				<span className="font-semibold text-white">{value}</span>
			</div>
			<div className="h-2 rounded-full bg-white/10">
				<div
					className="h-full rounded-full bg-linear-to-r from-emerald-400 to-cyan-400"
					style={{ width: value }}
				/>
			</div>
		</div>
	)
}

export default SellerPayoutPage
