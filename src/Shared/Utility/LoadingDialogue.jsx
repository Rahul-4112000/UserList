import React from 'react';
import { PropagateLoader } from 'react-spinners';

const LoadingDialogue = () => {
  return (
    <div className='w-60 h-32 mx-auto flex justify-center items-center flex-col bg-gray-100 rounded-lg'>
      <span className='mt-5'>
        <PropagateLoader color='#36d7b7' loading size={15} speedMultiplier={1} />
      </span>
      <p className='mt-8 text-gray-700'>Please wait a moment...</p>
    </div>
  );
};

export default LoadingDialogue;
