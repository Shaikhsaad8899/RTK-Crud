import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser, updateUser } from '../../Redux/slices/usersSlice';

const UserForm = ({ user = {}, onSubmit = () => { } }) => {
  const [name, setName] = useState(user.name || ''); // Default to an empty string if user.name is undefined
  const [email, setEmail] = useState(user.email || ''); // Default to an empty string if user.email is undefined
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State to hold the image preview URL

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Values:", {
      name: name,
      email: email,
      image: image
    });
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('image', image); // Append the selected image file to the form data

    if (user) {
      dispatch(addUser(formData));
    }
    onSubmit();
    console.log('Data submitted'); // Print message after form submission
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    // Create a preview URL for the selected image
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <>
      <div className="container m-0 p-0">
        <div className="row d-flex justify-contents-center " >
          <div className="col-12">
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
              {/* Input field for image */}
              <div className="form-group">
                <label>Image:</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleImageChange}
                  required={!user} // Image is required for adding a new user
                />
                {/* Display image preview if available */}
                {imagePreview && (
                  <img src={imagePreview} alt="Preview" style={{ marginTop: '10px', maxWidth: '100%', maxHeight: '200px' }} />
                )}
              </div>
              <button type="submit" className="btn btn-primary my-2 ">Add User</button>
            </form>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default UserForm;
