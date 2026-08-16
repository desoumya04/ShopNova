import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../Redux_toolkit/store'
import { fetchCategory, updateProductData } from '../../Redux_toolkit/Product/product'
import { useParams } from 'react-router-dom'
import { api } from '../../config/api'

const MAX_IMAGES = 5

const EditProductForm = () => {
	const navigate = useNavigate()
	const { productId } = useParams<{ productId: string }>()
	const dispatch = useAppDispatch()
	const fileInputRef = useRef<HTMLInputElement>(null)

	const [product, setProduct] = useState({
		name: "",
		description: "",
		brand: "",
		categoryId: "",
		status: "DRAFT",
		price: "",
		discountPrice: "",
		costPrice: "",
		stock: "",
	})
	console.log("product", product)
	const [productVariant, setProductVariant] = useState({
		color: "",
		size: "",
		storage: "",
		ram: "",
		weight: "",
		warranty: "",
	})

	interface ExistingImage {
		id: string
		url: string
		publicId: string
	}

	const [deletedImageIds, setDeletedImageIds] = useState<string[]>([])
	const [existingImages, setExistingImages] = useState<ExistingImage[]>([])
	const [productImages, setProductImages] = useState<File[]>([])

	console.log("deletedImages",deletedImageIds)
	const totalImage = existingImages.length + productImages.length
	const availableSlots = MAX_IMAGES - totalImage

	const categories = useAppSelector((state) => state.product.categories)
	const loading = useAppSelector((state) => state.product.loading)
	const selectedCategoryName = categories.find((c: any) => c.id === product.categoryId)?.name?.toUpperCase() || "";
	// calculate 
	useEffect(() => {
		dispatch(fetchCategory())

		if (productId) {
			api.get(`/product/getProductByProductId?productId=${productId}`).then((res) => {
				const data = res.data.data;
				const p = data.product;
				const v = data.variants?.[0] || {};

				setProduct({
					name: p.name || "",
					description: p.description || "",
					brand: p.brand || "",
					categoryId: p.categoryId || "",
					status: p.status || "DRAFT",
					price: p.price?.toString() || "",
					discountPrice: p.discountPrice?.toString() || "",
					costPrice: p.costPrice?.toString() || "",
					stock: p.stock?.toString() || "",
				});

				setProductVariant({
					color: v.color || "",
					size: v.size || "",
					storage: v.storage || "",
					ram: v.ram || "",
					weight: v.weight?.toString() || "",
					warranty: v.warranty || "",
				});

				setExistingImages(p.images ?? [])

			}).catch(err => {
				console.error("Failed to fetch product", err);
			});
		}
	}, [dispatch, productId])

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

	const removeExistingImages = (imageId: string) => {
		setExistingImages((current) => current.filter((currentImage) => currentImage.id !== imageId))

		setDeletedImageIds((current) => {
			return [...current, imageId]
		})
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
		if (productId) {
			const formData = new FormData
			formData.append("product", JSON.stringify(product))
			formData.append("productVariants", JSON.stringify(productVariant))
			formData.append("deletedImages", JSON.stringify(deletedImageIds))
			
			for(const image of productImages){
				formData.append("updatedImage",image)
			}
			
			dispatch(updateProductData({productId,productData:formData}))
				.unwrap()
				.then(() => {
					navigate('/seller/products')
				})
				.catch((err) => {
					console.log('error', err)
				})
		}
	}

	return (
		<div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
			<form
				onSubmit={handleSubmit}
				className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
			>
				<div className="bg-slate-950 px-6 py-10 text-white sm:px-8">
					<p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
						Seller Tools
					</p>
					<h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Edit Product</h1>
					<p className="mt-2 text-sm text-slate-300">Update the details of your product to keep your catalog accurate.</p>
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
								{existingImages.map((image) => (
									<div
										key={image.id}
										className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white"
									>
										<img
											src={image.url}
											alt="Product"
											className="h-44 w-full object-cover"
										/>

										<div className="absolute bottom-0 left-0 right-0 flex justify-end bg-linear-to-t from-slate-950/80 to-transparent px-3 py-3">
											<button
												type="button"
												onClick={() => removeExistingImages(image.id)}
												className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white"
											>
												Remove
											</button>
										</div>
									</div>
								))}
								{productImages.length < MAX_IMAGES && imagePreviews.map((preview, index) => (
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
							

								{totalImage < MAX_IMAGES && (
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
									{totalImage}/{MAX_IMAGES} images selected
								</p>
								{imageError ? <p className="font-medium text-rose-600">{imageError}</p> : null}
							</div>
						</section>

						<section className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:grid-cols-2">
							<Field label="Product Name">
								<input
									value={product.name}
									onChange={(event) => setProduct((prev) => ({ ...prev, name: event.target.value }))}
									placeholder="Enter product name"
									className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
								/>
							</Field>

							<Field label="Category">
								<select
									value={product.categoryId}
									onChange={(event) => setProduct((prev) => ({ ...prev, categoryId: event.target.value }))}
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
									<option value="DRAFT">Draft</option>
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
							{(selectedCategoryName === 'FASHION' || selectedCategoryName === 'ELECTRONICS' || !selectedCategoryName) && (
								<Field label="Color">
									<input
										value={productVariant.color}
										onChange={(event) => setProductVariant((prev) => ({ ...prev, color: event.target.value }))}
										placeholder="Black, Blue, etc."
										className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
									/>
								</Field>
							)}

							{selectedCategoryName === 'FASHION' && (
								<Field label="Size">
									<input
										value={productVariant.size}
										onChange={(event) => setProductVariant((prev) => ({ ...prev, size: event.target.value }))}
										placeholder="M, L, XL"
										className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
									/>
								</Field>
							)}

							{selectedCategoryName === 'ELECTRONICS' && (
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

							{selectedCategoryName !== 'FASHION' && (
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
									<p className="text-xl font-semibold text-white">${product.price || '0.00'}</p>
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
								{loading ? 'Saving...' : 'Save Changes'}
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

export default EditProductForm
