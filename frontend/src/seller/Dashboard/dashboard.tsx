import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	Add,
	ArrowForward,
	AttachMoney,
	Inventory2Outlined,
	LocalShipping,
	ShoppingBagOutlined,
	TrendingUp,
} from '@mui/icons-material'


type Metric = {
	label: string
	value: string
	change: string
	icon: typeof AttachMoney
	tone: string
}

type Activity = {
	title: string
	detail: string
	time: string
}

const metrics: Metric[] = [
	{
		label: 'Total Revenue',
		value: '$24,980',
		change: '+12.4% from last week',
		icon: AttachMoney,
		tone: 'from-emerald-400 to-green-500',
	},
	{
		label: 'Orders',
		value: '1,284',
		change: '+8.1% from last week',
		icon: ShoppingBagOutlined,
		tone: 'from-cyan-400 to-sky-500',
	},
	{
		label: 'Products Live',
		value: '146',
		change: '18 pending review',
		icon: Inventory2Outlined,
		tone: 'from-amber-400 to-orange-500',
	},
	{
		label: 'Shipped Today',
		value: '92',
		change: '24 waiting dispatch',
		icon: LocalShipping,
		tone: 'from-rose-400 to-pink-500',
	},
]

const activityFeed: Activity[] = [
	{
		title: 'New order received',
		detail: 'Wireless Headphones Pro was purchased by a customer in Kolkata.',
		time: '12 min ago',
	},
	{
		title: 'Inventory updated',
		detail: 'Premium Cotton Shirt stock was refreshed to 8 units.',
		time: '44 min ago',
	},
	{
		title: 'Listing approved',
		detail: 'Smart LED Desk Lamp is now visible in the storefront.',
		time: '2 hours ago',
	},
]

const salesBars = [78, 52, 88, 64, 92, 69, 84]

const Dashboard = () => {
	const navigate = useNavigate()

	const topProducts = useMemo(
		() => [
			{
				name: 'Wireless Headphones Pro',
				sales: '188 sales',
				revenue: '$24,144',
			},
			{
				name: 'Premium Cotton Shirt',
				sales: '96 sales',
				revenue: '$3,744',
			},
			{
				name: 'Running Shoes X1',
				sales: '74 sales',
				revenue: '$6,586',
			},
		],
		[],
	)

	return (
		<div className="min-h-screen bg-slate-100">
			

			<main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
				<section className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
					<div className="bg-slate-950 px-6 py-8 text-white sm:px-8">
						<div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
							<div className="max-w-2xl">
								<p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
									Seller Dashboard
								</p>
								<h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
									Your store performance at a glance
								</h1>
								<p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
									Monitor revenue, orders, stock health, and recent store activity from one polished
									dashboard.
								</p>
							</div>

							<div className="flex flex-wrap gap-3">
								<button
									type="button"
									onClick={() => navigate('/seller/products')}
									className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
								>
									View Products
									<ArrowForward fontSize="small" />
								</button>
								<button
									type="button"
									onClick={() => navigate('/seller/products/new')}
									className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
								>
									<Add />
									Add Product
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
											<p className="mt-2 text-sm text-slate-500">{metric.change}</p>
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

					<div className="grid gap-6 px-6 pb-6 sm:px-8 lg:grid-cols-[1.3fr_0.7fr] lg:pb-8">
						<article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
							<div className="flex items-center justify-between gap-3">
								<div>
									<h2 className="text-lg font-semibold text-slate-900">Weekly Sales</h2>
									<p className="text-sm text-slate-500">A simple view of daily performance.</p>
								</div>
								<span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
									+12.4% growth
								</span>
							</div>

							<div className="mt-6 flex h-72 items-end gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
								{salesBars.map((height, index) => (
									<div key={index} className="flex flex-1 flex-col items-center gap-3">
										<div
											className="w-full max-w-14 rounded-t-2xl bg-linear-to-t from-slate-950 to-emerald-500 shadow-lg shadow-emerald-500/20"
											style={{ height: `${height}%` }}
										/>
										<span className="text-xs font-medium text-slate-500">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}</span>
									</div>
								))}
							</div>
						</article>

						<article className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
							<div className="flex items-center justify-between gap-3">
								<div>
									<h2 className="text-lg font-semibold">Current Status</h2>
									<p className="text-sm text-slate-400">Daily store operations</p>
								</div>
								<span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-emerald-400">
									<TrendingUp />
								</span>
							</div>

							<div className="mt-6 space-y-4">
								<StatusRow label="Orders packed" value="72%" />
								<StatusRow label="Responses sent" value="94%" />
								<StatusRow label="Stock accuracy" value="88%" />
							</div>

							<div className="mt-6 rounded-2xl bg-white/5 p-4">
								<p className="text-sm font-medium text-slate-200">Today&apos;s focus</p>
								<p className="mt-2 text-sm leading-6 text-slate-400">
									Ship pending orders, update low stock items, and review new product listings before
									the end of the day.
								</p>
							</div>
						</article>

						<article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
							<div className="flex items-center justify-between gap-3">
								<div>
									<h2 className="text-lg font-semibold text-slate-900">Top Products</h2>
									<p className="text-sm text-slate-500">Best performing listings this week.</p>
								</div>
								<button
									type="button"
									onClick={() => navigate('/seller/products')}
									className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
								>
									See all
								</button>
							</div>

							<div className="mt-5 grid gap-4 md:grid-cols-3">
								{topProducts.map((product) => (
									<div
										key={product.name}
										className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
									>
										<div className="flex items-start justify-between gap-3">
											<div>
												<h3 className="font-semibold text-slate-900">{product.name}</h3>
												<p className="mt-1 text-sm text-slate-500">{product.sales}</p>
											</div>
											<span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
												{product.revenue}
											</span>
										</div>
									</div>
								))}
							</div>
						</article>
					</div>

					<div className="grid gap-6 px-6 pb-6 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:pb-8">
						<article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
							<h2 className="text-lg font-semibold text-slate-900">Quick Actions</h2>
							<p className="mt-1 text-sm text-slate-500">Move faster with common seller tasks.</p>

							<div className="mt-5 space-y-3">
								<button
									type="button"
									onClick={() => navigate('/seller/products/new')}
									className="flex w-full items-center justify-between rounded-2xl bg-slate-950 px-4 py-4 text-left text-white transition hover:bg-slate-800"
								>
									<span>
										<span className="block font-semibold">Add new product</span>
										<span className="block text-sm text-slate-300">Create a fresh listing</span>
									</span>
									<Add />
								</button>

								<button
									type="button"
									onClick={() => navigate('/seller/orders')}
									className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-left transition hover:bg-slate-100"
								>
									<span>
										<span className="block font-semibold text-slate-900">Review orders</span>
										<span className="block text-sm text-slate-500">Check pending shipments</span>
									</span>
									<ArrowForward className="text-slate-600" />
								</button>
							</div>
						</article>

						<article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
							<div className="flex items-center justify-between gap-3">
								<div>
									<h2 className="text-lg font-semibold text-slate-900">Recent Activity</h2>
									<p className="text-sm text-slate-500">Latest seller events from your store.</p>
								</div>
							</div>

							<div className="mt-5 space-y-4">
								{activityFeed.map((activity) => (
									<div
										key={activity.title}
										className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
									>
										<div className="flex items-start justify-between gap-4">
											<div>
												<h3 className="font-semibold text-slate-900">{activity.title}</h3>
												<p className="mt-1 text-sm leading-6 text-slate-500">{activity.detail}</p>
											</div>
											<span className="shrink-0 text-xs font-medium text-slate-400">{activity.time}</span>
										</div>
									</div>
								))}
							</div>
						</article>
					</div>
				</section>
			</main>
		</div>
	)
}

const StatusRow = ({ label, value }: { label: string; value: string }) => {
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

export default Dashboard
