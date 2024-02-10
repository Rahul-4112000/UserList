import React from 'react';
import user from '/userError.png';
import close from '/close.png';

const Error = ({ errMsg, closeDialogue }) => {
  return (
    <div className='relative'>
      <img className='size-10' src={close} onClick={closeDialogue} />
      <img className='size-28' src={user} />
      <p>{errMsg}</p>
    </div>
  );
};

export default Error;
