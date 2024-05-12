import React, { useState } from 'react';
import axios from 'axios';

function AddProduct() {
  const [product, setProduct] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
    rating: {
      rate: '',
      count: ''
    }
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (name === "rate" || name === "count") {
      setProduct(prevState => ({
        ...prevState,
        rating: {
          ...prevState.rating,
          [name]: type === 'number' ? parseFloat(value) : value
        }
      }));
    } else {
      setProduct(prevState => ({
        ...prevState,
        [name]: type === 'number' ? parseFloat(value) : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/products', product);
      console.log(response.data);
      alert('Product added successfully!');
      // Clear the form
      setProduct({
        title: '',
        price: '',
        description: '',
        category: '',
        image: '',
        rating: {
          rate: '',
          count: ''
        }
      });
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product.');
    }
  };

  return (
    <div>
      <h3>Add New Product</h3>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="title" 
          value={product.title} 
          onChange={handleChange} 
          placeholder="Title" 
          required 
        />
        <input 
          type="number" 
          name="price" 
          value={product.price} 
          onChange={handleChange} 
          placeholder="Price" 
          required 
        />
        <textarea 
          name="description" 
          value={product.description} 
          onChange={handleChange} 
          placeholder="Description" 
          required 
        />
        <input 
          type="text" 
          name="category" 
          value={product.category} 
          onChange={handleChange} 
          placeholder="Category" 
          required 
        />
        <input 
          type="text" 
          name="image" 
          value={product.image} 
          onChange={handleChange} 
          placeholder="Image URL" 
          required 
        />
        <input 
          type="number" 
          name="rate" 
          value={product.rating.rate} 
          onChange={handleChange} 
          placeholder="Rating" 
          required 
        />
        <input 
          type="number" 
          name="count" 
          value={product.rating.count} 
          onChange={handleChange} 
          placeholder="Rating Count" 
          required 
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
