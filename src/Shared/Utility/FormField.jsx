import React from "react";

function FormField({ fillData, idName, labelName, inputType, inputValue, errorName}) {
  return (
    <>
      <label
        htmlFor={idName}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {labelName}
      </label>
      <input
        id={idName}
        onChange={fillData}
        type={inputType}
        value={inputValue}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
      />
      {errorName && <span className="text-red-900">{errorName}</span>}
    </>
  );
}

export default FormField;
