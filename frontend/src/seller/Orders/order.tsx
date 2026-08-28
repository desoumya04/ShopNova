import { useEffect, useMemo, useState } from 'react'
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

import { api } from '../../config/api'




type OrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'RETURNED'

interface OrderItem {
	id: string
	productName?: string
	quantity: number
	price: number
	product?: {
		id: string
		name: string
		images: { url: string }[]
		seller?: { business?: { name: string } }
		variants?: unknown[]
	}
}

interface Order {
	id: string
	status: OrderStatus
	totalPrice: number
	finalPrice: number
	paymentStatus: string
	shippingAddress: string
	shippingCity: string
	createdAt: string
	user?: { name: string }
	items: OrderItem[]
}


const FILTERS: Array<'All' | OrderStatus> = [
	'All',
	'PENDING',
	'CONFIRMED',
	'SHIPPED',
	'DELIVERED',
	'CANCELLED',
	'RETURNED',
]

const statusConfig: Record<
	OrderStatus,
	{ label: string; className: string; icon: typeof CheckCircleOutline }
> = {
	PENDING: {
		label: 'Pending',
		className: 'bg-amber-50 text-amber-700',
		icon: NotificationsActiveOutlined,
	},
	CONFIRMED: {
		label: 'Confirmed',
		className: 'bg-cyan-50 text-cyan-700',
		icon: ShoppingBagOutlined,
	},
	SHIPPED: {
		label: 'Shipped',
		className: 'bg-sky-50 text-sky-700',
		icon: LocalShippingOutlined,
	},
	DELIVERED: {
		label: 'Delivered',
		className: 'bg-emerald-50 text-emerald-700',
		icon: CheckCircleOutline,
	},
	CANCELLED: {
		label: 'Cancelled',
		className: 'bg-rose-50 text-rose-700',
		icon: TaskAltOutlined,
	},
	RETURNED: {
		label: 'Returned',
		className: 'bg-purple-50 text-purple-700',
		icon: TaskAltOutlined,
	},
}

const SellerOrderPage = () => {
	
	const navigate = useNavigate()
	const [search, setSearch] = useState('')
	const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All')
	const [orders, setOrders] = useState<Order[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const res = await api.get('/fetchSellerSuccessOrder')
				setOrders(res.data?.data ?? [])
			} catch (err) {
				console.error('Failed to fetch seller orders:', err)
			} finally {
				setLoading(false)
			}
		}
		fetchOrders()
	}, [])

	const filteredOrders = useMemo(() => {
		return orders.filter((order) => {
			const searchText = `${order.id} ${order.shippingAddress} ${order.items[0]?.product?.name}`.toLowerCase()
			const matchesSearch = searchText.includes(search.toLowerCase())
			const matchesFilter = filter === 'All' ? true : order.status === filter

			return matchesSearch && matchesFilter
		})
	}, [filter, search, orders])
	console.log("Order length:",filteredOrders)
	const metrics = useMemo(
		() => [
			{
				label: 'Total Orders',
				value: orders.length,
				note: '+14 this week',
				icon: ShoppingBagOutlined,
				accent: 'from-cyan-400 to-sky-500',
			},
			{
				label: 'Pending',
				value: orders.filter((order) => order.status === 'PENDING').length,
				note: 'Needs attention',
				icon: NotificationsActiveOutlined,
				accent: 'from-amber-400 to-orange-500',
			},
			{
				label: 'Shipped',
				value: orders.filter((order) => order.status === 'SHIPPED').length,
				note: 'Out for delivery',
				icon: LocalShippingOutlined,
				accent: 'from-sky-400 to-cyan-500',
			},
			{
				label: 'Delivered',
				value: orders.filter((order) => order.status === 'DELIVERED').length,
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
														<p className="mt-1 text-sm text-slate-500">{order.createdAt}</p>
													</div>
												</div>

												<div className="flex items-center justify-between gap-3 lg:block">
													<div>
														<p className="text-xs font-semibold uppercase tracking-wide text-slate-400 lg:hidden">
															Customer
														</p>
														<p className="font-medium text-slate-900">{order.user?.name ?? '—'}</p>
														<p className="mt-1 text-sm text-slate-500">{order.shippingCity}</p>
													</div>
												</div>

												<div className="flex items-center justify-between gap-3 lg:block">
										<div className="flex items-center gap-3">
											{order.items[0]?.product?.images?.[0]?.url ? (
												<img
													src={order.items[0].product.images[0].url}
													alt={order.items[0]?.product?.name ?? 'Product'}
													className="h-10 w-10 rounded-lg object-cover border border-slate-200 flex-shrink-0"
												/>
											) : (
												<div className="h-10 w-10 rounded-lg bg-slate-100 border border-slate-200 flex-shrink-0 flex items-center justify-center">
													<span className="text-slate-400 text-xs">N/A</span>
												</div>
											)}
											<div>
												<p className="text-xs font-semibold uppercase tracking-wide text-slate-400 lg:hidden">
													Product
												</p>
												<p className="font-medium text-slate-700 text-sm leading-tight">
													{order.items[0]?.product?.name ?? order.items[0]?.productName ?? '—'}
												</p>
												{order.items.length > 1 && (
													<p className="text-xs text-slate-400 mt-0.5">+{order.items.length - 1} more</p>
												)}
											</div>
										</div>
									</div>

												<div className="flex items-center justify-between gap-3 lg:block">
													<div>
														<p className="text-xs font-semibold uppercase tracking-wide text-slate-400 lg:hidden">
															Items
														</p>
														<p className="font-medium text-slate-700">{order.items.length}</p>
													</div>
												</div>

												<div className="flex items-center justify-between gap-3 lg:block">
													<div>
														<p className="text-xs font-semibold uppercase tracking-wide text-slate-400 lg:hidden">
															Amount
														</p>
														<p className="font-semibold text-slate-900">₹{Number(order.finalPrice).toFixed(2)}</p>
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
										<p className="text-lg font-semibold text-slate-900">
											{loading ? 'Loading orders…' : 'No orders found'}
										</p>
										{!loading && (
											<p className="mt-2 text-sm text-slate-500">
												Try a different search term or switch to another order status.
											</p>
										)}
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
