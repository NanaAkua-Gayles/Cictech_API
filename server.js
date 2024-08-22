const express = require('express')
const app = express()
const mongoose = require('mongoose')
const multer = require('multer');
const Product = require('./models/productModel')

const fs = require('fs');
const path = require('path');

const uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // specify the directory where images will be saved
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // create a unique filename
    }
});

const upload = multer({ storage: storage });

const port = process.env.PORT || 18012;

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



//fetching all products
app.get('/products', async(req,res)=>{
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}),

//fetching by id
app.get('/products/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}),

//fetching by brand
app.get('/products/brand/:brand', async(req,res)=>{
    try {
        const {brand} = req.params;
        const product = await Product.find({brand: brand})
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}),


// Save a product with an image
app.post('/products', upload.single('image'), async (req, res) => {
    try {
        const { name, brand, description, price } = req.body;
        const image = req.file ? req.file.path : ''; // Store the image path if an image is uploaded
        const product = await Product.create({ name, brand, description, price, image });
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

//update a product
app.put('/products/:id', upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, brand, description, price } = req.body;
        const image = req.file ? req.file.path : undefined; // Update image if a new one is uploaded
        const updateData = { name, brand, description, price };
        if (image) {
            updateData.image = image;
        }
        const product = await Product.findByIdAndUpdate(id, updateData, { new: true });
        if (!product) {
            return res.status(404).json({ message: `Cannot find any product with ID ${id}` });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

 //delete a product
 app.delete('/products/:id', async(req,res)=>{
    try {
        const {id} = req.params;
         const product = await Product.findByIdAndDelete(id);
         if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
         }
        // const updateProduct = await Product.findById(id)
         res.status(200).json(product);
 
    } catch (error) {
     res.status(500).json({message: error.message})
    }
 })

 //deleting all
 app.delete('/products', async(req,res)=>{
    try {
        const products = await Product.delete({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}),



/*mongoose.connect('mongodb+srv://cictech_electronics:qwerty111@cictechapi.fsyh2.mongodb.net/Product-API?retryWrites=true&w=majority&appName=cictechApi')
.then(()=>{
    console.log('Connected to MongoDB')
    app.listen(3000, ()=>{
        console.log('Server is running on port 3000')
    });
}).catch((error)=>{
    console.log(error)
})*/

mongoose.connect('mongodb+srv://cictech_electronics:qwerty111@cictechapi.fsyh2.mongodb.net/Product-API?retryWrites=true&w=majority&appName=cictechApi')
.then(()=>{
    console.log('Connected to MongoDB')
    app.listen(port, ()=>{
        console.log('Server is running on port 3000')
    });
}).catch((error)=>{
    console.log(error)
})


