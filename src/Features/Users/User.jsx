import React, { useState, useCallback, useEffect } from 'react';
import UserForm from './UserForm';
import UserList from './UserList';
import DeleteModal from './DeleteModal';
import LoadingDialogue from '../../Shared/Utility/LoadingDialogue';
import Error from '../../Shared/Utility/Error';
import Modal from '../../Shared/Utility/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../Redux/Slices/ui-slice';
import {
  DIALOG_NAMES,
  UpdateUserFromList,
  fetchUsers,
  removeUserFromList,
  saveUser,
} from '../../Redux/Slices/user-actions';
const { USER_DIALOG, FORM_DIALOG, DELETE_DIALOG } = DIALOG_NAMES;
const initialUser = {
  id: null,
  name: '',
  email: '',
  age: '',
  mobNum: '',
};

const User = () => {
  const users = useSelector((state) => state.users);
  const dialog = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const [deleteUser, setDeleteUser] = useState(null);
  const [selUser, setSelUser] = useState(null);

  //fetch registered users
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // common function
  const closeModal = (key) => {
    setDeleteUser(null);
    setSelUser(null);
    dispatch(uiActions.setDialog({ [key]: false }));
  };

  // functions for userList
  const showForm = useCallback((aSelUser) => {
    if (aSelUser) {
      setSelUser(aSelUser);
      return;
    }
    setSelUser(initialUser);
  }, []);

  const onDeleteUser = useCallback((aUser) => {
    setDeleteUser(aUser);
  }, []);

  // functions for userForm
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
  };

  // functions for Delete
  const cancelDeleteOnConfirmation = () => {
    setDeleteUser(null);
    closeModal();
  };

  const DeleteOnConfirmation = () => {
    dispatch(removeUserFromList(deleteUser.id));
  };

  if (dialog.loading === USER_DIALOG) {
    return <LoadingDialogue />;
  }

  if (dialog.error.name === USER_DIALOG) {
    return <Error errMsg={dialog.error.msg} closeModal={closeModal} />;
  }
  return (
    <div className='relative'>
      <UserList usersList={users} onShowForm={showForm} onDeleteUser={onDeleteUser} />

      {selUser && (
        <Modal dialogue={dialog} dialogName={FORM_DIALOG} closeModal={closeModal}>
          {!dialog.loading && !dialog.successMsg && !dialog.error && (
            <UserForm selUser={selUser} onSaveUser={onSaveUser} closeModal={closeModal} />
          )}
        </Modal>
      )}

      {deleteUser && (
        <Modal dialogue={dialog} dialogName={DELETE_DIALOG} closeModal={closeModal}>
          {!dialog.loading && !dialog.successMsg && !dialog.error && (
            <DeleteModal
              onCancelDeleteConfirmation={cancelDeleteOnConfirmation}
              onSuccessDeleteConfirmation={DeleteOnConfirmation}
              deleteUserName={deleteUser?.name}
            />
          )}
        </Modal>
      )}
    </div>
  );
};

export default User;
