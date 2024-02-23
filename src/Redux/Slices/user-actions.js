import { toast } from 'react-toastify';
import { userAction } from './user-slice';
import { addCredential } from './credential-slice';
const { addInitialUsers, addUser, removeUser, updateUserData } = userAction;

const error = (errMsg) => {
  toast.error(errMsg, {
    position: 'top-right',
    theme: 'dark',
  });
};

const success = (successMsg) => {
  toast.success(successMsg, {
    position: 'top-right',
    theme: 'dark',
  });
};

export const getCredentials = async () => {
  const response = await fetch('http://localhost:3000/credentials');
  const credentials = await response.json();
  return credentials;
};

export const sendCredential = async (aSignupUser) => {
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
        throw new Error("Oops!! User can't be add");
      }

      const addedUser = await response.json();
      dispatch(addUser(addedUser));
      success('New User Added');
    } catch (err) {
      error(err.message);
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
        throw new Error("Oops!! Changes can't be saved");
      }

      const updatedUser = await response.json();
      success('Changes saved!!!');
      dispatch(updateUserData(updatedUser));
    } catch (err) {
      error(err.message);
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
        throw new Error("Oops!! User can't be deleted");
      }

      await response.json();
      dispatch(removeUser(aUserId));
      success('User Deleted!!!');
    } catch (err) {
      error(err.message);
    }
  };
};
