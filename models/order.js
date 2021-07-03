const mongoose = require("mongoose")

let Order = mongoose.model("order", {
    date: {
        type: Date,
        default: new Date()
    },
    state: {
        type: Boolean,
        default: false,
    },
    idClient: {
        type: String,
        required: true,
    },
    products: {
        type: [mongoose.Schema.Types.Mixed],//hedha type jison fi mongoose
        required: true,
    },
    createdAt:{
        type :Date,
        default:new Date()
    }
    
})

module.exports = Order