import React from "react";
import CancelButton from "../Utility/UI/CancelButton";
import SuccessButton from "../Utility/UI/successButton";

const Delete = ({ toggleModal, removeUser }) => {
  
  const closeDeleteConfirmationModal = (aShouldUserRemove) => {
    if (aShouldUserRemove) {
      removeUser();
    }
    toggleModal("deleteConfirmation", false);
  };

  return (
    <div className="p-6 rounded-md">
      <p className="mb-4">Are you sure you want to remove this user ?</p>
      <CancelButton onClick={() => closeDeleteConfirmationModal()}>
        Cancel
      </CancelButton>
      <SuccessButton onClick={() => closeDeleteConfirmationModal(true)}>
        Delete
      </SuccessButton>
    </div>
  );
};

export default Delete;
