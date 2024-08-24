const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Product = require('./models/productModel');
const cors = require('cors');

const port = process.env.PORT || 18012;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Fetching all products
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Fetching by ID
app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Fetching by brand
app.get('/products/brand/:brand', async (req, res) => {
    try {
        const { brand } = req.params;
        const product = await Product.find({ brand: brand });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Save a product with an image URL
app.post('/products', async (req, res) => {
    try {
        const { name, brand, description, price, image } = req.body; // Image URL should be included in the request body
        const product = await Product.create({ name, brand, description, price, image });
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

// Update a product with an image URL
app.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, brand, description, price, image } = req.body; // Image URL should be included in the request body
        const updateData = { name, brand, description, price, image };
        const product = await Product.findByIdAndUpdate(id, updateData, { new: true });
        if (!product) {
            return res.status(404).json({ message: `Cannot find any product with ID ${id}` });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a product
app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: `Cannot find any product with ID ${id}` });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

mongoose.connect('mongodb+srv://cictech_electronics:qwerty111@cictechapi.fsyh2.mongodb.net/Product-API?retryWrites=true&w=majority&appName=cictechApi')
.then(()=>{
    console.log('Connected to MongoDB')
    app.listen(3000, ()=>{
        console.log('Server is running on port 3000')
    });
}).catch((error)=>{
    console.log(error)
})

mongoose.connect('mongodb+srv://cictech_electronics:qwerty111@cictechapi.fsyh2.mongodb.net/Product-API?retryWrites=true&w=majority&appName=cictechApi')
.then(()=>{
    console.log('Connected to MongoDB')
    app.listen(port, ()=>{
        console.log(`Server is running on port ${port}`)
        
    });
}).catch((error)=>{
    console.log(error)
})


