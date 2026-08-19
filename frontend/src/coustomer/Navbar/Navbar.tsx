import {
  Login,
  Search,
  ShoppingCart,
  Close,
  Menu as MenuIcon,
  Storefront,
  Home,
} from "@mui/icons-material";
import { useState, useEffect, useRef } from "react";
import { Avatar, Badge } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux_toolkit/store";
import { fetchUserData } from "../../Redux_toolkit/coustomer/userSlice";
import { fetchUserCart } from "../../Redux_toolkit/cart/cartSlice";

const NAV_LINKS = [
  { label: "Electronics", to: "/products/electronics" },
  { label: "Fashion", to: "/products/fashion" },
  { label: "Grocery", to: "/products/grocery" },
  { label: "Home", to: "/" },
];

const Navbar = () => {
  const dispatch = useAppDispatch();

  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Get user login status and details from user slice (fetched via cookie-based API)
  const { name, email } = useAppSelector((state) => state.user)
  const { cartItems } = useAppSelector((state) => state.cart);
  const totalCartItems = cartItems?.reduce((acc: number, item: any) => acc + item.quantity, 0) || 0;


  useEffect(() => {
    dispatch(fetchUserData());
    dispatch(fetchUserCart());
  }, [dispatch]);


  const role = useAppSelector((state) => state.user.role);
  const isSeller = role === "SELLER";


  const isLoggedIn = !!email;
  const userName = name || "User";

  const userInitial = userName.trim().charAt(0).toUpperCase() || "U";

  const navigate = useNavigate();
  // Close drawer on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    if (mobileOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mobileOpen]);



  const handleSellerNavigation = () => {
    if (isSeller) {
      navigate("/seller");
    } else {
      navigate("/seller/signup");
    }
  };

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);
  return (
    <>
      {/* ── Navbar root ── */}
      <header className="nb-root">
        <div className={`nb-top ${mobileOpen ? "mobile-open" : ""}`}>
          {/* Hamburger (mobile only) */}
          <button
            className="nb-hamburger"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <MenuIcon />
          </button>

          {/* Brand */}
          <a href="/" className="nb-brand">
            SOP<span>NOVA</span>
          </a>

          <div className="nb-mobile-search" aria-label="Search products">
            <Search className="nb-search-icon" />
            <input
              type="search"
              className="nb-search-input"
              placeholder="Search products…"
              aria-label="Search"
            />
          </div>

          <div className="nb-mobile-actions" aria-label="Quick actions">
            <button className="nb-mobile-icon-btn" aria-label="Home">
              <Home />
            </button>

            <button
              className="nb-mobile-icon-btn"
              aria-label="Cart"
              onClick={() => navigate("/cart")}
            >
              <Badge badgeContent={totalCartItems} color="error">
                <ShoppingCart />
              </Badge>
            </button>
          </div>

          {/* Search (hidden on mobile) */}
          <div className="nb-search-wrap">
            <Search className="nb-search-icon" />
            <input
              type="search"
              className="nb-search-input"
              placeholder="Search products, brands and more…"
              aria-label="Search"
            />
          </div>

          {/* Desktop nav links */}
          <nav className="nb-links" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <Link key={l.to} to={l.to} className="nb-link">
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="nb-actions">
            {isLoggedIn ? (
              <button
                className="nb-icon-btn"
                aria-label="User profile"
                onClick={() => navigate("/account")}
              >
                <Avatar sx={{ width: 32, height: 32, fontSize: 14 }}>
                  {userInitial}
                </Avatar>
                <span>{userName}</span>
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  className="flex items-center gap-1.5 text-blue-600 border border-blue-600 hover:bg-blue-50 transition-all font-medium text-sm px-5 py-2 rounded-full shadow-sm hover:shadow-md active:scale-95"
                  aria-label="Login"
                  onClick={() => navigate("/login")}
                >
                  <Login fontSize="small" />
                  <span>Login</span>
                </button>
                <button
                  className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-medium text-sm transition-all shadow-sm hover:shadow-md active:scale-95"
                  aria-label="Signup"
                  onClick={() => navigate("/signup")}
                >
                  <span>Signup</span>
                </button>
              </div>
            )}

            <button className="nb-icon-btn" aria-label="Cart" onClick={() => navigate("/cart")}>
              <Badge badgeContent={totalCartItems} color="error">
                <ShoppingCart />
              </Badge>
            </button>

            <button className="nb-seller-btn" onClick={handleSellerNavigation}>
              {isSeller ? 'Seller' : 'Become a Seller'}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile overlay ── */}
      <div
        className={`nb-overlay ${mobileOpen ? "open" : ""}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* ── Mobile drawer ── */}
      <div
        ref={drawerRef}
        className={`nb-drawer ${mobileOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Drawer header */}
        <div className="nb-drawer-head">
          <div className="nb-drawer-head-main">

            <button onClick={() => navigate("/")} >
              SOP<span>NOVA</span>
            </button>

            <a
              href={"/Home"}
              className="nb-drawer-home"
              aria-label="Home"
              onClick={() => setMobileOpen(false)}
            >
              <Home />
            </a>
          </div>

          <button
            className="nb-close-btn"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          >
            <Close />
          </button>
        </div>

        {/* Drawer nav links */}
        <button className="nb-drawer-action" onClick={() => {
          navigate(isLoggedIn ? "/account" : "/login");
          setMobileOpen(false);
        }}>
          {isLoggedIn ? (
            <>
              <Avatar sx={{ width: 28, height: 28, fontSize: 12 }}>
                {userInitial}
              </Avatar>
              {userName}
            </>
          ) : (
            <>
              <Login />
              Login / Sign up
            </>
          )}
        </button>
        <nav className="nb-drawer-nav" aria-label="Mobile primary">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="nb-drawer-link"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </Link>
          ))}

          <div className="nb-drawer-divider" />



          <button className="nb-drawer-action" onClick={() => navigate("/cart")}>
            <Badge badgeContent={totalCartItems} color="error">
              <ShoppingCart />
            </Badge>
            My Cart
          </button>
        </nav>

        {/* Drawer footer */}
        <div className="nb-drawer-footer">
          <button className="nb-drawer-seller" onClick={() => {
            handleSellerNavigation();
            setMobileOpen(false);
          }}>
            <Storefront style={{ fontSize: 18 }} />
            {isSeller ? 'Seller' : 'Become a Seller'}
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
