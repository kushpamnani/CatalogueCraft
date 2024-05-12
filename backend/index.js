const express = require('express');
const mongoose = require('mongoose');
const Product = require('./dataSchema');

const app = express();
const PORT = process.env.PORT || 3011; 

app.use(express.json()); // Middleware to parse JSON bodies

// MongoDB connection using Mongoose
mongoose.connect('mongodb://localhost:27017/reactdata', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false  // Ensures that findByIdAndUpdate uses native findOneAndUpdate rather than findAndModify
})
.then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
})
.catch(err => console.error('Failed to connect to MongoDB:', err));


// Get a single product by ID
app.get('/products/:id', (req, res) => {
    const id = req.params.id;
    Product.findById(id)
    .then(product => {
        if (!product) {
            console.log(`Product with ID ${id} not found`);
            return res.status(404).json({ message: "Product not found" });
        }
        console.log(`Found product: ${product}`);
        res.json(product);
    })
    .catch(err => {
        console.error(`Error fetching product with ID ${id}:`, err);
        res.status(500).json({ message: "Error fetching product", error: err.message });
    });
});

// Update a product
app.put('/products/:id', (req, res) => {
    const id = req.params.id;
    const updates = req.body;

    console.log('Received updates:', updates);  // Debugging: log the updates to see what is received

    Product.findByIdAndUpdate(id, updates, { new: true })  // "new: true" option returns the updated object
    .then(product => {
        if (!product) {
            console.log(`No product found with ID ${id} for updating`);
            return res.status(404).json({ message: "Product not found" });
        }
        console.log(`Updated product: ${product}`);
        res.json(product);
    })
    .catch(err => {
        console.error(`Error updating product with ID ${id}:`, err);
        res.status(400).json({ message: "Error updating product", error: err.message });
    });
});

// Create a new product
app.post('/products', (req, res) => {
    const product = new Product(req.body);
    product.save()
    .then(product => {
        console.log(`Product created: ${product}`);
        res.status(201).json(product);
    })
    .catch(err => {
        console.error('Error creating product:', err);
        res.status(400).json({ message: "Error creating product", error: err.message });
    });
});

// Delete a product
app.delete('/products/:id', (req, res) => {
    const id = req.params.id;
    Product.findByIdAndRemove(id)
    .then(result => {
        if (!result) {
            console.log(`No product found with ID ${id} for deletion`);
            return res.status(404).json({ message: "Product not found" });
        }
        console.log(`Deleted product with ID ${id}`);
        res.json({ message: "Product deleted successfully" });
    })
    .catch(err => {
        console.error(`Error deleting product with ID ${id}:`, err);
        res.status(400).json({ message: "Error deleting product", error: err.message });
    });
});

// Error handling for unhandled rejections
process.on('unhandledRejection', error => {
    console.error('Unhandled Rejection:', error);
    process.exit(1); // Exit the application for critical errors
});
