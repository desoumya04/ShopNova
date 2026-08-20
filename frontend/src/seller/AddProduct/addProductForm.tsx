import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../Redux_toolkit/store'
import { fetchCategory, createProduct } from '../../Redux_toolkit/Product/product'
import { CATEGORY_PRODUCT_NAMES } from '../../data/categoryProducts'
import { colors } from '../../../data/filter/color'

const MAX_IMAGES = 5

const AddProductForm = () => {
	const navigate = useNavigate()


	const dispatch = useAppDispatch()
	const fileInputRef = useRef<HTMLInputElement>(null)

	const [product, setProduct] = useState({
		name: "",
		description: "",
		brand: "",
		categoryId: "",
		status: "ACTIVE",
		price: "",
		discountPrice: "",
		costPrice: "",
		stock: "",
	})

	const [productVariant, setProductVariant] = useState({
		color: "",
		size: "",
		storage: "",
		ram: "",
		weight: "",
		warranty: "",
	})

	const [productImages, setProductImages] = useState<File[]>([])

	const categories = useAppSelector((state) => state.product.categories)
	const loading = useAppSelector((state) => state.product.loading)
	const selectedCategoryName = categories.find((c: any) => c.id === product.categoryId)?.name || ""
	const selectedCategoryNameUpper = selectedCategoryName.toUpperCase()
	const availableProductNames = CATEGORY_PRODUCT_NAMES[selectedCategoryName] ?? []
	// calculate 
	useEffect(() => {
		dispatch(fetchCategory())
	}, [dispatch])
	
	// calculate the price acording to the cost price and discount price
	useEffect(() => {
		const costPrice = Number(product.costPrice) || 0;
		const discountPrice = Number(product.discountPrice) || 0;

		const price = Math.max(0, costPrice - discountPrice);

		setProduct((prev) => ({
			...prev,
			price: price.toFixed(2),
		}));
	}, [product.costPrice, product.discountPrice]);

	const [imageError, setImageError] = useState('')

	const imagePreviews = useMemo(
		() =>
			productImages.map((file) => ({
				file,
				url: URL.createObjectURL(file),
			})),
		[productImages]
	)

	useEffect(() => {
		return () => {
			imagePreviews.forEach((preview) => URL.revokeObjectURL(preview.url))
		}
	}, [imagePreviews])


	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFiles = Array.from(event.target.files ?? [])

		if (!selectedFiles.length) return

		const availableSlots = MAX_IMAGES - productImages.length
		const nextFiles = selectedFiles.slice(0, availableSlots)

		if (selectedFiles.length > availableSlots) {
			setImageError(`You can upload up to ${MAX_IMAGES} images.`)
		} else {
			setImageError('')
		}
		setProductImages((current) => [
			...current,
			...nextFiles
		])

		if (fileInputRef.current) {
			fileInputRef.current.value = ''
		}
	}

	const removeImage = (index: number) => {
		setProductImages((current) => current.filter((_, i) => i !== index))
	}

	const clearAll = () => {
		setProductImages([])
		setImageError('')
		if (fileInputRef.current) {
			fileInputRef.current.value = ''
		}
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const formData = new FormData()

		formData.append("product", JSON.stringify(product))
		formData.append("productVariants", JSON.stringify(productVariant))

		productImages.forEach((file) => {
			formData.append("productImages", file)
		})

		const result = await dispatch(createProduct(formData))

		if (createProduct.fulfilled.match(result)) {
			navigate("/seller/products")
		}
	}

	return (
		<div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
			<form
				onSubmit={handleSubmit}
				className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
			>
				<div className="bg-slate-950 px-6 py-6 text-white sm:px-8">
					<p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
						Seller Tools
					</p>
					<h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
						Add Product
					</h1>
					<p className="mt-2 max-w-2xl text-sm text-slate-300">
						Create a clean product listing with pricing, inventory, and up to five images.
					</p>
				</div>

				<div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr]">
					<div className="space-y-6">
						<section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
							<div className="mb-4 flex items-center justify-between gap-3">
								<div>
									<h2 className="text-lg font-semibold text-slate-900">Product Images</h2>
									<p className="text-sm text-slate-500">Upload up to {MAX_IMAGES} images.</p>
								</div>
								<button
									type="button"
									onClick={() => fileInputRef.current?.click()}
									className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
								>
									Select Images
								</button>
							</div>

							<input
								ref={fileInputRef}
								type="file"
								accept="image/*"
								multiple
								onChange={handleImageUpload}
								className="hidden"
							/>

							<div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
								{imagePreviews.map((preview, index) => (
									<div
										key={`${preview.file.name}-${index}`}
										className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white"
									>
										{/* eslint-disable-next-line @next/next/no-img-element */}
										<img
											src={preview.url}
											alt={preview.file.name}
											className="h-44 w-full object-cover"
										/>
										<div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-linear-to-t from-slate-950/80 to-transparent px-3 py-3 text-white opacity-100 transition group-hover:opacity-100">
											<span className="truncate text-xs font-medium">{preview.file.name}</span>
											<button
												type="button"
												onClick={() => removeImage(index)}
												className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur transition hover:bg-white/25"
											>
												Remove
											</button>
										</div>
									</div>
								))}

								{productImages.length < MAX_IMAGES && (
									<button
										type="button"
										onClick={() => fileInputRef.current?.click()}
										className="flex min-h-44 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white text-slate-500 transition hover:border-slate-400 hover:bg-slate-50"
									>
										<span className="text-3xl font-light">+</span>
										<span className="mt-2 text-sm font-medium">Add more images</span>
									</button>
								)}
							</div>

							<div className="mt-4 flex items-center justify-between text-sm">
								<p className="text-slate-500">
									{productImages.length}/{MAX_IMAGES} images selected
								</p>
								{imageError ? <p className="font-medium text-rose-600">{imageError}</p> : null}
							</div>
						</section>

						<section className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:grid-cols-2">
							<Field label="Product Name">
								{availableProductNames.length > 0 ? (
									<select
										value={product.name}
										onChange={(event) => setProduct((prev) => ({ ...prev, name: event.target.value }))}
										required
										className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
									>
										<option value="">Select product name</option>
										{availableProductNames.map((name) => (
											<option key={name} value={name}>{name}</option>
										))}
									</select>
								) : (
									<input
										value=""
										readOnly
										placeholder="Select a category first"
										className="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-400 outline-none cursor-not-allowed"
									/>
								)}
							</Field>

							<Field label="Category">
								<select
									value={product.categoryId}
									onChange={(event) =>
										setProduct((prev) => ({
											...prev,
											categoryId: event.target.value,
											name: "", // reset name when category changes
										}))
									}
									className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
								>
									<option value="">Select Category</option>
									{categories.map((category) => (
										<option key={category.id} value={category.id}>
											{category.name}
										</option>
									))}
								</select>
							</Field>

							<Field label="Brand">
								<input
									value={product.brand}
									onChange={(event) => setProduct((prev) => ({ ...prev, brand: event.target.value }))}
									placeholder="Brand name"
									className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
								/>
							</Field>

							<Field label="Status">
								<select
									value={product.status}
									onChange={(event) => setProduct((prev) => ({ ...prev, status: event.target.value }))}
									className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
								>
									
									<option value="ACTIVE">Active</option>
									<option value="LOW_STOCK">Low Stock</option>
								</select>
							</Field>


							<Field label="Cost Price">
								<input
									type="number"
									min="0"
									value={product.costPrice}
									onChange={(event) =>
										setProduct((prev) => ({
											...prev,
											costPrice: event.target.value,
										}))
									}
									placeholder="0.00"
									className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
								/>
							</Field>

							<Field label="Discount Price">
								<input
									type="number"
									min="0"
									value={product.discountPrice}
									onChange={(event) =>
										setProduct((prev) => ({
											...prev,
											discountPrice: event.target.value,
										}))
									}
									placeholder="0.00"
									className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
								/>
							</Field>

							<Field label="Price">
								<input
									type="number"
									min="0"
									value={product.price}
									readOnly
									placeholder="0.00"
									className="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-600 outline-none"
								/>
							</Field>

							<Field label="Stock">
								<input
									type="number"
									min="0"
									value={product.stock}
									onChange={(event) => setProduct((prev) => ({ ...prev, stock: event.target.value }))}
									placeholder="Quantity"
									className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
								/>
							</Field>

							{/* Conditional Variant Fields */}
							{(selectedCategoryNameUpper === 'FASHION' || selectedCategoryNameUpper === 'ELECTRONICS' || !selectedCategoryNameUpper) && (
								<Field label="Color">
									<select
										value={productVariant.color}
										onChange={(event) => setProductVariant((prev) => ({ ...prev, color: event.target.value }))}
										className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
									>
										<option value="">Select Color</option>
										{colors.map((c) => (
											<option key={c.name} value={c.name}>
												{c.name}
											</option>
										))}
									</select>
								</Field>
							)}

							{selectedCategoryNameUpper === 'FASHION' && (
								<Field label="Size">
									<input
										value={productVariant.size}
										onChange={(event) => setProductVariant((prev) => ({ ...prev, size: event.target.value }))}
										placeholder="M, L, XL"
										className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
									/>
								</Field>
							)}

							{selectedCategoryNameUpper === 'ELECTRONICS' && (
								<>
									<Field label="Storage">
										<input
											value={productVariant.storage}
											onChange={(event) => setProductVariant((prev) => ({ ...prev, storage: event.target.value }))}
											placeholder="128GB, 512GB"
											className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
										/>
									</Field>

									<Field label="RAM">
										<input
											value={productVariant.ram}
											onChange={(event) => setProductVariant((prev) => ({ ...prev, ram: event.target.value }))}
											placeholder="8GB, 16GB"
											className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
										/>
									</Field>

									<Field label="Warranty">
										<input
											value={productVariant.warranty}
											onChange={(event) => setProductVariant((prev) => ({ ...prev, warranty: event.target.value }))}
											placeholder="1 year"
											className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
										/>
									</Field>
								</>
							)}

							{selectedCategoryNameUpper !== 'FASHION' && (
								<Field label="Weight">
									<input
										value={productVariant.weight}
										onChange={(event) => setProductVariant((prev) => ({ ...prev, weight: event.target.value }))}
										placeholder="1.2kg"
										className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
									/>
								</Field>
							)}

							<div className="sm:col-span-2">
								<Field label="Description">
									<textarea
										value={product.description}
										onChange={(event) => setProduct((prev) => ({ ...prev, description: event.target.value }))}
										placeholder="Describe the product, size, condition, or features"
										rows={5}
										className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
									/>
								</Field>
							</div>
						</section>
					</div>

					<aside className="space-y-4">
						<div className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white">
							<p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
								Preview
							</p>
							<h3 className="mt-2 text-2xl font-semibold tracking-tight">
								{product.name || 'Product title'}
							</h3>
							<p className="mt-1 text-sm text-slate-300">
								{product.brand || 'Brand'}
							</p>

							<div className="mt-5 flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
								<div>
									<p className="text-xs uppercase tracking-wide text-slate-400">Price</p>
									<p className="text-xl font-semibold text-white">₹{product.price || '0.00'}</p>
								</div>
								<div className="text-right">
									<p className="text-xs uppercase tracking-wide text-slate-400">Stock</p>
									<p className="text-xl font-semibold text-white">{product.stock || '0'}</p>
								</div>
							</div>

							<div className="mt-5 rounded-2xl bg-white/5 p-4 text-sm text-slate-300">
								<p className="font-medium text-white">Details</p>
								<p className="mt-2 leading-6">
									{product.description || 'Your product description will appear here.'}
								</p>
							</div>
						</div>

						<div className="rounded-2xl border border-slate-200 bg-white p-5">
							<h3 className="text-lg font-semibold text-slate-900">Image rules</h3>
							<ul className="mt-3 space-y-2 text-sm text-slate-600">
								<li>• Upload a maximum of 5 images.</li>
								<li>• Use clear photos with good lighting.</li>
								<li>• Preferred size: square or 4:3.</li>
							</ul>
						</div>

						<div className="flex gap-3">
							<button
								type="button"
								onClick={clearAll}
								className="flex-1 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
							>
								Reset
							</button>
							<button
								type="submit"
								disabled={loading}
								className={`flex-1 rounded-full px-4 py-3 text-sm font-semibold text-white transition ${loading ? 'bg-slate-500 cursor-not-allowed' : 'bg-slate-950 hover:bg-slate-800'}`}
							>
								{loading ? 'Publishing...' : 'Publish Product'}
							</button>
						</div>
					</aside>
				</div>
			</form>
		</div>
	)
}

const Field = ({
	label,
	children,
}: {
	label: string
	children: React.ReactNode
}) => {
	return (
		<label className="block">
			<span className="mb-2 block text-sm font-semibold text-slate-800">{label}</span>
			{children}
		</label>
	)
}

export default AddProductForm
