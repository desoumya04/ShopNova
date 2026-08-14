import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../../Redux_toolkit/store'
import { updateUserData } from '../../../Redux_toolkit/coustomer/userSlice'

type User = {
  name?: string
  email?: string
  phone?: string
  joined?: string

  avatarUrl?: string
}


const ProfileFiledCard = ( {user}: { user: User } ) => {
  const u = user 
  
  const useDispatch = useAppDispatch();

  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState<User>(u)

  useEffect(() => {
    setDraft(u)
  }, [u])
  
  console.log("ProfileFiledCard ioo - user prop:",isEditing, u);
  const handleChange = (field: keyof User, value: string) => {
    setDraft((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const handleSave = () => {
    useDispatch(updateUserData({
      name: draft.name ?? '',
      phone: draft.phone ?? '', 
    }));
    setIsEditing(false);
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-linear-to-br from-slate-100 to-slate-200 p-0.5 shadow-inner">
            <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-white text-2xl font-semibold text-slate-700">
              {isEditing ? (
                <input
                  type="text"
                  value={draft.avatarUrl ?? ''}
                  onChange={(event) => handleChange('avatarUrl', event.target.value)}
                  placeholder="URL"
                  className="h-full w-full border-0 bg-transparent px-2 text-[10px] text-slate-500 outline-none placeholder:text-slate-400"
                />
              ) : u.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={u.avatarUrl} alt={u.name} className="h-full w-full object-cover" />
              ) : (
                <span>{u.name?.charAt(0) ?? 'U'}</span>
              )}
            </div>
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-xl font-semibold tracking-tight text-slate-900">
              {isEditing ? draft.name || 'Profile' : u.name}
            </h3>
            <p className="truncate text-sm font-medium text-slate-500">
              {isEditing ? draft.email : u.email}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsEditing((value) => !value)}
          className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
        >
          {isEditing ? 'Close Edit' : 'Edit Profile'}
        </button>
      </div>

      <div className="mt-5 border-t border-slate-100 pt-4">
        <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
          <div className="rounded-lg bg-slate-50 px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Name</p>
            {isEditing ? (
              <input
                type="text"
                value={draft.name ?? ''}
                onChange={(event) => handleChange('name', event.target.value)}
                className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 font-medium text-slate-800 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
            ) : (
              <p className="mt-1 font-medium text-slate-800">{u.name}</p>
            )}
          </div>

          {!isEditing && (
            <div className="rounded-lg bg-slate-50 px-3 py-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email</p>
              <p className="mt-1 font-medium text-slate-800">{u.email}</p>
            </div>
          )}

          <div className="rounded-lg bg-slate-50 px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Phone</p>
            {isEditing ? (
              <input
                type="text"
                value={draft.phone ?? ''}
                onChange={(event) => handleChange('phone', event.target.value)}
                className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 font-medium text-slate-800 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
            ) : (
              <p className="mt-1 font-medium text-slate-800">{u.phone}</p>
            )}
          </div>

          {!isEditing && (
            <div className="rounded-lg bg-slate-50 px-3 py-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Joined</p>
              <p className="mt-1 font-medium text-slate-800">{u.joined}</p>
            </div>
          )}
        </div>

        {isEditing && (
          <div className="mt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setDraft(u)
                setIsEditing(false)
              }}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfileFiledCard