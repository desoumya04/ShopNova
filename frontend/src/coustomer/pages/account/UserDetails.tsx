import React from 'react'
import ProfileFiledCard from './ProfileFiledCard'

const UserDetails = () => {
  const user = {
    name: 'Jane Doe',
    email: 'jane@example.com',
    phone: '+1 (555) 987-6543',
    joined: '2023-11-03',
    address: '42 Market St, Metropolis, USA',
    avatarUrl: '',
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex gap-6">
        <aside className="w-80">
          <ProfileFiledCard user={user} />
        </aside>

        <main className="flex-1">
          <h1 className="text-2xl font-semibold mb-4">User Details</h1>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h2 className="text-sm text-gray-500">Name</h2>
                <p className="mt-1 text-gray-900">{user.name}</p>
              </div>

              <div>
                <h2 className="text-sm text-gray-500">Email</h2>
                <p className="mt-1 text-gray-900">{user.email}</p>
              </div>

              <div>
                <h2 className="text-sm text-gray-500">Phone</h2>
                <p className="mt-1 text-gray-900">{user.phone}</p>
              </div>

              <div>
                <h2 className="text-sm text-gray-500">Joined</h2>
                <p className="mt-1 text-gray-900">{user.joined}</p>
              </div>

              <div className="md:col-span-2">
                <h2 className="text-sm text-gray-500">Address</h2>
                <p className="mt-1 text-gray-900">{user.address}</p>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">Edit</button>
              <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded">Manage Addresses</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default UserDetails
