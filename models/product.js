const mongoose = require("mongoose")

let Product = mongoose.model("products", {
    name: {
        type: String,
        required: true,
        trim:true,
        unique:true
    },
    description: {
        type: String,
        required: true   
    },
    image: {
        type: String,
        required: true,
       
      
    },
    price: {
        type: Number,
        required: true,
    },
    categoryId: {
        type: String,
        required: true,
    },
    createdAt:{
        type :Date,
        default:new Date()
    }

})

module.exports=Product