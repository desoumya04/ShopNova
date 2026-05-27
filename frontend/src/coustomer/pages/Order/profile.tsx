import { useState } from 'react';
import { Avatar, Typography } from '@mui/material';
import { ReceiptLong, Person, Logout } from '@mui/icons-material';

import Order from './Order';

const ORDERS = [
  {
    title: 'Josh Bager',
    seller: 'Jio Mart Private Limited',
    image: 'https://rukminim2.flixcart.com/image/2940/2940/xif0q/sari/v/w/q/free-fandy-vivan-fab-unstitched-original-imahgzzh6vyqbzsw.jpeg?q=90',
    price: '₹1,299',
    quantity: 2,
    status: 'Delivered',
  },
  {
    title: 'Noise Headphones',
    seller: 'Noise India',
    image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/headphone/g/r/1/-original-imagyqg3k3zjz2rn.jpeg?q=70',
    price: '₹2,499',
    quantity: 1,
    status: 'Shipped',
  },
];

const Profile = () => {
  const [view, setView] = useState<'profile' | 'orders'>('profile');

  const userName = localStorage.getItem('userName') || 'User';
  const userInitial = userName.trim().charAt(0).toUpperCase() || 'U';

  const handleLogout = () => {
    localStorage.removeItem('isLogin');
    localStorage.removeItem('userName');
    window.location.href = '/';
  };

  return (
    <section className="flex flex-col gap-4 p-4 lg:flex-row">
      {/* Left menu (aside) */}
      <aside className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:w-64">
        <div className="mb-3 flex items-center gap-3">
          <Avatar className="h-14 w-14">{userInitial}</Avatar>
          <div>
            <Typography variant="h6">{userName}</Typography>
            <Typography variant="body2" color="text.secondary">Member</Typography>
          </div>
        </div>

        <hr className="mb-3 border-slate-200" />

        <nav aria-label="Profile navigation">
          <div className="flex flex-col gap-1">
            <button
              aria-pressed={view === 'orders'}
              onClick={() => setView('orders')}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition hover:bg-slate-100 ${view === 'orders' ? 'bg-slate-100' : ''}`}
            >
              <ReceiptLong />
              <span>Orders</span>
            </button>

            <button
              aria-pressed={view === 'profile'}
              onClick={() => setView('profile')}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition hover:bg-slate-100 ${view === 'profile' ? 'bg-slate-100' : ''}`}
            >
              <Person />
              <span>Profile</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition hover:bg-slate-100"
            >
              <Logout />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Right content (main) */}
      <main className="flex-1 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:p-6">
        {view === 'profile' ? (
          <section>
            <Typography variant="h5" gutterBottom>
              Profile
            </Typography>
            <Typography>Placeholder for profile details and editable fields.</Typography>
          </section>
        ) : (
          <section className="space-y-4">
            <Typography variant="h5" gutterBottom>
              Orders
            </Typography>
            <div className="space-y-4">
              <Order/>
            </div>
          </section>
        )}
      </main>
    </section>
  );
};

export default Profile;