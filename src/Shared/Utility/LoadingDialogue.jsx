import React from 'react';
import { PropagateLoader } from 'react-spinners';

const LoadingDialogue = () => {
  return (
    <div>
      <PropagateLoader color='#36d7b7' loading size={15} speedMultiplier={1} />
      <p>Wait a moment...</p>
    </div>
  );
};

export default LoadingDialogue;
