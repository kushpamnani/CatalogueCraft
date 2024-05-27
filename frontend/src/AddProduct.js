/**

Author: Kush Pamnani

*/

import React, { useState } from 'react';
import axios from 'axios';

function AddProduct() {
  const [product, setProduct] = useState({
    title: '', price: '', description: '', category: '', image: ''
  });

  const handleChange = e => {
    const value = e.target.type === 'number' ? parseFloat(e.target.value) || '' : e.target.value;
    setProduct({ ...product, [e.target.name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!product.title || !product.price || !product.description || !product.category || !product.image) {
      alert('Please fill out all fields.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3001/products', product);
      alert('Product added successfully!');
      console.log(response.data); // Log the successful response data
      // Optionally clear the form here
      setProduct({ title: '', price: '', description: '', category: '', image: '' });
    } catch (error) {
      console.error('Error adding product:', error);
      if (error.response) {
        // Handle responses outside of the 2xx range
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert(`Failed to add product: ${error.response.data.message}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        alert('No response from the server. Please check if the server is running.');
      } else {
        // Something else caused the request to fail
        console.log('Error', error.message);
        alert('Error submitting the form: ' + error.message);
      }
    }
  };
  

  return (
    <div className="card card-body">
      <h3>Add New Product</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input type="text" className="form-control" name="title" value={product.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input type="number" step="0.01" className="form-control" name="price" value={product.price} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea className="form-control" name="description" value={product.description} onChange={handleChange} required></textarea>
        </div>
        <div className="form-group">
          <label>Category</label>
          <input type="text" className="form-control" name="category" value={product.category} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Image URL</label>
          <input type="text" className="form-control" name="image" value={product.image} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
