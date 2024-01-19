import React from "react";

const  CancelButton = ({ children, styles, ...prop }) => {
  let btnStyles =
    "focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ";

  if (styles) {
    btnStyles += styles;
  }

  return (
    <button className={btnStyles} {...prop}>
      {children}
    </button>
  );
}

export default CancelButton;
