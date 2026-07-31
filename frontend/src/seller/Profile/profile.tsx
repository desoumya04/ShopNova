import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	ArrowForward,
	BadgeOutlined,
	CheckCircleOutline,
	EditOutlined,
	EmailOutlined,
	StorefrontOutlined,
	SupportAgentOutlined,
	VerifiedOutlined,
} from '@mui/icons-material'
import SellerNavbar from '../Navbar'

type Stat = {
	label: string
	value: string
	note: string
	icon: typeof StorefrontOutlined
	tone: string
}

const SellerProfilePage = () => {
	const navigate = useNavigate()

	const stats = useMemo<Stat[]>(
		() => [
			{
				label: 'Store rating',
				value: '4.8/5',
				note: 'Based on 1,246 reviews',
				icon: BadgeOutlined,
				tone: 'from-emerald-400 to-green-500',
			},
			{
				label: 'Products live',
				value: '146',
				note: '18 listings in review',
				icon: StorefrontOutlined,
				tone: 'from-cyan-400 to-sky-500',
			},
			{
				label: 'Verified status',
				value: 'Verified',
				note: 'KYC and tax details complete',
				icon: VerifiedOutlined,
				tone: 'from-amber-400 to-orange-500',
			},
			{
				label: 'Support level',
				value: 'Priority',
				note: 'Average response under 2h',
				icon: SupportAgentOutlined,
				tone: 'from-rose-400 to-pink-500',
			},
		],
		[],
	)

	const activity = [
		{
			title: 'Profile verified',
			detail: 'Your seller account verification was completed successfully.',
			time: 'Today',
		},
		{
			title: 'Business details updated',
			detail: 'Store address and GST information were changed.',
			time: 'Yesterday',
		},
		{
			title: 'Security check passed',
			detail: 'Two-factor authentication is enabled for your account.',
			time: '2 days ago',
		},
	]

	return (
		<div className="min-h-screen bg-slate-100">
			<main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
				<section className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
					<div className="bg-slate-950 px-6 py-8 text-white sm:px-8">
						<div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
							<div className="max-w-2xl">
								<p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
									Seller Profile
								</p>
								<h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
									Manage your store identity
								</h1>
								<p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
									Review your store information, verification status, and support preferences from a
									clean profile page.
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
									onClick={() => navigate('/seller/payouts')}
									className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
								>
									View Payouts
								</button>
							</div>
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
									<div className="flex items-start justify-between gap-3">
										<div>
											<p className="text-sm font-medium text-slate-500">{stat.label}</p>
											<p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
												{stat.value}
											</p>
											<p className="mt-2 text-sm text-slate-500">{stat.note}</p>
										</div>
										<span
											className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br ${stat.tone} text-slate-950 shadow-lg`}
										>
											<Icon />
										</span>
									</div>
								</article>
							)
						})}
					</div>

					<div className="grid gap-6 px-6 pb-6 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:pb-8">
						<article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
							<div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
								<div className="flex items-center gap-4">
									<div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-linear-to-br from-slate-950 to-emerald-500 text-white shadow-lg shadow-emerald-500/20">
										<StorefrontOutlined fontSize="large" />
									</div>
									<div>
										<h2 className="text-2xl font-semibold tracking-tight text-slate-900">
											Nova Traders
										</h2>
										<p className="mt-1 text-sm font-medium text-slate-500">seller@novatraders.com</p>
										<p className="mt-1 text-sm text-slate-500">Mumbai, Maharashtra</p>
									</div>
								</div>

								<button
									type="button"
									className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
								>
									<EditOutlined fontSize="small" />
									Edit Profile
								</button>
							</div>

							<div className="mt-6 grid gap-4 sm:grid-cols-2">
								<InfoCard label="Store name" value="Nova Traders" />
								<InfoCard label="Owner name" value="Amit Sharma" />
								<InfoCard label="Phone" value="+91 98765 43210" />
								<InfoCard label="Joined" value="March 2024" />
								<InfoCard label="Business type" value="Individual seller" />
								<InfoCard label="GST number" value="22AAAAA0000A1Z5" />
							</div>
						</article>

						<article className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
							<div className="flex items-center justify-between gap-3">
								<div>
									<h2 className="text-lg font-semibold">Verification & Security</h2>
									<p className="text-sm text-slate-400">Account protection and trust status</p>
								</div>
								<span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-emerald-400">
									<CheckCircleOutline />
								</span>
							</div>

							<div className="mt-6 space-y-4">
								<StatusRow label="KYC verified" value="100%" />
								<StatusRow label="Bank verified" value="100%" />
								<StatusRow label="2FA enabled" value="100%" />
							</div>

							<div className="mt-6 rounded-2xl bg-white/5 p-4">
								<p className="text-sm font-medium text-slate-200">Security notice</p>
								<p className="mt-2 text-sm leading-6 text-slate-400">
									Your seller profile is protected and all payout changes require verification.
								</p>
							</div>

							<div className="mt-6 space-y-3">
								<button
									type="button"
									className="flex w-full items-center justify-between rounded-2xl bg-white px-4 py-4 text-left text-slate-950 transition hover:bg-slate-100"
								>
									<span>
										<span className="block font-semibold">Update business info</span>
										<span className="block text-sm text-slate-600">Edit address and tax details</span>
									</span>
									<ArrowForward />
								</button>

								<button
									type="button"
									className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-left transition hover:bg-white/10"
								>
									<span>
										<span className="block font-semibold text-white">Contact support</span>
										<span className="block text-sm text-slate-400">Get help with your account</span>
									</span>
									<EmailOutlined className="text-slate-300" />
								</button>
							</div>
						</article>

						<article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
							<div className="flex items-center justify-between gap-3">
								<div>
									<h2 className="text-lg font-semibold text-slate-900">Recent Activity</h2>
									<p className="text-sm text-slate-500">Latest profile and account events.</p>
								</div>
							</div>

							<div className="mt-5 grid gap-4 md:grid-cols-3">
								{activity.map((item) => (
									<div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
										<div className="flex items-start justify-between gap-3">
											<div>
												<h3 className="font-semibold text-slate-900">{item.title}</h3>
												<p className="mt-1 text-sm leading-6 text-slate-500">{item.detail}</p>
											</div>
											<span className="shrink-0 text-xs font-medium text-slate-400">{item.time}</span>
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

const InfoCard = ({ label, value }: { label: string; value: string }) => {
	return (
		<div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
			<p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
			<p className="mt-2 text-sm font-medium text-slate-900">{value}</p>
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

export default SellerProfilePage
