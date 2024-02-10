import React from 'react';
import success from '/success.png';
import close from '/close.png';

const Success = ({ msg, closeDialogue }) => {
  return (
    <div>
      <img className='size-10' src={close} onClick={closeDialogue} />
      <img className='size-24' src={success} alt='success icon' />
      <p>{msg}</p>
    </div>
  );
};

export default Success;
