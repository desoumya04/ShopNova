import React, { useEffect } from 'react'

type User = {
  name?: string
  email?: string
  phone?: string
  joined?: string

  avatarUrl?: string
}


const ProfileFiledCard = ({ user }: { user?: User }) => {


  
  const u = user || {
    name: 'null',
    email: 'null',
    phone: 'null',
    joined: 'null',
   
    avatarUrl: "",
  };
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-linear-to-br from-slate-100 to-slate-200 p-0.5 shadow-inner">
          <div className="h-full w-full rounded-full bg-white overflow-hidden flex items-center justify-center text-2xl font-semibold text-slate-700">
          {u.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={u.avatarUrl} alt={u.name} className="w-full h-full object-cover" />
          ) : (
            <span>{u.name?.charAt(0) ?? 'U'}</span>
          )}
          </div>
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-xl font-semibold tracking-tight text-slate-900">{u.name}</h3>
          <p className="truncate text-sm font-medium text-slate-500">{u.email}</p>
        </div>
      </div>

      <div className="mt-5 border-t border-slate-100 pt-4">
        <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
          <div className="rounded-lg bg-slate-50 px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Phone</p>
            <p className="mt-1 font-medium text-slate-800">{u.phone}</p>
          </div>
          <div className="rounded-lg bg-slate-50 px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Joined</p>
            <p className="mt-1 font-medium text-slate-800">{u.joined}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileFiledCard