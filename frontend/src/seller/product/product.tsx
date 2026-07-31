import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	Add,
	DeleteOutline,
	EditOutlined,
	Inventory2Outlined,
	LocalOfferOutlined,
	Search,
	VisibilityOutlined,
} from '@mui/icons-material'
import SellerNavbar from '../Navbar'

type ProductStatus = 'Active' | 'Draft' | 'Low stock'

type Product = {
	id: number
	name: string
	category: string
	price: string
	stock: number
	status: ProductStatus
	image: string
	updatedAt: string
}

const PRODUCTS: Product[] = [
	{
		id: 1,
		name: 'Wireless Headphones Pro',
		category: 'Electronics',
		price: '$129.00',
		stock: 24,
		status: 'Active',
		image:
			'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
		updatedAt: '2 hours ago',
	},
	{
		id: 2,
		name: 'Premium Cotton Shirt',
		category: 'Fashion',
		price: '$39.00',
		stock: 8,
		status: 'Low stock',
		image:
			'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=900&q=80',
		updatedAt: 'Today',
	},
	{
		id: 3,
		name: 'Smart LED Desk Lamp',
		category: 'Home',
		price: '$54.00',
		stock: 0,
		status: 'Draft',
		image:
			'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=900&q=80',
		updatedAt: 'Yesterday',
	},
	{
		id: 4,
		name: 'Running Shoes X1',
		category: 'Footwear',
		price: '$89.00',
		stock: 15,
		status: 'Active',
		image:
			'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
		updatedAt: '4 days ago',
	},
]

const FILTERS: Array<'All' | ProductStatus> = ['All', 'Active', 'Draft', 'Low stock']

const ProductPage = () => {
	const navigate = useNavigate()
	const [search, setSearch] = useState('')
	const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All')

	const filteredProducts = useMemo(() => {
		return PRODUCTS.filter((product) => {
			const matchesSearch =
				product.name.toLowerCase().includes(search.toLowerCase()) ||
				product.category.toLowerCase().includes(search.toLowerCase())

			const matchesFilter = filter === 'All' ? true : product.status === filter

			return matchesSearch && matchesFilter
		})
	}, [filter, search])

	const stats = useMemo(
		() => [
			{
				label: 'Total products',
				value: PRODUCTS.length,
				icon: Inventory2Outlined,
				accent: 'from-cyan-400 to-sky-500',
			},
			{
				label: 'Active listings',
				value: PRODUCTS.filter((product) => product.status === 'Active').length,
				icon: VisibilityOutlined,
				accent: 'from-emerald-400 to-green-500',
			},
			{
				label: 'Draft items',
				value: PRODUCTS.filter((product) => product.status === 'Draft').length,
				icon: EditOutlined,
				accent: 'from-amber-400 to-orange-500',
			},
			{
				label: 'Low stock alerts',
				value: PRODUCTS.filter((product) => product.status === 'Low stock').length,
				icon: LocalOfferOutlined,
				accent: 'from-rose-400 to-pink-500',
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
									Seller Products
								</p>
								<h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
									Manage your catalog from one place
								</h1>
								<p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
									Track product performance, update stock, and keep your listings organized with a
									fast, clean product dashboard.
								</p>
							</div>

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

					<div className="grid gap-4 p-6 sm:grid-cols-2 xl:grid-cols-4 sm:p-8">
						{stats.map((stat) => {
							const Icon = stat.icon

							return (
								<article
									key={stat.label}
									className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm"
								>
									<div className="flex items-center justify-between gap-3">
										<div>
											<p className="text-sm font-medium text-slate-500">{stat.label}</p>
											<p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
												{stat.value}
											</p>
										</div>
										<span
											className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br ${stat.accent} text-slate-950 shadow-lg`}
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
									placeholder="Search products or categories"
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
							<div className="hidden grid-cols-[1.6fr_0.9fr_0.7fr_0.7fr_0.8fr_0.9fr] border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 lg:grid">
								<span>Product</span>
								<span>Category</span>
								<span>Price</span>
								<span>Stock</span>
								<span>Status</span>
								<span className="text-right">Actions</span>
							</div>

							<div className="divide-y divide-slate-200">
								{filteredProducts.length ? (
									filteredProducts.map((product) => (
										<article
											key={product.id}
											className="grid gap-4 px-5 py-5 lg:grid-cols-[1.6fr_0.9fr_0.7fr_0.7fr_0.8fr_0.9fr] lg:items-center"
										>
											<div className="flex items-center gap-4">
												{/* eslint-disable-next-line @next/next/no-img-element */}
												<img
													src={product.image}
													alt={product.name}
													className="h-16 w-16 rounded-2xl object-cover shadow-sm"
												/>
												<div className="min-w-0">
													<h2 className="truncate text-base font-semibold text-slate-900">
														{product.name}
													</h2>
													<p className="mt-1 text-sm text-slate-500">
														Updated {product.updatedAt}
													</p>
												</div>
											</div>

											<div className="flex items-center justify-between text-sm lg:block">
												<span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400 lg:hidden">
													Category
												</span>
												<span className="font-medium text-slate-700">{product.category}</span>
											</div>

											<div className="flex items-center justify-between text-sm lg:block">
												<span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400 lg:hidden">
													Price
												</span>
												<span className="font-semibold text-slate-900">{product.price}</span>
											</div>

											<div className="flex items-center justify-between text-sm lg:block">
												<span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400 lg:hidden">
													Stock
												</span>
												<span className="font-medium text-slate-700">{product.stock}</span>
											</div>

											<div className="flex items-center justify-between text-sm lg:block">
												<span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400 lg:hidden">
													Status
												</span>
												<span
													className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
														product.status === 'Active'
															? 'bg-emerald-50 text-emerald-700'
															: product.status === 'Draft'
																? 'bg-slate-100 text-slate-700'
																: 'bg-amber-50 text-amber-700'
													}`}
												>
													{product.status}
												</span>
											</div>

											<div className="flex items-center justify-end gap-2">
												<button
													type="button"
													className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-50"
													aria-label={`Edit ${product.name}`}
												>
													<EditOutlined fontSize="small" />
												</button>
												<button
													type="button"
													className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-50"
													aria-label={`View ${product.name}`}
												>
													<VisibilityOutlined fontSize="small" />
												</button>
												<button
													type="button"
													className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-rose-200 text-rose-600 transition hover:bg-rose-50"
													aria-label={`Delete ${product.name}`}
												>
													<DeleteOutline fontSize="small" />
												</button>
											</div>
										</article>
									))
								) : (
									<div className="px-5 py-16 text-center">
										<p className="text-lg font-semibold text-slate-900">No products found</p>
										<p className="mt-2 text-sm text-slate-500">
											Try another search term or switch to a different status filter.
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

export default ProductPage
