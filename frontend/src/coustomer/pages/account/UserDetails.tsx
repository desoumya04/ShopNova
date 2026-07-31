import React, { useEffect } from 'react'
import ProfileFiledCard from './ProfileFiledCard'
import { useAppDispatch, useAppSelector } from '../../../Redux_toolkit/store';
import { fetchUserData } from '../../../Redux_toolkit/coustomer/userSlice';

const UserDetails = () => {

  const dispatch = useAppDispatch();

  const User = useAppSelector(state => state.user);
  console.log("UserDetails component - User state:", User);
  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  if (!User) {
    return <div>Loading user details...</div>;
  }
  

  return (
    
          <ProfileFiledCard user={User} />
  )
}

export default UserDetails
