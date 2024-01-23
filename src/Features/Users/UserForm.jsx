import React, { useState, useEffect } from "react";

import Button from "../../Shared/Utility/Button";

const UserForm = ({addUser, secUser,onReset }) => {
  const [userData, setUserData] = useState({
    id: secUser.id,
    name: secUser.name,
    email: secUser.email,
    age: secUser.age,
    mobNum: secUser.mobNum,
  });
  const [errors, setErrors] = useState({});

  const { name, email, age, mobNum, id } = userData;

  const fillData = (event) => {
    setUserData((prevUserData) => {
      let value =
        event.target.id === "mobNum" || event.target.id === "age"
          ? parseInt(event.target.value)
          : event.target.value;
      return {
        ...prevUserData,
        [event.target.id]: value,
      };
    });
  };

  const userDataValidation = () => {
    let regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    const newErrors = {};

    // Validate name
    if (name.trim() === "") {
      newErrors.name = "Name is require";
    } else if (!isNaN(userData.name.trim())) {
      newErrors.name = "Name Should not be number";
    }

    // validate email
    let isEmailValid = regex.test(email);
    if (email.trim() === "") {
      newErrors.email = "Email is require";
    } else if (!isEmailValid) {
      newErrors.email = "Email is not valid";
    }

    if (age === "" || isNaN(age)) {
      newErrors.age = "Age is require";
    }

    //validate mobile number
    if (mobNum === "" || isNaN(mobNum)) {
      newErrors.mobNum = "Mobile number is require";
    } else if (mobNum < 0) {
      newErrors.mobNum = "Mobile Number can't be negative";
    } else if (!(mobNum.toString().length === 10)) {
      newErrors.mobNum = "Mobile Number should have 10 digits";
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

    addUser(userData);
  };


  return (
    <form className="w-[450px] mx-auto border-2 p-8" onSubmit={submitUserData}>
      <div className="mb-5">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={fillData}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
        />
        {errors.name && <span className="text-red-900">{errors.name}</span>}
      </div>
      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Your email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={fillData}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
          placeholder="e.g. name@gmail.com"
        />
        {errors.email && <span className="text-red-900">{errors.email}</span>}
      </div>
      <div id="age-mob-container" className="flex gap-6 mb-5">
        <div className="basis-4/12">
          <label
            htmlFor="age"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Age
          </label>
          <input
            id="age"
            type="number"
            min="1"
            max="150"
            value={age}
            onChange={fillData}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
          />
          {errors.age && <span className="text-red-900">{errors.age}</span>}
        </div>
        <div className="basis-8/12">
          <label
            htmlFor="mobile"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Mobile Number
          </label>
          <input
            id="mobNum"
            type="number"
            value={mobNum}
            onChange={fillData}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
          />
          {errors.mobNum && (
            <span className="text-red-900">{errors.mobNum}</span>
          )}
        </div>
      </div>

      <Button btnType="cancel" btnName="Cancel" onClick={onReset}></Button>

      <Button btnType="success" btnName="Save" type="submit">
        Save
      </Button>
    </form>
  );
};

export default UserForm;
