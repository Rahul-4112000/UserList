import React from "react";

const Button = ({ btnType, btnName, styles, ...prop }) => {
  let btnStyles;

  switch (btnType) {
    case "success":
      btnStyles =
        "text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:ring-4 focus:ring-blue-300 ";
      break;

    case "cancel":
      btnStyles =
        "focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ";
      break;

    default:
      btnStyles = "";
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
