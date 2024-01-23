import React, { useRef, useState } from "react";
import UserForm from "./UserForm";
import UserList from "./UserList";
import Modal from "../../Shared/UI/Modal";
import Delete from "./Delete";
import { v4 as uuidv4 } from "uuid";

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
    email: "joshiJaynti@gmail.com",
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
  const [secUser, setSecUser] = useState({
    id: null,
    name: "",
    email: "",
    age: "",
    mobNum: "",
  });

  const userFormDialog = useRef();
  const deleteConfirmDialog = useRef();
  const selectedUser = useRef();

  const addNewUser = (aNewUser) => {
    let newId = uuidv4();

    const updateUserData = { ...aNewUser, id: newId };

    setUsers((prevUsers) => {
      return [...prevUsers, updateUserData];
    });
  };

  const saveChangesInUser = (aUpdatedSecUser) => {
    setUsers((prevUsers) => {
      const userIndex = prevUsers.findIndex(
        (user) => user.id === aUpdatedSecUser.id
      );

      const updatedUsers = [...prevUsers];

      updatedUsers[userIndex] = aUserData;

      return updatedUsers;
    });
  };

  const addUser = (aUserData) => {
    if (aUserData.id) {
      saveChangesInUser(aUserData);
      setSecUser({
        id: null,
        name: "",
        email: "",
        age: "",
        mobNum: "",
      });
    } else {
      addNewUser(aUserData);
    }
    toggleModal("userForm", false);
  };

  const removeUser = () => {
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== selectedUser.current)
    );
  };

  const onEdit = (aSecUser) => {
    setSecUser(aSecUser);
    toggleModal("userForm", true);
  };

  const toggleModal = (aModalName, aIsModalShow) => {
    let ref;
    switch (aModalName) {
      case "userForm":
        ref = userFormDialog;
        break;
      case "deleteConfirmation":
        ref = deleteConfirmDialog;
        break;
    }

    aIsModalShow ? ref.current.showModal() : ref.current.close();
  };

  const handleDeleteUserId = (aUserId) => {
    selectedUser.current = aUserId;
    toggleModal("deleteConfirmation", true);
  };

  const restUserForm = () => {
    setSecUser({
      id: null,
      name: "",
      email: "",
      age: "",
      mobNum: "",
    });
    toggleModal("userForm", false);
  };


  return (
    <div>
      <UserList
        usersList={users}
        onEdit={onEdit}
        toggleModal={toggleModal}
        handleDeleteUserId={handleDeleteUserId}
      />
      <Modal ref={userFormDialog}>
        <UserForm
          key={secUser.id}
          toggleModal={toggleModal}
          secUser={secUser}
          addUser={addUser}
          onReset={restUserForm}
        />
      </Modal>
      <Modal ref={deleteConfirmDialog}>
        <Delete toggleModal={toggleModal} removeUser={removeUser} />
      </Modal>
    </div>
  );
};

export default User;
