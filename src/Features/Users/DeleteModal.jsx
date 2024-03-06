import React from 'react';
import Button from '../../Shared/Utility/Button';
import { useDispatch, useSelector } from 'react-redux';
import { userAction } from './Store/user-slice';
import { removeUserFromList } from './Store/user-actions';

const DeleteModal = () => {
  const { deleteUser } = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  const cancelDeleteOnConfirmation = () => {
    dispatch(userAction.resetDelUser());
  };

  const DeleteOnConfirmation = () => {
    dispatch(removeUserFromList(deleteUser.id));
  };

  return (
    <div className='p-6 absolute bg-white shadow-lg border rounded-lg top-30'>
      <p className='mb-4'>
        Are you sure you want to remove <strong>{deleteUser.name}</strong> ?
      </p>
      <Button btnType='cancel' btnName='Cancel' onClick={cancelDeleteOnConfirmation}></Button>
      <Button btnType='dark' btnName='Delete' onClick={DeleteOnConfirmation}></Button>
    </div>
  );
};

export default DeleteModal;
