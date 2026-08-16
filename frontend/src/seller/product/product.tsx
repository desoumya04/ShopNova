import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../Redux_toolkit/store'
import {useEffect} from 'react'
import {
	Add,
	DeleteOutline,
	EditOutlined,
	Inventory2Outlined,
	LocalOfferOutlined,
	Search,
	VisibilityOutlined,
} from '@mui/icons-material'

import { fetchSellerProducts } from '../../Redux_toolkit/Product/product'

type ProductStatus = 'ACTIVE' | 'DRAFT' | 'LOW_STOCK'


const FILTERS: Array<'All' | ProductStatus> = ['All', 'ACTIVE', 'DRAFT', 'LOW_STOCK']

const ProductPage = () => {
	const dispatch = useAppDispatch()

	
	const navigate = useNavigate()
	const [search, setSearch] = useState('')
	const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All')


	const products = useAppSelector((state) => state.product.products)
	useEffect(() =>{
		dispatch(fetchSellerProducts())
	},[dispatch])
	console.log("products", products)	
	

	const filteredProducts = useMemo(() => {
    const searchText = search.trim().toLowerCase()

    return products.filter((product) => {
        const productName = product.name?.toLowerCase() || ''
        const categoryName = product.category?.name.toLowerCase() || ''
        const status = product.status?.toUpperCase() || ''

        const matchesSearch =
            searchText === '' ||
            productName.includes(searchText) ||
            categoryName.includes(searchText)

        const matchesFilter =
            filter === 'All' || status === filter

        return matchesSearch && matchesFilter
    })
}, [products, search, filter])

	const stats = useMemo(
		() => [
			{
				label: 'Total products',
				value: products.length,
				icon: Inventory2Outlined,
				accent: 'from-cyan-400 to-sky-500',
			},
			{
				label: 'Active listings',
				value: products.filter((product) => product.status === 'ACTIVE').length,
				icon: VisibilityOutlined,
				accent: 'from-emerald-400 to-green-500',
			},
			{
				label: 'Draft items',
				value: products.filter((product) => product.status === 'DRAFT').length,
				icon: EditOutlined,
				accent: 'from-amber-400 to-orange-500',
			},
			{
				label: 'Low stock alerts',
				value: products.filter((product) => product.status === 'LOW_STOCK').length,
				icon: LocalOfferOutlined,
				accent: 'from-rose-400 to-pink-500',
			},
		],
		[products],
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
													src={product.images?.[1]?.url || product.images?.[0].url}
													alt={product.name}
													className="h-16 w-16 rounded-2xl object-cover shadow-sm"
												/>
												<div className="min-w-0">
													<h2 className="truncate text-base font-semibold text-slate-900">
														{product.name}
													</h2>
											
												</div>
											</div>

											<div className="flex items-center justify-between text-sm lg:block">
												<span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400 lg:hidden">
													Category
												</span>
												<span className="font-medium text-slate-700">{product.category?.name}</span>
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
														product.status === 'ACTIVE'
															? 'bg-emerald-50 text-emerald-700'
															: product.status === 'DRAFT'
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
													onClick={() => navigate(`/seller/products/edit/${product.id}`)}
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
