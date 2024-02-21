import React from 'react';
import success from '/success.png';
import close from '/close.png';
import { uiActions } from '../../Redux/Slices/ui-slice';
import { useDispatch } from 'react-redux';
import { userAction } from '../../Redux/Slices/user-slice';

const Success = ({ msg }) => {
  const dispatch = useDispatch();
  const closeModal = (key) => {
    dispatch(userAction.closeForm());
    dispatch(userAction.closeDeleteDialog());
    dispatch(uiActions.setDialog({ [key]: false }));
  };
  return (
    <div className='w-[200px] flex flex-col justify-center items-center gap-4 p-4'>
      <img className='size-8 self-end cursor-pointer' src={close} onClick={() => closeModal('successMsg')} />
      <img className='size-24' src={success} alt='success icon' />
      <p>{msg}</p>
    </div>
  );
};

export default Success;
