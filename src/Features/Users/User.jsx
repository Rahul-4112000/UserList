import React, { useRef, useState } from "react";
import UserForm from "./UserForm";
import UserList from "./UserList";
import Modal from "../Shared/modal";
import Delete from "./Delete";

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
  const [userList, setUserList] = useState(usersListData);
  const [userDeleteId, setUserDeleteId] = useState(null);
  const [existingUser, setExistingUser] = useState(null);

  const userFormDialog = useRef();
  const deleteConfirmDialog = useRef();

  const addNewUser = (aUser) => {
    setUserList((prevUsers) => {
      return [...prevUsers, aUser];
    });
  };

  const saveChangesToExistingUser = (aExistingUserId,aUserData) => {
    const updateUserList = userList.map((user) => {
      if (user.id === aExistingUserId) {
        return { ...aUserData };
      }
      return user;
    });
    setUserList(updateUserList);
  };

  const removeUser = () => {
    setUserList((prevUsers) => {
      const updateUsers = prevUsers.filter((user) => user.id !== userDeleteId);
      return updateUsers;
    });
  };

  const setUserState = (aExistingUser) => {
    setExistingUser(aExistingUser);
    toggleModal("userForm", true);
  };

  const toggleModal = (aModalName, aShouldModalShow) => {
    let ref;
    switch (aModalName) {
      case "userForm":
        ref = userFormDialog;
        break;
      case "deleteConfirmation":
        ref = deleteConfirmDialog;
        break;
    }

    aShouldModalShow ? ref.current.showModal() : ref.current.close();
  };

  const handleDeleteUserId = (aUserId) => {
    setUserDeleteId(aUserId);
    toggleModal("deleteConfirmation", true);
  };

  return (
    <div>
      <UserList
        usersList={userList}
        setUserState={setUserState}
        toggleModal={toggleModal}
        handleDeleteUserId={handleDeleteUserId}
        
      />
      <Modal ref={userFormDialog}>
        <UserForm
          toggleModal={toggleModal}
          existingUser={existingUser}
          setExistingUser={setExistingUser}
          addNewUser={addNewUser}
          saveChangesToExistingUser={saveChangesToExistingUser}
        />
      </Modal>
      <Modal ref={deleteConfirmDialog}>
        <Delete toggleModal={toggleModal} removeUser={removeUser} />
      </Modal>
    </div>
  );
}

export default User;
