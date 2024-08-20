const express = require('express')
const app = express()

//const mongoose = require('mongoose')

app.get('/', (req,res)=>{
    res.send('Hello Node Api')
})

//mongoose.connect('mongodb://localhost:27017/name of base')

app.listen(3000, ()=>{
    console.log('Server is running on port 3000')
})
