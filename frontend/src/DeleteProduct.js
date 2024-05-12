import React, { useState } from 'react';
import axios from 'axios';

function DeleteProduct() {
  const [productId, setProductId] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:3001/products/${productId}`);
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product.');
    }
  };

  return (
    <div className="card card-body">
      <h3>Delete Product</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product ID</label>
          <input type="text" className="form-control" value={productId} onChange={e => setProductId(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-danger">Delete Product</button>
      </form>
    </div>
  );
}

export default DeleteProduct;
