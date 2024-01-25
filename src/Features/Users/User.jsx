import React, { useState } from "react";
import UserForm from "./UserForm";
import UserList from "./UserList";
import Delete from "./Delete";
import { v4 } from "uuid";

const usersListData = [
  {
    id: 1,
    name: "Rahul Lakhvara",
    age: 23,
    email: "rahullaxar786@gmail.com",
    mobNum: 6353805737,
  },
  {
    id: 2,
    name: "Sanjay Suthar",
    age: 22,
    email: "sutharsanjay786@gmail.com",
    mobNum: 9979576857,
  },
  {
    id: 3,
    name: "Jaynti Joshi",
    age: 23,
    email: "joshijaynti@gmail.com",
    mobNum: 9898470339,
  },
  {
    id: 4,
    name: "Rakesh Suthar",
    age: 21,
    email: "sutharrakesh121@gmail.com",
    mobNum: 2531546852,
  },
  {
    id: 5,
    name: "Rohit Giri",
    age: 25,
    email: "girirohit444@gmail.com",
    mobNum: 6521548762,
  },
];

const User = () => {
  const [users, setUsers] = useState(usersListData);
  const [deleteUser, setDeleteUser] = useState(null);
  const [modal, setModal] = useState(null);
  const [selUser, setSelUser] = useState({
    id: null,
    name: "",
    email: "",
    age: "",
    mobNum: "",
  });

  const addNewUser = (aNewUser) => {
    let newId = v4();

    const updateUserData = { ...aNewUser, id: newId };

    setUsers((prevUsers) => {
      return [...prevUsers, updateUserData];
    });
  };

  const saveChangesInUser = (aUpdatedSelUser) => {
    setUsers((prevUsers) => {
      const userIndex = prevUsers.findIndex(
        (user) => user.id === aUpdatedSelUser.id
      );

      const updatedUsers = [...prevUsers];

      updatedUsers[userIndex] = aUpdatedSelUser;

      return updatedUsers;
    });
  };

  const addUser = (aUserData) => {
    if (aUserData.id) {
      saveChangesInUser(aUserData);
    } else {
      addNewUser(aUserData);
    }
    toggleDialogue(null);
  };

  const removeUser = () => {
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== deleteUser.id)
    );
    toggleDialogue(null);
  };

  const onEdit = (aSelUser) => {
    setSelUser(aSelUser);
    toggleDialogue("formModal");
  };

  const toggleDialogue = (modalName) => {
    setModal(modalName);
  };

  const onDeleteUser = (aUser) => {
    setDeleteUser(aUser);
    toggleDialogue("deleteModal");
  };

  const cancelDeleteConfirmation = () => {
    setDeleteUser(null);
    toggleDialogue(null);
  };

  const successDeleteConfirmation = () => {
    removeUser();
    setUserDeleteId(null);
    toggleDialogue(null);
  };

  const openEmptyUserForm = () => {
    toggleDialogue("formModal");
    setSelUser({
      id: null,
      name: "",
      email: "",
      age: "",
      mobNum: "",
    });
  };

  console.log("USER RENDER");

  return (
    <div className="relative">
      <UserList
        usersList={users}
        onEdit={onEdit}
        onDeleteUser={onDeleteUser}
        onOpenEmptyUserForm={openEmptyUserForm}
      />
      <dialog open={modal === "formModal"} className="absolute top-[15%]">
        <UserForm
          key={selUser.id}
          selUser={selUser}
          onAddUser={addUser}
          toggleDialogue={toggleDialogue}
        />
      </dialog>
      <dialog open={modal === "deleteModal"} className="absolute top-[50%]">
        <Delete
          onCancelDeleteConfirmation={cancelDeleteConfirmation}
          onSuccessDeleteConfirmation={successDeleteConfirmation}
          deleteUserName={deleteUser?.name}
        />
      </dialog>
    </div>
  );
};

export default User;
