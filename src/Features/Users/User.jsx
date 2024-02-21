import React, { useState, useCallback, useEffect } from 'react';
import UserForm from './UserForm';
import UserList from './UserList';
import DeleteModal from './DeleteModal';
import LoadingDialogue from '../../Shared/Utility/LoadingDialogue';
import Error from '../../Shared/Utility/Error';
import Modal from '../../Shared/Utility/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { DIALOG_NAMES, fetchUsers } from '../../Redux/Slices/user-actions';
const { USER_DIALOG, FORM_DIALOG, DELETE_DIALOG } = DIALOG_NAMES;

const User = () => {
  const { selUser, deleteUser } = useSelector((state) => state.userData);
  const dialog = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  console.log('<User />');
  //fetch registered users
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (dialog.loading === USER_DIALOG) {
    return <LoadingDialogue />;
  }

  if (dialog.error.name === USER_DIALOG) {
    return <Error errMsg={dialog.error.msg} />;
  }
  return (
    <div className='relative bg-black h-dvh'>
      <UserList />

      {selUser && (
        <Modal dialogue={dialog} dialogName={FORM_DIALOG}>
          {!dialog.loading && !dialog.successMsg && !dialog.error && <UserForm />}
        </Modal>
      )}

      {deleteUser && (
        <Modal dialogue={dialog} dialogName={DELETE_DIALOG}>
          {!dialog.loading && !dialog.successMsg && !dialog.error && <DeleteModal deleteUserName={deleteUser?.name} />}
        </Modal>
      )}
    </div>
  );
};

export default User;
