import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Close,
  Dashboard,
  Inventory,
  Menu as MenuIcon,
  Notifications,
  Search,
  Storefront,
} from '@mui/icons-material'

const SELLER_LINKS = [
  { label: 'Dashboard', to: '/seller' },
  { label: 'Products', to: '/seller/products' },
  { label: 'Orders', to: '/seller/orders' },
  { label: 'Analytics', to: '/seller/analytics' },
  { label: 'Payouts', to: '/seller/payouts' },
]

const SellerNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        setMobileOpen(false)
      }
    }

    if (mobileOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
    }

    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [mobileOpen])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-slate-950/95 text-white backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10 lg:hidden"
            aria-label="Open seller menu"
            onClick={() => setMobileOpen(true)}
          >
            <MenuIcon />
          </button>

          <button
            type="button"
            onClick={() => navigate('/seller')}
            className="flex items-center gap-3 text-left"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-400 to-cyan-400 text-slate-950 shadow-lg shadow-emerald-500/20">
              <Storefront />
            </span>
            <span className="hidden sm:block">
              <span className="block text-lg font-semibold tracking-tight">Seller Center</span>
              <span className="block text-xs text-slate-400">Manage your store</span>
            </span>
          </button>

          <div className="hidden flex-1 items-center justify-center lg:flex">
            <div className="flex w-full max-w-xl items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-200">
              <Search className="text-slate-400" />
              <input
                type="search"
                placeholder="Search products, orders or customers"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
              />
            </div>
          </div>

          <nav className="hidden items-center gap-1 lg:flex">
            {SELLER_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
              aria-label="Seller notifications"
            >
              <Notifications />
            </button>

            <button
              type="button"
              className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 sm:inline-flex"
              onClick={() => navigate('/seller/products/new')}
            >
              Add Product
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
              onClick={() => navigate('/seller/profile')}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-950 text-xs text-white">
                S
              </span>
              <span className="hidden md:inline" onClick={() => navigate('/seller/profile')}>
                Seller
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-slate-950/70 transition-opacity duration-300 lg:hidden ${mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      <aside
        ref={drawerRef}
        className={`fixed left-0 top-0 z-50 h-full w-[86%] max-w-sm transform border-r border-slate-800 bg-slate-950 p-5 text-white shadow-2xl transition-transform duration-300 lg:hidden ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-label="Seller navigation"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-400 to-cyan-400 text-slate-950">
              <Storefront />
            </span>
            <div>
              <p className="text-sm font-semibold">Seller Center</p>
              <p className="text-xs text-slate-400">Mobile navigation</p>
            </div>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5"
            aria-label="Close seller menu"
            onClick={() => setMobileOpen(false)}
          >
            <Close />
          </button>
        </div>

        <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 text-slate-200">
            <Search className="text-slate-400" />
            <input
              type="search"
              placeholder="Search seller data"
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
            />
          </div>
        </div>

        <nav className="mt-6 space-y-2" aria-label="Seller mobile navigation">
          {SELLER_LINKS.map((link) => {
            const Icon =
              link.label === 'Dashboard'
                ? Dashboard
                : link.label === 'Products'
                  ? Inventory
                  : Dashboard

            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/10"
              >
                <Icon fontSize="small" />
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-5 left-5 right-5">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            onClick={() => {
              setMobileOpen(false)
              navigate('/seller/products/new')
            }}
          >
            <Inventory fontSize="small" />
            Add a Product
          </button>
        </div>
      </aside>
    </>
  )
}

export default SellerNavbar