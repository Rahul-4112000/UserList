import React, { useState, useCallback } from 'react';
import UserForm from './UserForm';
import UserList from './UserList';
import Delete from './Delete';
import { useEffect } from 'react';
import { sendHttpRequest } from '../../Hooks/sendHttpRequest';
import LoadingDialogue from '../../Shared/Utility/LoadingDialogue';
import Error from '../../Shared/Utility/Error';
import Success from '../../Shared/Utility/Success';

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
const initialSelUser = {
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
  const [dialogue, setDialogue] = useState(initialDialogue);
  const [deleteUser, setDeleteUser] = useState(null);
  const [modal, setModal] = useState(null);
  const [selUser, setSelUser] = useState(initialSelUser);

  //fetch registered users
  useEffect(() => {
    const fetchUsers = async () => {
      setDialogue((prevDialogue) => {
        return { ...prevDialogue, loading: USER_DIALOGUE };
      });
      try {
        const users = await sendHttpRequest(
          'http://localhost:3000/users',
          'Something went wrong while fetching users!!!'
        );
        setUsers(users);
      } catch (err) {
        setDialogue((prevDialogue) => {
          return { ...prevDialogue, error: { name: USER_DIALOGUE, msg: err.message } };
        });
      }
      setDialogue((prevDialogue) => {
        return { ...prevDialogue, loading: false };
      });
    };
    fetchUsers();
  }, []);

  // common function
  const openModal = (modalName) => {
    setModal(modalName);
  };

  const closeModal = () => {
    setModal(null);
    setDialogue({ ...initialDialogue });
  };

  // functions for userList
  const onEdit = useCallback((aSelUser) => {
    setSelUser(aSelUser);
    openModal('formModal');
  }, []);

  const onDeleteUser = useCallback((aUser) => {
    setDeleteUser(aUser);
    openModal('deleteModal');
  }, []);

  const openEmptyUserForm = useCallback(() => {
    openModal('formModal');
    setSelUser(initialSelUser);
  }, []);

  // functions for userForm
  const addNewUser = async (aNewUser) => {
    delete aNewUser.id;
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(aNewUser),
    };
    setDialogue((prevDialogue) => {
      return { ...prevDialogue, loading: FORM_DIALOGUE };
    });
    try {
      const updatedUser = await sendHttpRequest('http://localhost:3000/users', "Oopps!! User can't be add", config);
      setUsers((prevUsers) => {
        return [...prevUsers, updatedUser];
      });
      setDialogue((prevDialogue) => {
        return { ...prevDialogue, successMsg: 'New User Added' };
      });
    } catch (err) {
      setDialogue((prevDialogue) => {
        return { ...prevDialogue, error: { name: FORM_DIALOGUE, msg: err.message } };
      });
    }
    setDialogue((prevDialogue) => {
      return { ...prevDialogue, loading: false };
    });
  };

  const saveChangesInUser = async (aUpdatedSelUser) => {
    const config = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(aUpdatedSelUser),
    };
    setDialogue((prevDialogue) => {
      return { ...prevDialogue, loading: FORM_DIALOGUE };
    });
    try {
      await sendHttpRequest(`http://localhost:3000/users/${aUpdatedSelUser.id}`, "User can't be add", config);
      setDialogue((prevDialogue) => {
        return { ...prevDialogue, successMsg: 'Changes saved!!!' };
      });
      setUsers((prevUsers) => {
        const userIndex = prevUsers.findIndex((user) => user.id === aUpdatedSelUser.id);
        const updatedUsers = [...prevUsers];
        updatedUsers[userIndex] = aUpdatedSelUser;
        return updatedUsers;
      });
    } catch (err) {
      setDialogue((prevDialogue) => {
        return { ...prevDialogue, error: { name: FORM_DIALOGUE, msg: err.message } };
      });
    }

    setDialogue((prevDialogue) => {
      return { ...prevDialogue, loading: false };
    });
  };

  const addUser = (aUserData) => {
    if (aUserData.id) {
      saveChangesInUser(aUserData);
    } else {
      addNewUser(aUserData);
    }
  };

  // functions for Delete
  const cancelDeleteConfirmation = () => {
    setDeleteUser(null);
    closeModal();
  };

  const successDeleteConfirmation = async () => {
    const config = {
      method: 'DELETE',
    };
    setDialogue((prevDialogue) => {
      return { ...prevDialogue, loading: DELETE_DIALOGUE };
    });
    try {
      await sendHttpRequest(`http://localhost:3000/users/${deleteUser.id}`, "User can't be Deleted", config);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== deleteUser.id));
      setDeleteUser(null);
      setDialogue((prevDialogue) => {
        return { ...prevDialogue, successMsg: 'User Deleted!!!' };
      });
    } catch (err) {
      setDialogue((prevDialogue) => {
        return { ...prevDialogue, error: { name: DELETE_DIALOGUE, msg: err.message } };
      });
    }
    setDialogue((prevDialogue) => {
      return { ...prevDialogue, loading: false };
    });
  };

  if (dialogue.loading === USER_DIALOGUE) {
    return <LoadingDialogue />;
  }

  if (dialogue.error.name === USER_DIALOGUE) {
    return <Error errMsg={dialogue.error.msg} closeModal={closeModal} />;
  }

  return (
    <div className='relative'>
      <UserList usersList={users} onEdit={onEdit} onDeleteUser={onDeleteUser} onOpenEmptyUserForm={openEmptyUserForm} />

      {modal === 'formModal' && (
        <dialog open={true} className='absolute top-[15%] '>
          {dialogue.loading === FORM_DIALOGUE && <LoadingDialogue />}
          {dialogue.error.name === FORM_DIALOGUE && <Error errMsg={dialogue.error.msg} closeModal={closeModal} />}
          {dialogue.successMsg && <Success closeModal={closeModal} msg={dialogue.successMsg} />}
          {!dialogue.loading && !dialogue.successMsg && !dialogue.error && (
            <UserForm selUser={selUser} onAddUser={addUser} closeModal={closeModal} />
          )}
        </dialog>
      )}

      {modal === 'deleteModal' && (
        <dialog open={true} className='absolute top-[50%]'>
          {dialogue.loading === DELETE_DIALOGUE && <LoadingDialogue />}
          {dialogue.error.name === DELETE_DIALOGUE && <Error errMsg={dialogue.error.msg} closeModal={closeModal} />}
          {dialogue.successMsg && <Success closeModal={closeModal} msg={dialogue.successMsg} />}
          {!dialogue.loading && !dialogue.successMsg && !dialogue.error && (
            <Delete
              onCancelDeleteConfirmation={cancelDeleteConfirmation}
              onSuccessDeleteConfirmation={successDeleteConfirmation}
              deleteUserName={deleteUser?.name}
            />
          )}
        </dialog>
      )}
    </div>
  );
};

export default User;
