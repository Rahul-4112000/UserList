import React from 'react';
import user from '/userError.png';
import close from '/close.png';

const Error = ({ errMsg, closeModal }) => {
  return (
    <div className='w-[200px] relative mx-auto flex flex-col justify-center items-center gap-4 p-4'>
      <img className='size-8 self-end cursor-pointer' src={close} onClick={closeModal} />
      <img className='size-28' src={user} />
      <p>{errMsg}</p>
    </div>
  );
};

export default Error;
