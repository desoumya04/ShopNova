import  { useEffect } from 'react'
import ProfileFiledCard from './ProfileFiledCard'
import { useAppDispatch, useAppSelector } from '../../../Redux_toolkit/store';
import { fetchUserData } from '../../../Redux_toolkit/coustomer/userSlice';

const UserDetails = () => {

  const dispatch = useAppDispatch();

  const userState = useAppSelector(state => state.user);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const user = {
    name: userState.name ?? undefined,
    email: userState.email ?? undefined,
    phone: userState.phone ?? undefined,
    role: userState.role ?? undefined,
    joined: userState.joined ?? undefined,
  };

  if (userState.loading) {
    return <div>Loading user details...</div>;
  }

  return <ProfileFiledCard user={user} />
}

export default UserDetails
