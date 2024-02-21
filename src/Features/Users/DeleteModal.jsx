import React from 'react';
import Button from '../../Shared/Utility/Button';
import { useDispatch, useSelector } from 'react-redux';
import { userAction } from '../../Redux/Slices/user-slice';
import { removeUserFromList } from '../../Redux/Slices/user-actions';

const DeleteModal = ({ deleteUserName }) => {
  console.log('<Delete/>');
  const { deleteUser } = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  const cancelDeleteOnConfirmation = () => {
    dispatch(userAction.closeDeleteDialog());
  };

  const DeleteOnConfirmation = () => {
    dispatch(removeUserFromList(deleteUser.id));
  };

  return (
    <div className='p-6'>
      <p className='mb-4'>
        Are you sure you want to remove <strong>{deleteUserName}</strong> ?
      </p>
      <Button btnType='cancel' btnName='Cancel' onClick={cancelDeleteOnConfirmation}></Button>
      <Button btnType='success' btnName='Delete' onClick={DeleteOnConfirmation}></Button>
    </div>
  );
};

export default DeleteModal;
