import React from "react";

const SuccessButton = ({ children, styles, ...prop }) => {
  let btnStyles =
    "text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:ring-4 focus:ring-blue-300 ";

  if (styles) {
    btnStyles += styles;
  }

  return (
    <button className={btnStyles} {...prop}>
      {children}
    </button>
  );
};

export default SuccessButton;
