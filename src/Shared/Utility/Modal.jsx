import React from 'react';
import LoadingDialogue from './LoadingDialogue';
import Error from './Error';
import Success from './Success';

const Modal = ({ children, dialogue, dialogName }) => {
  return (
    <dialog open={true} className='absolute top-[10%] shadow-2xl border-2 border-white-500 rounded-xl'>
      {dialogue.loading === dialogName && <LoadingDialogue />}
      {dialogue.error.name === dialogName && <Error errMsg={dialogue.error.msg} />}
      {dialogue.successMsg && <Success msg={dialogue.successMsg} />}
      {children}
    </dialog>
  );
};

export default Modal;
