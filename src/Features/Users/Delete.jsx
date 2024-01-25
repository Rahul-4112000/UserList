import React from "react";
import Button from "../../Shared/Utility/Button";

const Delete = ({
  onCancelDeleteConfirmation,
  onSuccessDeleteConfirmation,
  deleteUserName
}) => {
  return (
    <div className="p-6 rounded-md shadow-2xl border-2 border-white-500">
      <p className="mb-4">Are you sure you want to remove <strong>{deleteUserName}</strong> ?</p>
      <Button
        btnType="cancel"
        btnName="Cancel"
        onClick={onCancelDeleteConfirmation}
      ></Button>
      <Button
        btnType="success"
        btnName="Delete"
        onClick={onSuccessDeleteConfirmation}
      ></Button>
    </div>
  );
};

export default Delete;
