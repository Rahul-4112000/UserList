import React, { useState } from 'react';
import FormField from '../../Shared/Utility/FormField';
import Button from '../../Shared/Utility/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import UserIcon from '../../Shared/Utility/UserIcon';
import { userAction } from '../Users/Store/user-slice';
import { errToaster } from '../../Shared/UI/Toaster';
import { setCredential } from './Store/credential-slice';
import { doLogin } from '../Users/Store/user-actions';

const LogIn = () => {
  const [signInUser, setSignInUser] = useState({
    fullName: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fullName, password } = signInUser;

  const fillData = (event) => {
    setSignInUser((prevUserData) => {
      return {
        ...prevUserData,
        [event.target.id]: event.target.value,
      };
    });
  };

  const signInUserValidation = () => {
    const passwordRegex = /(?=.*[A-Z])(?=.*[0-9]).{8,}/;
    const newErrors = {};

    // Validate name
    if (fullName.trim() === '') {
      newErrors.fullName = 'Name is require';
    } else if (!isNaN(fullName.trim())) {
      newErrors.fullName = 'Name Should not be number';
    }

    //validate password
    let isPasswordValid = passwordRegex.test(password);
    if (password === '') {
      newErrors.password = 'Password is require';
    } else if (!isPasswordValid) {
      newErrors.password = 'Must contain 1 uppercase letter, 1 number, min. 8 characters.';
    }
    return newErrors;
  };

  // const doLogin = async () => {
  //   const response = await fetch(`http://localhost:3000/credentials?fullName=${fullName}&&password=${password}`);
  //   if (!response.ok) {
  //     throw new Error();
  //   }
  //   const [loginUser] = await response.json();
  //   return loginUser;
  // };

  const logInForm = async (event) => {
    event.preventDefault();
    const validationError = signInUserValidation();
    if (Object.keys(validationError).length !== 0) {
      setErrors(validationError);
      return;
    }
    setErrors(validationError);
    dispatch(userAction.showLoading());
    try {
      let loginUser = await doLogin(fullName, password);
      dispatch(userAction.closeLoading());
      if (loginUser) {
        dispatch(setCredential(loginUser));
        localStorage.setItem('userId', loginUser.id);
        navigate('/home');
      } else {
        errToaster('Invalid name/password');
      }
    } catch {
      errToaster('Something went wrong');
      dispatch(userAction.closeLoading());
    }
  };
  return (
    <div className='bg-gray-100 flex items-center justify-center h-screen'>
      <div className='bg-white p-8 rounded-lg shadow-lg max-w-sm w-full'>
        <UserIcon />
        <h2 className='text-2xl font-semibold text-center mb-4'>Login</h2>
        <ToastContainer />
        <form>
          <div className='mb-4'>
            <FormField
              fillData={fillData}
              idName='fullName'
              labelName='Full Name *'
              inputType='text'
              inputValue={fullName}
              errorName={errors.fullName}
            />
          </div>
          <div className='mb-3'>
            <FormField
              fillData={fillData}
              idName='password'
              labelName='Password *'
              inputType='password'
              inputValue={password}
              errorName={errors.password}
            />
          </div>
          <Button btnName='Login' btnType='success' styles='w-full' onClick={logInForm} />
          <div className='flex justify-between items-center mt-3 text-sm font-semibold'>
            <p className=' '>
              Not a member?{' '}
              <Link to='/signup' className='text-blue-500 hover:text-blue-700'>
                Signup
              </Link>
            </p>
            <Link className='text-blue-500 hover:text-blue-700'>Forgot Password?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
