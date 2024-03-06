import { toast } from 'react-toastify';

export const errToaster = (msg) => {
  toast.error(msg, {
    position: 'top-right',
    theme: 'dark',
  });
};

export const successToaster = (msg) => {
  toast.success(msg, {
    position: 'top-right',
    theme: 'dark',
  });
};
