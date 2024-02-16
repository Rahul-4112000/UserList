import User from './Features/Users/User';
import { Provider } from 'react-redux';
import store from './Redux/Store/store.js';

function App() {
  return (
    <Provider store={store}>
      <User />
    </Provider>
  );
}

export default App;
