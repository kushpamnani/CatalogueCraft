// ListProducts.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ListProducts() {
  const [products, setProducts] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch all products when the component mounts
    axios.get('http://localhost:3001/products')
      .then(response => setProducts(response.data))
      .catch(error => setError('Error fetching products'));
  }, []);

  const selectProduct = id => {
    // Fetch a single product by ID when a product ID is entered and the button is clicked
    axios.get(`http://localhost:3001/products/${id}`)
      .then(response => {
        // Handle the response, e.g., by setting it in state or logging it out
        console.log(response.data);
      })
      .catch(error => setError('Product not found'));
  };

  return (
    <div>
      <h3>Product List</h3>
      {error && <p>{error}</p>}
      <input
        type="text"
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
        placeholder="Enter product ID"
      />
      <button onClick={() => selectProduct(selectedId)}>Select Product</button>
      {products.map(product => (
        <div key={product._id}>
          {product.title} - ${product.price}
        </div>
      ))}
    </div>
  );
}

export default ListProducts;
