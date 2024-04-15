import React from 'react';
import { Provider } from 'react-redux';
import store from './store'; // Assuming your Redux store is exported from 'store.js'
import UserForm from './components/userForm';
import UserList from './components/userList';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <div className="container">
        <div className="row d-flex justify-content-center " >

            <div className="col-6">

              <h1 style={{textAlign:"center"}}>User Management System</h1>
              <h4>Add User</h4>
              <UserForm />
              <h4>User List</h4>
              <UserList />
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default App;
