import React from 'react';

const UserItem = ({ user, onDelete, onEdit }) => {
  return (
    <div className="container">
      <div className='row d-flex justify-contents-evenly gx-3'>
        <div className='col-md-2 d-flex align-items-center justify-content-center '> {user.name}</div>
        <div className='col-md-2 d-flex align-items-center justify-content-center '> {user.email}</div>
        <div className='col-md-3 d-flex align-items-center justify-content-center'>
          <img style={{ width: "100px" }} src={`/assets/images/${user.image}`} alt="" />
        </div>
        <div className='col-md-2 d-flex align-items-center justify-content-center '><button className='btn   btn-secondary' onClick={() => onDelete(user.id)}>Delete</button></div>
        <div className='col-md-2 d-flex align-items-center justify-content-center'><button className="btn mx-2 btn-primary" onClick={() => onEdit(user)}>Edit</button></div>
      </div>
    </div>
  );
};

export default UserItem;
