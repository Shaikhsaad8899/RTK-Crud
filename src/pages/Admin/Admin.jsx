import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // New state for image file
  const [previewImage, setPreviewImage] = useState(null); // New state for image preview

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:4001/api/getProducts');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setSelectedImage(null); // Reset image file
    setPreviewImage(null); // Reset image preview
    setModalVisible(true);
  };

  const handleCreateProduct = () => {
    console.log('Create a new product');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const updateProduct = async () => {
    try {
      const formData = new FormData();
      formData.append('name', editProduct.name);
      formData.append('description', editProduct.description);
      formData.append('price', editProduct.price);
      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      const response = await axios.put(`http://localhost:4001/api/updateProduct/${editProduct.item_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Update the products list with the updated product
      setProducts(products.map(product => (product.item_id === editProduct.item_id ? response.data.product : product)));
      setModalVisible(false);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Admin - Manage Products</h1>
        <Link className="btn btn-primary" to="/admin/create-product">Create Product</Link>
      </div>
      <div className="row">
        {products.map(product => (
          <div key={product.item_id} className="col-md-4 mb-3 d-flex">
            <div className="card flex-fill">
              <img style={{ width: "150px", height: "auto" }} src={`/assets/images/products/${product.image}`} className="card-img-top" alt={product.name} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">Price: ${product.price}</p>
                <button className="btn btn-primary mt-auto" data-toggle="modal" data-target="#editModal" onClick={() => handleEdit(product)}>Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {editProduct && (
        <div className={`modal ${modalVisible ? 'show' : ''}`} id="editModal" tabIndex="-1" role="dialog" style={{ display: modalVisible ? 'block' : 'none' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Product</h5>
                <button type="button" className="close" onClick={() => setModalVisible(false)} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-3"
                  value={editProduct.name}
                  onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                />
                <textarea
                  className="form-control mb-3"
                  value={editProduct.description}
                  onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                ></textarea>
                <input
                  type="number"
                  className="form-control mb-3"
                  value={editProduct.price}
                  onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                />
                <img 
                  src={previewImage ? previewImage : `/assets/images/products/${editProduct.image}`} 
                  alt={editProduct.name} 
                  style={{ maxWidth: "100%", height: "auto",objectFit:"contain" }} 
                />
                <input
                  type="file"
                  className="form-control mb-3"
                  onChange={handleImageChange}t
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setModalVisible(false)}>Close</button>
                <button type="button" className="btn btn-primary" onClick={updateProduct}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
