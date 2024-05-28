/*
Author: Kush Pamnani
*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UpdateProduct() {
  const [product, setProduct] = useState({ price: '' });
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = e => {
    setProduct({ ...product, price: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3001/products/${id}`, product);
      alert('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product.');
    }
  };

  return (
    <div className="card card-body">
      <h3>Update Product Price</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Price</label>
          <input type="number" className="form-control" value={product.price} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Update Price</button>
      </form>
    </div>
  );
}

export default UpdateProduct;
