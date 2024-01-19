import React from "react";

import { forwardRef } from "react";

const Modal = forwardRef(function Modal({ children }, ref) {
  return <dialog ref={ref} className="shadow-2xl rounded-lg">{children}</dialog>;
});

export default Modal;
