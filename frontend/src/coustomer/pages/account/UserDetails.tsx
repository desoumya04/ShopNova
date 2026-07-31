import React, { useEffect } from 'react'
import ProfileFiledCard from './ProfileFiledCard'
import { useAppDispatch, useAppSelector } from '../../../Redux_toolkit/store';
import { fetchUserData } from '../../../Redux_toolkit/coustomer/userSlice';

const UserDetails = () => {

  const dispatch = useAppDispatch();

  const user = useAppSelector(state => state.user.name);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  if (!user) {
    return <div>Loading user details...</div>;
  }
  

  return (
    
          <ProfileFiledCard user={user} />
  )
}

export default UserDetails
