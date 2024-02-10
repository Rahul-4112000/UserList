import React, { useState, useEffect } from 'react';

import Button from '../../Shared/Utility/Button';
import FormField from '../../Shared/Utility/FormField';

const UserForm = ({ onAddUser, selUser, closeModal }) => {
  const [userData, setUserData] = useState({
    id: selUser.id,
    name: selUser.name,
    email: selUser.email,
    age: selUser.age,
    mobNum: selUser.mobNum,
  });
  const [errors, setErrors] = useState({});

  const { name, email, age, mobNum, id } = userData;

  const fillData = (event) => {
    setUserData((prevUserData) => {
      let value =
        event.target.id === 'mobNum' || event.target.id === 'age' ? parseInt(event.target.value) : event.target.value;
      value = value ? value : '';
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
    } else if (!(mobNum.toString().length === 10)) {
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

    onAddUser(userData);
  };
  console.log('<UserForm />');
  return (
    <form className='w-[450px] mx-auto shadow-2xl border-2 border-white-500 p-8'>
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

      <Button btnType='cancel' btnName='Cancel' type='button' onClick={closeModal}></Button>
      <Button btnType='success' btnName='Save' onClick={submitUserData}>
        Save
      </Button>
    </form>
  );
};

export default UserForm;
