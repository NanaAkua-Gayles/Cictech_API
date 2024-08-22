const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Product = require('./models/productModel')

const port = process.env.PORT || 18012;

app.use(express.json())
app.use(express.urlencoded({extended: false}))


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
app.get('/products/:brand', async(req,res)=>{
    try {
        const {brand} = req.params;
        const product = await Product.findById(brand)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}),


//saving products
app.post('/products', async(req,res)=>{
   try {
        const products = await Product.create(req.body)
        res.status(200).json(products)

   } catch (error) {
    console.log(error)
    res.status(500).json({message: error.message})
   }
})

//update a product
app.put('/products/:id', async(req,res)=>{
    try {
        const {id} = req.params;
         const product = await Product.findByIdAndUpdate(id, req.body)
         if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
         }
         const updateProduct = await Product.findById(id)
         res.status(200).json(updateProduct);
 
    } catch (error) {
     res.status(500).json({message: error.message})
    }
 })

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


