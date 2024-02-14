import { useState } from 'react';

export const sendHttpRequest = async (url, errName, config) => {
  const response = await fetch(url, config);
  if (!response.ok) {
    throw new Error(errName);
  }
  const result = response.json();
  return result;
};

const useHttp = () => {
  const [dialogue, setDialogue] = useState({
    loading: false,
    error: false,
    successMsg: false,
  });

  const sendRequest = async (url, errMsg, modalName, successMsg, config) => {
    let data = [];
    setDialogue((prevDialogue) => {
      return { ...prevDialogue, loading: modalName };
    });
    try {
      data = await sendHttpRequest(url, errMsg, config);
      if (!data) {
        data = [];
      }
      setDialogue((prevDialogue) => {
        return { ...prevDialogue, successMsg: successMsg };
      });
    } catch (err) {
      setDialogue((prevDialogue) => {
        return { ...prevDialogue, error: { name: modalName, msg: err.message } };
      });
    }
    setDialogue((prevDialogue) => {
      return { ...prevDialogue, loading: false };
    });
    console.log(data, 'data Structure');
    return data;
  };

  return { dialogue, setDialogue, sendRequest };
};

export default useHttp;
