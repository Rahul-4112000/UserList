import React, { useEffect, useState } from 'react';
import FormField from '../../Shared/Utility/FormField';
import Button from '../../Shared/Utility/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCredential } from '../../Redux/Slices/credential-slice';
import { getCredentials } from '../../Redux/Slices/user-actions';
import { FadeLoader } from 'react-spinners';

const LogIn = () => {
  const [signInUser, setSignInUser] = useState({
    fullName: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isCredentialValid, setIsCredentialValid] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fullName, password } = signInUser;

  useEffect(() => {
    const token = localStorage.getItem('userId');
    if (token) {
      navigate('/home');
    }
  }, []);

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

  const validateCredential = (credentials) => {
    const registeredUser = credentials.find((credential) => {
      return credential.fullName === fullName && credential.password === password;
    });
    return registeredUser;
  };

  const submitUserData = async (event) => {
    event.preventDefault();
    const validationError = signInUserValidation();
    if (Object.keys(validationError).length !== 0) {
      setErrors(validationError);
      return;
    }
    setErrors(validationError);
    setLoading(true);
    const credentials = await getCredentials();
    const registeredUser = validateCredential(credentials);
    setLoading(false);
    if (registeredUser) {
      dispatch(addCredential(registeredUser));
      localStorage.setItem('userId', registeredUser.id);
      navigate('/home');
      setIsCredentialValid(true);
    } else {
      setIsCredentialValid(false);
    }
  };
  return (
    <div className='bg-gray-100 flex items-center justify-center h-screen'>
      <div className='bg-white p-8 rounded-lg shadow-lg max-w-sm w-full'>
        <div className='flex justify-center mb-6'>
          <span className='inline-block bg-gray-200 rounded-full p-3'>
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
              <path
                fill='currentColor'
                d='M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4'
              />
            </svg>
          </span>
        </div>
        <h2 className='text-2xl font-semibold text-center mb-4'>Login</h2>
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
          {loading ? (
            <div className='flex justify-center pt-3'>
              <FadeLoader color='#36d7b7' height={6} margin={-6} radius={5} width={4} />
            </div>
          ) : (
            <Button btnName='Login' btnType='success' styles='w-full' onClick={submitUserData} />
          )}
          {!isCredentialValid && <p className='text-gray-600 text-xs my-3'>Invalid Username/Password</p>}
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
