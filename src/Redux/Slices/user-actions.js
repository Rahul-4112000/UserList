export const DIALOG_NAMES = {
  USER_DIALOG: 'USER_DIALOG',
  FORM_DIALOG: 'FORM_DIALOG',
  DELETE_DIALOG: 'DELETE_DIALOG',
};

import { uiActions } from './ui-slice';
import { userAction } from './user-slice';
const { setDialog } = uiActions;
const { addInitialUsers, addUser, removeUser, updateUserData } = userAction;

export const fetchUsers = () => {
  return async (dispatch) => {
    dispatch(
      setDialog({
        loading: DIALOG_NAMES.USER_DIALOG,
      })
    );

    try {
      const response = await fetch('http://localhost:3000/users');
      if (!response.ok) {
        throw new Error('Something went wrong while fetching users!!!');
      }
      const users = await response.json();
      dispatch(addInitialUsers(users));
    } catch (err) {
      dispatch(
        setDialog({
          error: { name: DIALOG_NAMES.USER_DIALOG, msg: err.message },
        })
      );
    }
    dispatch(
      setDialog({
        loading: false,
      })
    );
  };
};

export const saveUser = (aUser) => {
  return async (dispatch) => {
    dispatch(
      setDialog({
        loading: DIALOG_NAMES.FORM_DIALOG,
      })
    );

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
      dispatch(
        setDialog({
          successMsg: 'New User Added',
        })
      );
      dispatch(addUser(addedUser));
    } catch (err) {
      dispatch(
        setDialog({
          error: { name: DIALOG_NAMES.FORM_DIALOG, msg: err.message },
        })
      );
    }

    dispatch(
      setDialog({
        loading: false,
      })
    );
  };
};

export const UpdateUserFromList = (aUser) => {
  return async (dispatch) => {
    dispatch(
      setDialog({
        loading: DIALOG_NAMES.FORM_DIALOG,
      })
    );

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

      const addedUser = await response.json();
      dispatch(
        setDialog({
          successMsg: 'Changes saved!!!',
        })
      );
      dispatch(updateUserData(addedUser));
    } catch (err) {
      dispatch(
        setDialog({
          error: { name: DIALOG_NAMES.FORM_DIALOG, msg: err.message },
        })
      );
    }

    dispatch(
      setDialog({
        loading: false,
      })
    );
  };
};

export const removeUserFromList = (aUserId) => {
  return async (dispatch) => {
    dispatch(
      setDialog({
        loading: DIALOG_NAMES.DELETE_DIALOG,
      })
    );

    try {
      const response = await fetch(`http://localhost:3000/users/${aUserId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error("Oops!! User can't be deleted");
      }

      const addedUser = await response.json();
      dispatch(
        setDialog({
          successMsg: 'User Deleted!!!',
        })
      );
      dispatch(removeUser(aUserId));
    } catch (err) {
      dispatch(
        setDialog({
          error: { name: DIALOG_NAMES.DELETE_DIALOG, msg: err.message },
        })
      );
    }

    dispatch(
      setDialog({
        loading: false,
      })
    );
  };
};
