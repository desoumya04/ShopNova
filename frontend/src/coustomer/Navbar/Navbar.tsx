import { Login, Search, ShoppingCart, Close, Menu as MenuIcon, Storefront, Home, ReceiptLong, Person, Logout } from "@mui/icons-material";
import { useState, useEffect, useRef } from "react";
import { Avatar, Badge, Divider, Menu, MenuItem, ListItemIcon } from "@mui/material";

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "Electronics", href: "#" },
  { label: "Fashion", href: "#" },
  { label: "Grocery", href: "#" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const isLoggedIn = "true";
  const userName = localStorage.getItem("userName") || "User";
  const userInitial = userName.trim().charAt(0).toUpperCase() || "U";
  const isUserMenuOpen = Boolean(userMenuAnchor);

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

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setUserMenuAnchor(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("userName");
    handleCloseUserMenu();
    window.location.reload();
  };

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
          <a href="#" className="nb-brand">
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

            <button className="nb-mobile-icon-btn" aria-label="Cart">
              <Badge badgeContent={3} color="error">
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
              <a key={l.label} href={l.href} className="nb-link">
                {l.label}
              </a>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="nb-actions">
            {isLoggedIn ? (
              <button
                className="nb-icon-btn"
                aria-label="User profile"
                onClick={handleOpenUserMenu}
              >
                <Avatar sx={{ width: 32, height: 32, fontSize: 14 }}>
                  {userInitial}
                </Avatar>
                <span>{userName}</span>
              </button>
            ) : (
              <button className="nb-icon-btn" aria-label="Login">
                <Login />
                <span>Login</span>
              </button>
            )}

            <button className="nb-icon-btn" aria-label="Cart">
              <Badge badgeContent={3} color="error">
                <ShoppingCart />
              </Badge>
            </button>

            <button className="nb-seller-btn">Become a Seller</button>
          </div>
        </div>
      </header>

      <Menu
        anchorEl={userMenuAnchor}
        open={isUserMenuOpen}
        onClose={handleCloseUserMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleCloseUserMenu}>
          <ListItemIcon>
            <ReceiptLong fontSize="small" />
          </ListItemIcon>
          Order
        </MenuItem>

        <MenuItem onClick={handleCloseUserMenu}>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

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
            <a href="#" className="nb-drawer-brand" onClick={() => setMobileOpen(false)}>
              SOP<span>NOVA</span>
            </a>

            <a href="#" className="nb-drawer-home" aria-label="Home" onClick={() => setMobileOpen(false)}>
              <Home />
            </a>
          </div>

          <button className="nb-close-btn" aria-label="Close menu" onClick={() => setMobileOpen(false)}>
            <Close />
          </button>
        </div>

        {/* Drawer nav links */}
        <nav className="nb-drawer-nav" aria-label="Mobile primary">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="nb-drawer-link"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </a>
          ))}

          <div className="nb-drawer-divider" />

          <button className="nb-drawer-action">
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

          <button className="nb-drawer-action">
            <Badge badgeContent={3} color="error">
              <ShoppingCart />
            </Badge>
            My Cart
          </button>
        </nav>

        {/* Drawer footer */}
        <div className="nb-drawer-footer">
          <button className="nb-drawer-seller">
            <Storefront style={{ fontSize: 18 }} />
            Become a Seller
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
