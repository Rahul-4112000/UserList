import React from 'react';
import LoadingDialogue from './LoadingDialogue';
import Error from './Error';
import Success from './Success';

const Modal = ({ children, dialogue, dialogName, closeModal }) => {
  return (
    <dialog open={true} className='absolute top-[15%] shadow-2xl border-2 border-white-500 rounded-xl'>
      {dialogue.loading === dialogName && <LoadingDialogue />}
      {dialogue.error.name === dialogName && <Error errMsg={dialogue.error.msg} closeModal={closeModal} />}
      {dialogue.successMsg && <Success closeModal={closeModal} msg={dialogue.successMsg} />}
      {children}
    </dialog>
  );
};

export default Modal;
