import React, { useState, useCallback, useEffect } from 'react';
import UserForm from './UserForm';
import UserList from './UserList';
import DeleteModal from './DeleteModal';
import LoadingDialogue from '../../Shared/Utility/LoadingDialogue';
import Error from '../../Shared/Utility/Error';
import useHttp from '../../Hooks/useHttp.js';
import Modal from '../../Shared/Utility/Modal';

// const usersData = [
//   {
//     id: 1,
//     name: 'Rahul Lakhvara',
//     age: 23,
//     email: 'rahullaxar786@gmail.com',
//     mobNum: 6353805737,
//   },
//   {
//     id: 2,
//     name: 'Sanjay Suthar',
//     age: 22,
//     email: 'sutharsanjay786@gmail.com',
//     mobNum: 9979576857,
//   },
//   {
//     id: 3,
//     name: 'Jaynti Joshi',
//     age: 23,
//     email: 'joshiJaynti@gmail.com',
//     mobNum: 9898470339,
//   },
//   {
//     id: 4,
//     name: 'Rakesh Suthar',
//     age: 21,
//     email: 'sutharrakesh121@gmail.com',
//     mobNum: 2531546852,
//   },
//   {
//     id: 5,
//     name: 'Rohit Giri',
//     age: 25,
//     email: 'girirohit444@gmail.com',
//     mobNum: 6521548762,
//   },
// ];
const initialUser = {
  id: null,
  name: '',
  email: '',
  age: '',
  mobNum: '',
};

const initialDialogue = {
  loading: false,
  error: false,
  successMsg: false,
};

const USER_DIALOGUE = 'USER_DIALOGUE';
const FORM_DIALOGUE = 'FORM_DIALOGUE';
const DELETE_DIALOGUE = 'DELETE_DIALOGUE';

const User = () => {
  const [users, setUsers] = useState([]);
  const [deleteUser, setDeleteUser] = useState(null);
  const [selUser, setSelUser] = useState(null);
  const { dialogue, setDialogue, sendRequest } = useHttp();

  //fetch registered users
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const users = await sendRequest(
      'http://localhost:3000/users',
      'Something went wrong while fetching users!!!',
      USER_DIALOGUE
    );
    if (users.length) {
      setUsers(users);
    }
  };

  // common function
  const closeModal = () => {
    setSelUser(null);
    setDialogue({ ...initialDialogue });
  };

  // functions for userList
  const showForm = useCallback((aSelUser) => {
    if (aSelUser) {
      setSelUser(aSelUser);
      return;
    }
    setSelUser(initialUser);
  }, []);

  const onDeleteUser = useCallback((aUser) => {
    setDeleteUser(aUser);
  }, []);

  // functions for userForm
  const saveNewUser = async (aNewUser) => {
    delete aNewUser.id;
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(aNewUser),
    };

    const user = await sendRequest(
      'http://localhost:3000/users',
      "Oopps!! User can't be add",
      FORM_DIALOGUE,
      'New User Added',
      config
    );
    if (!Array.isArray(user)) {
      setUsers((prevUser) => {
        return [...prevUser, user];
      });
    }
  };

  const updateUser = async (aUpdatedUser) => {
    const config = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(aUpdatedUser),
    };

    const updatedUser = await sendRequest(
      `http://localhost:3000/users/${aUpdatedUser.id}`,
      "User can't be add",
      FORM_DIALOGUE,
      'Changes saved!!!',
      config
    );
    if (!Array.isArray(updatedUser)) {
      const userIndex = users.findIndex((user) => user.id === aUpdatedUser.id);
      const updatedUsers = [...users];
      updatedUsers[userIndex] = aUpdatedUser;
      setUsers(updatedUsers);
    }
  };

  const saveUser = (aUserData) => {
    if (aUserData.id) {
      updateUser(aUserData);
    } else {
      saveNewUser(aUserData);
    }
  };

  // functions for Delete
  const cancelDeleteOnConfirmation = () => {
    setDeleteUser(null);
    closeModal();
  };

  const DeleteOnConfirmation = async () => {
    const config = {
      method: 'DELETE',
    };
    const deletedUser = await sendRequest(
      `http://localhost:3000/users/${deleteUser.id}`,
      "User can't be Deleted",
      DELETE_DIALOGUE,
      'User Deleted!!!',
      config
    );
    if (!Array.isArray(deletedUser)) {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== deleteUser.id));
      setDeleteUser(null);
    }
  };

  if (dialogue.loading === USER_DIALOGUE) {
    return <LoadingDialogue />;
  }

  if (dialogue.error.name === USER_DIALOGUE) {
    return <Error errMsg={dialogue.error.msg} closeModal={closeModal} />;
  }

  return (
    <div className='relative'>
      <UserList usersList={users} onShowForm={showForm} onDeleteUser={onDeleteUser} />

      {selUser && (
        <Modal dialogue={dialogue} dialogName={FORM_DIALOGUE} closeModal={closeModal}>
          {!dialogue.loading && !dialogue.successMsg && !dialogue.error && (
            <UserForm selUser={selUser} onSaveUser={saveUser} closeModal={closeModal} />
          )}
        </Modal>
      )}

      {deleteUser && (
        <Modal dialogue={dialogue} dialogName={DELETE_DIALOGUE} closeModal={closeModal}>
          {!dialogue.loading && !dialogue.successMsg && !dialogue.error && (
            <DeleteModal
              onCancelDeleteConfirmation={cancelDeleteOnConfirmation}
              onSuccessDeleteConfirmation={DeleteOnConfirmation}
              deleteUserName={deleteUser?.name}
            />
          )}
        </Modal>
      )}
    </div>
  );
};

export default User;
