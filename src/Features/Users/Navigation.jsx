import React from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import Button from '../../Shared/Utility/Button';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './Store/user-actions';
import { setCredential } from '../Login/Store/credential-slice';
import { errToaster } from '../../Shared/UI/Toaster';

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const loggedInUser = useSelector((state) => state.credential);

  const setLoggedInUser = async () => {
    const userId = localStorage.getItem('userId');
    try {
      const response = await fetch(`http://localhost:3000/credentials/${userId}`);
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const activeUser = await response.json();
      dispatch(setCredential(activeUser));
    } catch (err) {
      errToaster(err.message);
    }
  };

  useEffect(() => {
    if (location.pathname === '/user/new') {
      navigate('/user');
    }
    dispatch(fetchUsers());
    setLoggedInUser();
  }, [dispatch]);

  const logoutUser = () => {
    dispatch(setCredential(null));
    localStorage.removeItem('userId');
    navigate('/');
  };
  return (
    <div className='flex justify-between sticky w-full z-20 top-0 start-0 border-gray-600 py-3 px-16 items-center bg-gray-200'>
      <h2 className='font-cursive'>Hii {loggedInUser?.fullName.toUpperCase()}</h2>
      <nav>
        <ul className='flex gap-10 font-roboto text-lg'>
          <li>
            <NavLink to='/home' className={({ isActive }) => (isActive ? 'text-blue-500' : '')} end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/user' className={({ isActive }) => (isActive ? 'text-blue-500' : '')} end>
              User
            </NavLink>
          </li>
        </ul>
      </nav>
      <Link>
        <Button btnName='Logout' btnType='success' onClick={logoutUser} />
      </Link>
    </div>
  );
};

export default Navigation;
