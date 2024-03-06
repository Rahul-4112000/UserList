import { userAction } from './user-slice';
import { errToaster, successToaster } from '../../../Shared/UI/Toaster';
const { addInitialUsers, addUser, removeUser, updateUser } = userAction;

export const doLogin = async (fullName, password) => {
  const response = await fetch(`http://localhost:3000/credentials?fullName=${fullName}&&password=${password}`);
  if (!response.ok) {
    throw new Error();
  }
  const [loginUser] = await response.json();
  return loginUser;
};

export const doSignup = async (aSignupUser) => {
  const response = await fetch('http://localhost:3000/credentials', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(aSignupUser),
  });
  const registeredUser = await response.json();
  return registeredUser;
};

export const fetchUsers = () => {
  return async (dispatch) => {
    const response = await fetch('http://localhost:3000/users');
    if (!response.ok) {
      throw new Error('Something went wrong while fetching users!!!');
    }
    const users = await response.json();
    dispatch(addInitialUsers(users));
  };
};

export const saveUser = (aUser) => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(aUser),
      });

      if (!response.ok) {
        throw new Error();
      }

      const addedUser = await response.json();
      dispatch(addUser(addedUser));
      successToaster('New User Added');
    } catch {
      errToaster("Oops!! User can't be add");
    }
  };
};

export const UpdateUserFromList = (aUser) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${aUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(aUser),
      });

      if (!response.ok) {
        throw new Error();
      }

      const updatedUser = await response.json();
      successToaster('Changes saved!!!');
      dispatch(updateUser(updatedUser));
    } catch {
      errToaster("Oops!! Changes can't be saved");
    }
  };
};

export const removeUserFromList = (aUserId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${aUserId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error();
      }

      await response.json();
      dispatch(removeUser());
      successToaster('User Deleted!!!');
    } catch (err) {
      errToaster("Oops!! User can't be deleted");
    }
  };
};
