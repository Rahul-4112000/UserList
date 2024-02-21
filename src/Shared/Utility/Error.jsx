import React from 'react';
import user from '/userError.png';
import close from '/close.png';

const Error = ({ errMsg }) => {
  const closeModal = (key) => {
    dispatch(userAction.closeForm());
    dispatch(userAction.closeDeleteDialog());
    dispatch(uiActions.setDialog({ [key]: false }));
  };
  return (
    <div className='w-[240px] relative mx-auto flex flex-col justify-center items-center gap-4 p-4'>
      <img className='size-8 self-end cursor-pointer' src={close} onClick={() => closeModal('error')} />
      <img className='size-28' src={user} />
      <p>{errMsg}</p>
    </div>
  );
};

export default Error;
