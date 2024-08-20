const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Product = require('./models/productModel')

app.use(express.json())

app.get('/', (req,res)=>{
    res.send('Hello Node Api')
})

app.get('/blog', (req,res)=>{
    res.send('Hello blog I am Kelly')
})


app.post('/product', async(req,res)=>{
   try {
        const product = await Product.create(req.body)
        res.status(200).json(product)

   } catch (error) {
    console.log(error)
    res.status(500).json({message: error.message})
   }
})

mongoose.connect('mongodb+srv://cictech_electronics:qwerty111@cictechapi.fsyh2.mongodb.net/Product-API?retryWrites=true&w=majority&appName=cictechApi')
.then(()=>{
    console.log('Connected to MongoDB')
    app.listen(3000, ()=>{
        console.log('Server is running on port 3000')
    });
}).catch((error)=>{
    console.log(error)
})

