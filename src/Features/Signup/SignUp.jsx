import React, { useState } from 'react';
import FormField from '../../Shared/Utility/FormField';
import Button from '../../Shared/Utility/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import UserIcon from '../../Shared/Utility/UserIcon';
import { ToastContainer } from 'react-toastify';
import { userAction } from '../Users/Store/user-slice';
import { errToaster } from '../../Shared/UI/Toaster';
import { doSignup } from '../Users/Store/user-actions';
import { setCredential } from '../Login/Store/credential-slice';

const SignUp = () => {
  const [signupUser, setSignupUser] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fullName, email, password } = signupUser;

  const fillData = (event) => {
    setSignupUser((prevUserData) => {
      return {
        ...prevUserData,
        [event.target.id]: event.target.value,
      };
    });
  };

  const signupUserValidation = () => {
    const emailRegex = /^[a-zA-Z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    const passwordRegex = /(?=.*[A-Z])(?=.*[0-9]).{8,}/;
    const newErrors = {};

    // Validate name
    if (fullName.trim() === '') {
      newErrors.fullName = 'Name is require';
    } else if (!isNaN(fullName.trim())) {
      newErrors.fullName = 'Name Should not be number';
    }
    // validate email
    let isEmailValid = emailRegex.test(email);
    if (email.trim() === '') {
      newErrors.email = 'Email is require';
    } else if (!isEmailValid) {
      newErrors.email = 'Email is not valid';
    }

    let isPasswordValid = passwordRegex.test(password);
    if (password === '') {
      newErrors.password = 'Password is require';
    } else if (!isPasswordValid) {
      newErrors.password = 'Must contain 1 uppercase letter, 1 number, min. 8 characters.';
    }
    return newErrors;
  };

  const checkSingupUser = async () => {
    const response = await fetch(`http://localhost:3000/credentials?email=${email}`);
    if (!response.ok) {
      throw new Error();
    }
    const [registeredUser] = await response.json();
    return registeredUser;
  };

  const registerSignupCredential = async (event) => {
    event.preventDefault();
    const validationError = signupUserValidation();
    if (Object.keys(validationError).length !== 0) {
      setErrors(validationError);
      return;
    }
    setErrors(validationError);
    dispatch(userAction.showLoading());
    try {
      const existingSignup = await checkSingupUser();
      if (existingSignup) {
        dispatch(userAction.closeLoading());
        errToaster('User already exist');
        return;
      }
      const signedUpUser = await doSignup(signupUser);
      dispatch(userAction.closeLoading());
      dispatch(setCredential(signedUpUser));
      localStorage.setItem('userId', signedUpUser.id);
      navigate('/home');
    } catch {
      dispatch(userAction.closeLoading());
      errToaster('Something went wrong');
    }
  };
  return (
    <div className='bg-gray-100 flex items-center justify-center h-screen'>
      <div className='bg-white p-8 rounded-lg shadow-lg max-w-sm w-full'>
        <UserIcon />
        <ToastContainer />
        <h2 className='text-2xl font-semibold text-center mb-4'>Create a new account</h2>
        <p className='text-gray-600 text-center mb-6'>Enter your details to register.</p>
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
          <div className='mb-4'>
            <FormField
              fillData={fillData}
              idName='email'
              labelName='Email Address *'
              inputType='text'
              inputValue={email}
              errorName={errors.email}
            />
          </div>
          <div className='mb-4'>
            <FormField
              fillData={fillData}
              idName='password'
              labelName='Password *'
              inputType='password'
              inputValue={password}
              errorName={errors.password}
            />
          </div>
          <Button btnName='Register' btnType='success' styles='w-full' onClick={registerSignupCredential} />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
