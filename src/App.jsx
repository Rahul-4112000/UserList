import { Provider, useDispatch } from 'react-redux';
import store from './Redux/Store/store.js';
import SignUp from './Features/Users/SignUp';
import LogIn from './Features/Users/LogIn';
import Home from './Features/Users/Home';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import UserList from './Features/Users/UserList';
import UserForm from './Features/Users/UserForm';
import RootLayout from './Features/Users/Root';

const router = createBrowserRouter([
  { path: '/', element: <Navigate to='/login' /> },
  { path: '/login', element: <LogIn /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/home',
    element: <RootLayout />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: '/user',
    element: <RootLayout />,
    children: [
      { index: true, element: <UserList /> },
      { path: 'new', element: <UserForm /> },
      { path: ':userId', element: <UserForm /> },
    ],
  },
  { path: '*', element: localStorage.getItem('userId') ? <Navigate to='/home' /> : <Navigate to='/login' /> },
]);

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
