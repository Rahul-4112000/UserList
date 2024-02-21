import React from 'react';

const Button = ({ btnType, btnName, styles, ...prop }) => {
  let btnStyles;

  switch (btnType) {
    case 'success':
      btnStyles =
        'text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 text-white border-gray-600 bg-gray-600 hover:bg-gray-700 focus:ring-gray-400 focus:ring-4 ';
      break;

    case 'cancel':
      btnStyles =
        'focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ';
      break;

    default:
      btnStyles = '';
      break;
  }

  if (styles) {
    btnStyles += styles;
  }

  return (
    <button className={btnStyles} {...prop}>
      {btnName}
    </button>
  );
};

export default Button;
