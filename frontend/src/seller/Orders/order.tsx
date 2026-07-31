import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	ArrowForward,
	CheckCircleOutline,
	LocalShippingOutlined,
	NotificationsActiveOutlined,
	Search,
	ShoppingBagOutlined,
	TaskAltOutlined,
} from '@mui/icons-material'
import SellerNavbar from '../Navbar'

type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'

type Order = {
	id: string
	customer: string
	product: string
	amount: string
	date: string
	status: OrderStatus
	items: number
	payment: 'Paid' | 'COD'
}

const ORDERS: Order[] = [
	{
		id: 'ORD-1001',
		customer: 'Aarav Roy',
		product: 'Wireless Headphones Pro',
		amount: '$129.00',
		date: 'Today, 10:45 AM',
		status: 'Processing',
		items: 1,
		payment: 'Paid',
	},
	{
		id: 'ORD-1002',
		customer: 'Meera Das',
		product: 'Premium Cotton Shirt',
		amount: '$78.00',
		date: 'Today, 09:15 AM',
		status: 'Pending',
		items: 2,
		payment: 'COD',
	},
	{
		id: 'ORD-1003',
		customer: 'Kabir Ahmed',
		product: 'Smart LED Desk Lamp',
		amount: '$54.00',
		date: 'Yesterday',
		status: 'Shipped',
		items: 1,
		payment: 'Paid',
	},
	{
		id: 'ORD-1004',
		customer: 'Sana Khan',
		product: 'Running Shoes X1',
		amount: '$178.00',
		date: 'Yesterday',
		status: 'Delivered',
		items: 2,
		payment: 'Paid',
	},
	{
		id: 'ORD-1005',
		customer: 'Rohit Sen',
		product: 'Bluetooth Speaker Max',
		amount: '$89.00',
		date: '2 days ago',
		status: 'Cancelled',
		items: 1,
		payment: 'COD',
	},
]

const FILTERS: Array<'All' | OrderStatus> = [
	'All',
	'Pending',
	'Processing',
	'Shipped',
	'Delivered',
	'Cancelled',
]

const statusConfig: Record<
	OrderStatus,
	{ label: string; className: string; icon: typeof CheckCircleOutline }
> = {
	Pending: {
		label: 'Pending',
		className: 'bg-amber-50 text-amber-700',
		icon: NotificationsActiveOutlined,
	},
	Processing: {
		label: 'Processing',
		className: 'bg-cyan-50 text-cyan-700',
		icon: ShoppingBagOutlined,
	},
	Shipped: {
		label: 'Shipped',
		className: 'bg-sky-50 text-sky-700',
		icon: LocalShippingOutlined,
	},
	Delivered: {
		label: 'Delivered',
		className: 'bg-emerald-50 text-emerald-700',
		icon: CheckCircleOutline,
	},
	Cancelled: {
		label: 'Cancelled',
		className: 'bg-rose-50 text-rose-700',
		icon: TaskAltOutlined,
	},
}

const SellerOrderPage = () => {
	const navigate = useNavigate()
	const [search, setSearch] = useState('')
	const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All')

	const filteredOrders = useMemo(() => {
		return ORDERS.filter((order) => {
			const searchText = `${order.id} ${order.customer} ${order.product}`.toLowerCase()
			const matchesSearch = searchText.includes(search.toLowerCase())
			const matchesFilter = filter === 'All' ? true : order.status === filter

			return matchesSearch && matchesFilter
		})
	}, [filter, search])

	const metrics = useMemo(
		() => [
			{
				label: 'Total Orders',
				value: ORDERS.length,
				note: '+14 this week',
				icon: ShoppingBagOutlined,
				accent: 'from-cyan-400 to-sky-500',
			},
			{
				label: 'Pending',
				value: ORDERS.filter((order) => order.status === 'Pending').length,
				note: 'Needs attention',
				icon: NotificationsActiveOutlined,
				accent: 'from-amber-400 to-orange-500',
			},
			{
				label: 'Shipped',
				value: ORDERS.filter((order) => order.status === 'Shipped').length,
				note: 'Out for delivery',
				icon: LocalShippingOutlined,
				accent: 'from-sky-400 to-cyan-500',
			},
			{
				label: 'Delivered',
				value: ORDERS.filter((order) => order.status === 'Delivered').length,
				note: 'Completed orders',
				icon: CheckCircleOutline,
				accent: 'from-emerald-400 to-green-500',
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
									Seller Orders
								</p>
								<h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
									Track every order in one place
								</h1>
								<p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
									View order status, search customers, and quickly manage shipping updates from a
									clean seller order dashboard.
								</p>
							</div>

							<button
								type="button"
								onClick={() => navigate('/seller/dashboard')}
								className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
							>
								Dashboard
								<ArrowForward fontSize="small" />
							</button>
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
											className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br ${metric.accent} text-slate-950 shadow-lg`}
										>
											<Icon />
										</span>
									</div>
								</article>
							)
						})}
					</div>

					<div className="border-t border-slate-200 bg-slate-50 px-6 py-5 sm:px-8">
						<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
							<div className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
								<Search className="text-slate-400" />
								<input
									type="search"
									value={search}
									onChange={(event) => setSearch(event.target.value)}
									placeholder="Search orders, customers, or order IDs"
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
												: 'bg-white text-slate-600 hover:bg-slate-100'
										}`}
									>
										{item}
									</button>
								))}
							</div>
						</div>
					</div>

					<div className="p-6 sm:p-8">
						<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
							<div className="hidden grid-cols-[1fr_1.2fr_1fr_0.7fr_0.8fr_0.8fr_0.8fr] border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 lg:grid">
								<span>Order</span>
								<span>Customer</span>
								<span>Product</span>
								<span>Items</span>
								<span>Amount</span>
								<span>Status</span>
								<span className="text-right">Actions</span>
							</div>

							<div className="divide-y divide-slate-200">
								{filteredOrders.length ? (
									filteredOrders.map((order) => {
										const StatusIcon = statusConfig[order.status].icon

										return (
											<article
												key={order.id}
												className="grid gap-4 px-5 py-5 lg:grid-cols-[1fr_1.2fr_1fr_0.7fr_0.8fr_0.8fr_0.8fr] lg:items-center"
											>
												<div className="flex items-center justify-between gap-3 lg:block">
													<div>
														<p className="text-xs font-semibold uppercase tracking-wide text-slate-400 lg:hidden">
															Order
														</p>
														<p className="font-semibold text-slate-900">{order.id}</p>
														<p className="mt-1 text-sm text-slate-500">{order.date}</p>
													</div>
												</div>

												<div className="flex items-center justify-between gap-3 lg:block">
													<div>
														<p className="text-xs font-semibold uppercase tracking-wide text-slate-400 lg:hidden">
															Customer
														</p>
														<p className="font-medium text-slate-900">{order.customer}</p>
														<p className="mt-1 text-sm text-slate-500">{order.payment}</p>
													</div>
												</div>

												<div className="flex items-center justify-between gap-3 lg:block">
													<div>
														<p className="text-xs font-semibold uppercase tracking-wide text-slate-400 lg:hidden">
															Product
														</p>
														<p className="font-medium text-slate-700">{order.product}</p>
													</div>
												</div>

												<div className="flex items-center justify-between gap-3 lg:block">
													<div>
														<p className="text-xs font-semibold uppercase tracking-wide text-slate-400 lg:hidden">
															Items
														</p>
														<p className="font-medium text-slate-700">{order.items}</p>
													</div>
												</div>

												<div className="flex items-center justify-between gap-3 lg:block">
													<div>
														<p className="text-xs font-semibold uppercase tracking-wide text-slate-400 lg:hidden">
															Amount
														</p>
														<p className="font-semibold text-slate-900">{order.amount}</p>
													</div>
												</div>

												<div className="flex items-center justify-between gap-3 lg:block">
													<div>
														<p className="text-xs font-semibold uppercase tracking-wide text-slate-400 lg:hidden">
															Status
														</p>
														<span
															className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${statusConfig[order.status].className}`}
														>
															<StatusIcon fontSize="small" />
															{statusConfig[order.status].label}
														</span>
													</div>
												</div>

												<div className="flex items-center justify-end gap-2 lg:justify-end">
													<button
														type="button"
														className="rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
													>
														View
													</button>
													<button
														type="button"
														className="rounded-full bg-slate-950 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
													>
														Update
													</button>
												</div>
											</article>
										)
									})
								) : (
									<div className="px-5 py-16 text-center">
										<p className="text-lg font-semibold text-slate-900">No orders found</p>
										<p className="mt-2 text-sm text-slate-500">
											Try a different search term or switch to another order status.
										</p>
									</div>
								)}
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	)
}

export default SellerOrderPage
