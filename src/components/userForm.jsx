import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser, updateUser } from '../slices/usersSlice';

const UserForm = ({ user = null, onSubmit = () => { } }) => {
  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { name, email };
    if (user) {
      userData.id = user.id;
      dispatch(updateUser(userData));
    } else {
      dispatch(addUser(userData));
    }
    onSubmit();
    console.log('Data submitted'); // Print message after form submission
  };

  return (
    <>
      <div className="container m-0 p-0">
        <div className="row d-flex justify-contents-center " >
          <div className="col-12
        ">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  className="form-control "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary my-2 ">{user ? 'Update' : 'Add'} User</button>
            </form>
          </div>
        </div>
      </div>
<hr />
    </>
  );
};

export default UserForm;
