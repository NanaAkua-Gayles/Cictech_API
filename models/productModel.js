const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        id:{
            type:Number,
            unique:true
        },
        name:{
            type: String,
            required: (true, "Please enter a product name")
        },
        brand:{
            type: String,
            required: (false)
        },
        description:{
            type: String,
            required: (false)
        },
        image:{
            type:String,
            require: false
        },
        price:{
            type: Number,
            require: true
        },
    },
    {
        timestamps:true
    }
)


const Product = mongoose.model("Product",productSchema);

module.exports = Product;