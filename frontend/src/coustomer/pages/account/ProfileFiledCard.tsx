import React from 'react'

type User = {
  name?: string
  email?: string
  phone?: string
  joined?: string
  address?: string
  avatarUrl?: string
}

const ProfileFiledCard = ({ user }: { user?: User }) => {
  const u: User = user ?? {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    joined: '2024-02-14',
    address: '123 Main St, Springfield, USA',
    avatarUrl: '',
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center text-2xl text-gray-600">
          {u.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={u.avatarUrl} alt={u.name} className="w-full h-full object-cover" />
          ) : (
            <span>{u.name?.charAt(0) ?? 'U'}</span>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900">{u.name}</h3>
          <p className="text-sm text-gray-500">{u.email}</p>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-700 space-y-2">
        <div>
          <span className="font-medium text-gray-900">Phone:</span>{' '}
          <span className="text-gray-700">{u.phone}</span>
        </div>
        <div>
          <span className="font-medium text-gray-900">Joined:</span>{' '}
          <span className="text-gray-700">{u.joined}</span>
        </div>
        <div>
          <span className="font-medium text-gray-900">Address:</span>{' '}
          <span className="text-gray-700">{u.address}</span>
        </div>
      </div>
    </div>
  )
}

export default ProfileFiledCard