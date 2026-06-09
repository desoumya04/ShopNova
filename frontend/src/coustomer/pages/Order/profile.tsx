import { type ReactNode } from 'react';
import { Avatar, Typography } from '@mui/material';
import { Logout, Person, ReceiptLong } from '@mui/icons-material';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import Order from './Order';
import ProfileDetails from '../account/UserDetails';

type MenuItem = {
  label: string;
  action?: 'logout';
  icon: ReactNode;
  path: string;
};

type AccountPage = {
  path: string;
  element: ReactNode;
};

const menuItems: MenuItem[] = [
  {
    label: 'Orders',
    icon: <ReceiptLong />,
    path: '/account/orders',
  },
  {
    label: 'Profile',
    icon: <Person />,
    path: '/account/profile',
  },
  {
    label: 'Saved items',
    icon: <Person />,
    path: '/account/saved',
  },
  {
    label: 'Logout',
    action: 'logout',
    icon: <Logout />,
    path: '/account/logout',
  },
];

const accountPages: AccountPage[] = [
  {
    path: 'profile',
    element: (
      <section>
        <Typography variant="h5" gutterBottom>
          Profile
        </Typography>
        <div className="space-y-4">
          <ProfileDetails />
        </div>
      </section>
    ),
  },
  {
    path: 'saved',
    element: (
      <section>
        <Typography variant="h5" gutterBottom>
          Saved Items
        </Typography>
        <div className="space-y-4">
          <Order />
        </div>
      </section>
    ),
  },
  {
    path: 'orders',
    element: (
      <section className="space-y-4">
        <Typography variant="h5" gutterBottom>
          Orders
        </Typography>
        <div className="space-y-4">
          <Order />
        </div>
      </section>
    ),
  },
];

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userName = localStorage.getItem('userName') || 'User';
  const userInitial = userName.trim().charAt(0).toUpperCase() || 'U';

  const handleLogout = () => {
    localStorage.removeItem('isLogin');
    localStorage.removeItem('userName');
    navigate('/');
  };

  return (
    <section className="flex flex-col gap-4 p-4 lg:flex-row">
      <aside className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:w-64">
        <div className="mb-3 flex items-center gap-3">
          <Avatar className="h-14 w-14">{userInitial}</Avatar>
          <div>
            <Typography variant="h6">{userName}</Typography>
            <Typography variant="body2" color="text.secondary">
              Member
            </Typography>
          </div>
        </div>

        <hr className="mb-3 border-slate-200" />

        <nav aria-label="Profile navigation">
          <div className="flex flex-col gap-1">
            {menuItems.map((item) => {
              const isActive = item.action !== 'logout' && location.pathname.startsWith(item.path);

              return (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  if (item.action === 'logout') {
                    handleLogout();
                    return;
                  }

                  navigate(item.path);
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition hover:bg-slate-100 ${
                  isActive ? 'bg-slate-100' : ''
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
              );
            })}
          </div>
        </nav>
      </aside>

      <main className="flex-1 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:p-6">
        <Routes>
          {accountPages.map((page) => (
            <Route key={page.path} path={page.path} element={page.element} />
          ))}
          <Route index element={<Navigate to="orders" replace />} />
        </Routes>
      </main>
    </section>
  );
};

export default Profile;
