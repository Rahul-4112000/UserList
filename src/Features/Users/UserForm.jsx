import React, { useState, useEffect } from 'react';
import Button from '../../Shared/Utility/Button';
import FormField from '../../Shared/Utility/FormField';
import { UpdateUserFromList, saveUser } from '../../Redux/Slices/user-actions';
import { useDispatch, useSelector } from 'react-redux';
import { userAction } from '../../Redux/Slices/user-slice';
import { Link, useNavigate, useParams } from 'react-router-dom';

const UserForm = () => {
  const { selUser, selUserIndex, users } = useSelector((state) => state.userData);

  const [userData, setUserData] = useState(selUser);
  const [errors, setErrors] = useState({});
  const { name, email, age, mobNum, id } = userData;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    if (selUserIndex >= 0 && selUser.id) {
      setUserData(selUser);
      navigate('/user/' + selUser.id);
    }
  }, [selUserIndex]);

  useEffect(() => {
    if (userId && id === '' && users.length) {
      const selUserIndex = users.findIndex((user) => user.id === userId);
      dispatch(userAction.addSelUser(users[selUserIndex]));
      dispatch(userAction.setSelUserIndex(selUserIndex));
    }
  }, [dispatch, users]);

  const fillData = (event) => {
    setUserData((prevUserData) => {
      let value =
        event.target.id === 'mobNum' || event.target.id === 'age' ? parseInt(event.target.value) : event.target.value;
      return {
        ...prevUserData,
        [event.target.id]: value,
      };
    });
  };

  const userDataValidation = () => {
    let regex = /^[a-zA-Z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    const newErrors = {};

    // Validate name
    if (name.trim() === '') {
      newErrors.name = 'Name is require';
    } else if (!isNaN(userData.name.trim())) {
      newErrors.name = 'Name Should not be number';
    }
    // validate email
    let isEmailValid = regex.test(email);
    if (email.trim() === '') {
      newErrors.email = 'Email is require';
    } else if (!isEmailValid) {
      newErrors.email = 'Email is not valid';
    }
    // validate Age
    if (age === '' || isNaN(age)) {
      newErrors.age = 'Age is require';
    } else if (age < 1 || age > 150) {
      newErrors.age = 'Age is not valid';
    }
    //validate mobile number
    if (mobNum === '' || isNaN(mobNum)) {
      newErrors.mobNum = 'Mobile number is require';
    } else if (mobNum < 0) {
      newErrors.mobNum = "Mobile Number can't be negative";
    } else if (mobNum.toString().length !== 10) {
      newErrors.mobNum = 'Mobile Number should have 10 digits';
    }

    return newErrors;
  };

  const submitUserData = (event) => {
    event.preventDefault();
    const validationError = userDataValidation();
    if (Object.keys(validationError).length !== 0) {
      setErrors(validationError);
      return;
    }
    setErrors(validationError);

    onSaveUser(userData);
  };

  const saveNewUser = (aNewUser) => {
    delete aNewUser.id;
    dispatch(saveUser(aNewUser));
  };

  const updateUser = (aUser) => {
    dispatch(UpdateUserFromList(aUser));
  };

  const onSaveUser = (aUserData) => {
    if (aUserData.id) {
      updateUser(aUserData);
    } else {
      saveNewUser(aUserData);
    }
    navigate('/user');
  };

  const closeModal = () => {
    dispatch(userAction.closeForm());
  };

  const getNextUser = () => {
    dispatch(userAction.setNextUser());
  };

  const getPrevUser = () => {
    dispatch(userAction.setPrevUser());
  };

  return (
    <div className='flex items-center max-w-[700px] m-auto rounded-xl'>
      {userId && (
        <Button
          btnName='PREVIOUS'
          btnType='dark'
          styles='disabled:opacity-25'
          disabled={!selUserIndex && true}
          onClick={getPrevUser}
        />
      )}
      <form className='w-[400px] bg-white mx-auto p-8 shadow-2xl mt-10'>
        <div className='mb-5'>
          <FormField
            fillData={fillData}
            idName='name'
            labelName='Name'
            inputType='text'
            inputValue={name}
            errorName={errors.name}
          />
        </div>
        <div className='mb-5'>
          <FormField
            fillData={fillData}
            idName='email'
            labelName='Your email'
            inputType='text'
            inputValue={email}
            errorName={errors.email}
          />
        </div>
        <div id='age-mob-container' className='flex gap-6 mb-5'>
          <div className='basis-4/12'>
            <FormField
              fillData={fillData}
              idName='age'
              labelName='Age'
              inputType='number'
              inputValue={age}
              errorName={errors.age}
            />
          </div>
          <div className='basis-8/12'>
            <FormField
              fillData={fillData}
              idName='mobNum'
              labelName='Mobile Number'
              inputType='number'
              inputValue={mobNum}
              errorName={errors.mobNum}
            />
          </div>
        </div>

        <Link to='..'>
          <Button btnType='cancel' btnName='Cancel' type='button' onClick={closeModal}></Button>
        </Link>
        <Button btnType='success' btnName='Save' onClick={submitUserData}>
          Save
        </Button>
      </form>
      {userId && (
        <Button
          btnName='NEXT'
          btnType='dark'
          styles='disabled:opacity-25'
          disabled={selUserIndex === users.length - 1 && true}
          onClick={getNextUser}
        />
      )}
    </div>
  );
};

export default UserForm;
