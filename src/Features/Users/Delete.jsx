import React from "react";
import Button from "../../Shared/Utility/Button";

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
      <Button
        btnType="cancel"
        btnName="Cancel"
        onClick={() => closeDeleteConfirmationModal()}
      ></Button>
      <Button
        btnType="success"
        btnName="Delete"
        onClick={() => closeDeleteConfirmationModal(true)}
      ></Button>
    </div>
  );
};

export default Delete;
