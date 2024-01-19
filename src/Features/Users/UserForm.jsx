import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import CancelButton from "../Utility/UI/CancelButton";
import SuccessButton from "../Utility/UI/successButton";

const UserForm = ({
  toggleModal,
  addNewUser,
  existingUser,
  setExistingUser,
  saveChangesToExistingUser,
}) => {
  const [userData, setUserData] = useState({
    id: 0,
    name: "",
    email: "",
    age: "",
    mobNum: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    mobNum: "",
  });

  const { name, email, age, mobNum, id } = userData;

  useEffect(() => {
    if (existingUser) {
      setUserData({
        id: existingUser.id || 0,
        name: existingUser.name || "",
        email: existingUser.email || "",
        age: existingUser.age || "",
        mobNum: existingUser.mobNum || "",
      });
    }
  }, [existingUser]);

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
    let isValid = true;
    const newErrors = { ...errors };

    // Validate name
    if (!isNaN(userData.name.trim())) {
      newErrors.name = "Name Should not be number";
      isValid = false;
    } else {
      newErrors.name = "";
    }

    let isEmailValid = regex.test(email);

    if (!isEmailValid) {
      newErrors.email = "Email is not valid";
      isValid = false;
    } else {
      newErrors.email = "";
    }

    if (mobNum < 0) {
      newErrors.mobNum = "Mobile Number can't be negative";
      isValid = false;
    } else if (!(mobNum.toString().length === 10)) {
      newErrors.mobNum = "Mobile Number should have 10 digits";
      isValid = false;
    } else {
      newErrors.mobNum = "";
    }

    setErrors(newErrors);

    return isValid;
  };

  const resetUserData = () => {
    setUserData({
      id: null,
      name: "",
      email: "",
      age: "",
      mobNum: "",
    });
  };

  const submitUserData = (event, aExistingUserId) => {
    event.preventDefault();
    const isUserDataValidate = userDataValidation();

    if (!isUserDataValidate) {
      return false;
    }

    if (aExistingUserId) {
      saveChangesToExistingUser(aExistingUserId, userData);
    } else {
      let newId = uuidv4();

      const updateUserData = { ...userData, id: newId };

      addNewUser(updateUserData);
    }

    resetUserData();

    toggleModal("userForm", false);
  };

  const restHandler = () => {
    resetUserData();
    setExistingUser(null);
    toggleModal("userForm", false);
  };

  return (
    <form
      className="w-[450px] mx-auto border-2 p-8"
      onSubmit={(event) => submitUserData(event, id)}
    >
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
          required
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
          required
        />
        {errors.email && <span className="text-red-900">{errors.email}</span>}
      </div>
      <div id="age-mob-container" className="flex gap-6 mb-5">
        <div className="basis-3/12">
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
            required
          />
        </div>
        <div className="basis-9/12">
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
            required
          />
          {errors.mobNum && (
            <span className="text-red-900">{errors.mobNum}</span>
          )}
        </div>
      </div>

      <CancelButton onClick={restHandler}>Cancel</CancelButton>

      <SuccessButton type="submit">Save</SuccessButton>
    </form>
  );
};

export default UserForm;
