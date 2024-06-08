import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, deleteUser, updateUser } from '../../Redux/slices/usersSlice';
import UserItem from './userItem';

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);
  const [editingUser, setEditingUser] = useState(null);

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(userId));
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleSave = async () => {
    dispatch(updateUser(editingUser));
    setEditingUser(null);
    dispatch(fetchUsers()); // Fetch users after updating
  };

  const handleCancel = () => {
    setEditingUser(null); // Cancel edit mode
  };

  const handleFetchUsers = () => {
    dispatch(fetchUsers());
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingUser({ ...editingUser, [name]: value });
  };

  useEffect(() => {
    handleFetchUsers(); // Fetch users on component mount
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div className="container p-0 m-0">
      <button className="btn btn-primary my-1" onClick={handleFetchUsers}>
        Fetch Users
      </button>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'error' && <p className="text-danger">Error: {error}</p>}
      {status === 'idle' && (
        <ul className="list-group" style={{listStyle:"none"}}>
          {users.map((user) => (
            <li key={user.id} className="list-group-item">
              {editingUser && editingUser.id === user.id ? (
                <div>
                  <input
                    type="text"
                    className="form-control mb-2"
                    name="name"
                    value={editingUser.name}
                    onChange={handleInputChange}
                  />
                  <input
                    type="email"
                    className="form-control mb-2"
                    name="email"
                    value={editingUser.email}
                    onChange={handleInputChange}
                  />
                  <button className="btn btn-success " onClick={handleSave}>
                    Save
                  </button>
                  <button className="btn btn-secondary mx-2" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="d-flex justify-content-between align-items-center">
                  <UserItem user={user} onDelete={handleDelete} onEdit={handleEdit} />
                 
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
