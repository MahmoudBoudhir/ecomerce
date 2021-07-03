
const express = require('express')
const cors = require('cors')
require('./configue/db')
const userController = require("./controllers/userController")
const categoryController = require("./controllers/categoryController")
const productController = require("./controllers/productController")
const orderController = require("./controllers/orderController")
const app = express()
const port = 3000



app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))

app.use("/user", userController)
app.use("/category", categoryController)
app.use("/product", productController)
app.use("/order", orderController)











app.listen(port, () => {
    console.log("serveur started")
})
