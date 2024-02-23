import React from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import Button from '../../Shared/Utility/Button';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, getCredentials } from '../../Redux/Slices/user-actions';
import { addCredential } from '../../Redux/Slices/credential-slice';

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const activeUser = useSelector((state) => state.credential);
  const token = localStorage.getItem('userId');

  const loggedOutRoute = () => {
    if (!token) {
      navigate('/login');
    }
  };

  const setLoggedInUser = async () => {
    const credentials = await getCredentials();
    const loggedUser = credentials.find((credential) => credential.id === token);
    dispatch(addCredential(loggedUser));
  };

  useEffect(() => {
    loggedOutRoute();
    if (location.pathname === '/user/new') {
      navigate('/user');
    }
    dispatch(fetchUsers());
    if (!activeUser) {
      setLoggedInUser();
    }
  }, [dispatch]);

  const logoutUser = () => {
    dispatch(addCredential(null));
    localStorage.removeItem('userId');
    navigate('/');
  };
  return (
    <div className='flex justify-between <nav class="sticky w-full z-20 top-0 start-0 border-gray-600 py-3 px-16 items-center bg-gray-200'>
      <h2 className='font-cursive'>Hii {activeUser?.fullName.toUpperCase()}</h2>
      <nav>
        <ul className='flex gap-10 font-roboto text-lg'>
          <li>
            <NavLink to='/home' className={({ isActive }) => isActive && 'text-blue-500'} end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/user' className={({ isActive }) => isActive && 'text-blue-500'} end>
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
