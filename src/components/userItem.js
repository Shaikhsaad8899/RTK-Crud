import React from 'react';

const UserItem = ({ user, onDelete,onEdit }) => {
  return (
    <li>
      <div>
        <strong>Name:</strong> {user.name}
      </div>
      <div>
        <strong>Email:</strong> {user.email}
      </div>
      <div>
        <button className='btn   btn-secondary' onClick={() => onDelete(user.id)}>Delete</button>
     
      <button className="btn mx-2 btn-primary" onClick={() => onEdit(user)}>
                    Edit
                  </button>      </div>
      
    </li>
  );
};

export default UserItem;
