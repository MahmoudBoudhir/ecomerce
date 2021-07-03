const express = require('express')
const app = express()
const Order = require('./../models/order')

app.get("/stat", (req, res) => {
    console.log("hello order");
    res.status(200).send({ message: "success" })
})
//mzelt hedhi

app.get("/all",async (req, res) => {

    try {
        let order = await Order.find()
        res.status(200).send(order)
    }
    catch (e) { res.status(400).send({ message: 'not seccessfully' }) }

})
//gaditha 

app.get("/one/:id", (req, res) => {

    let orderId = req.params.id

    Order
        .findOne({ _id: orderId })
        .then((order) => {
            if (!order) {
                res.status(404).send({ message: "order not found" })
            } else {
                res.status(200).send(order)
            }
        })
        .catch((e) => {
            res.status(400).send({ message: "id not founded jemla", e })
        })
})
//gaditha

app.patch("/change-state/:id", (req, res) => {
    console.log("confirmer annuler");
    res.status(200).send({ message: "success" })
})
//mazelt hedhi anuuliha wla leee 

app.delete("/delete/:id",(req,res)=>{
    let orderId = req.params.id
    Order.findOneAndDelete({ _id:orderId }).then((order) => {
        if (!order) {
            res.status(404).send({ message: "order not found" })

        } else {
            res.status(200).send({ message: "order deleted succesefuly" })

        }

    }).catch((e) => {
        res.status(400).send("cannoot deleted ", e)
    })
})
//gaditha ;)

app.get("/all/:id", (req, res) => {
    let id = req.params.id
    Order.find({ idClient: id }).then((order) => {
        if (!order) {
            res.status(404).send({ message: "no succesefuly"})

        } else {
            res.status(200).send({ order })

        }

    }).catch((e) => {
        res.status(400).send({ message: "not user", e })
    })
})
//gaditha

app.post("/add", (req, res) => {
    let data = req.body
    let order = new Order({
        date: data.date,
        state: data.state,
        idClient: data.idClient,
        products: data.price,
        categoryId: data.categoryId
    })
    order.save().then(() => {
        res.status(201).send({ message: 'order add succdessfuly' })
    }).catch((e) => {
        res.status(400).send({ message: 'no add ', e })
    })
})
//gaditha
module.exports = app