import React, { useState } from 'react';
import axios from 'axios';

const Createproduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', formData.name);
    form.append('description', formData.description);
    form.append('price', formData.price);
    form.append('image', formData.image);

    try {
      await axios.post('http://localhost:4001/api/products', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Product added successfully!');
      // Reset form after successful submission
      setFormData({
        name: '',
        description: '',
        price: '',
        image: null,
      });
    } catch (err) {
      console.error(err);
      alert('Failed to add product');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Admin - Add Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-control"
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image:</label>
          <input type="file" id="image" name="image" onChange={handleImageChange} className="form-control" required />
        </div>
        <button type="submit" className="btn btn-primary">Add Product</button>
      </form>
    </div>
  );
};

export default Createproduct;
