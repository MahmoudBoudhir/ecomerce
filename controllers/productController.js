const path = require('path');
const express = require('express');
const multer = require('multer');
const app = express()
const Product = require('./../models/product');
const Category = require('./../models/category')



// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}


// Set The Storage Engine
const storage = multer.diskStorage({
    destination: './public',
    filename: function (req, file, cb) {
        console.log(
            req.body.name
        );
        let name = req.body.name.replace(' ', '').toLowerCase();
        cb(null, name + '-' +
            Date.now
                () + path.extname(file.originalname));
    }
});

// Init Upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 100000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});
app.get('/all', async (req, res) => {

    try {

        let products = await Product.find()
        //tableau bch njibuo fih el produit bel category mtee3ha
        let allProducts = []
        for (let i = 0; i < products.length; i++) {
            // objet fih el produit
            let product = products[i]
            //jebna objet bel id fih el category eli fel produit 
            let category = await Category.findOne({ _id: products[i].categoryId })
            //push eli heyaa bch nzidou les objet fel tableau mtee3na 
            allProducts.push({ product, category })

        }
        res.status(200).send(allProducts)

        // el "e" heya eli bch tkharaajlek el erreur win bkhlef lmessage 
    } catch (e) {
        res.status(400).send({ message: "product not found" })

    }

});
//gaditha  b try

app.get("/stat", async (req, res) => {
    try {
        let products = await Product.find({ name: "" })

        let cpm = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        for (let i = 0; i < product.length; i++) {
            cpm[products[i].createdAt.getMonth()]++
        }
        res.status(200).send({ products: product.length })

    }
    catch (e) { res.status(400).send({ message: 'not found ' }) }
})

//gaditha b try

app.delete("/delete/:id", async (req, res) => {
    try {
        let productId = req.params.id
        let productivo = await Product.findOneAndDelete({ _id: productId })
        if (!product) {
            res.status(404).send({ message: "product not found" })

        } else {
            res.status(200).send({ message: "product deleted succesefuly" })

        }

    }
    catch (e) { res.status(400).send({ message: 'not found ' }) }
})

//gaditha b try

app.get("/one/:id", async (req, res) => {
    try {
        let productId = req.params.id

        let product = await Product.findOne({ _id: productId })
        if (!product) {
            res.status(404).send({ message: "product not found" })

        } else {
            res.status(200).send(product)

        }
    }
    catch (e) { res.status(400).send({ message: 'not found ' }) }
})

//gaditha b try 

app.patch("/update-info/:id", (req, res) => {
    let data = req.body
    let productId = req.params.id
    Product.findOneAndUpdate(
        { _id: productId }, data, { new: true }
    )
        .then((product) => {
            if (!product) {
                res.status(404).send({ message: "product not found" })

            } else {
                res.status(200).send({ message: "success " })

            }

        }).catch((e) => {
            res.status(400).send("cannoot update ", e)
        })

})
//mazet hedhi

app.post("/add", upload.single('image'), (req, res) => {
    //request totleb hajaa response al ijebaa 3alaa etalaab
    let data = req.body
    let file = req.file
    let product = new Product({
        image: file.filename,
        name: data.name,
        price: data.price,
        description: data.description,
        categoryId: data.categoryId

    })

    product.save()
        .then(() => {
            res.status(201).send({ message: "product registred seccessfuly" })
        })
        .catch((e) => {
            res.status(400).send({ message: "product not registred", e })
            console.log(e);
        })

    /////////////////////////////////////////////////////////////////


    /* 
    
                     try catch
    try {
         let data = req.body
         //password securisation
         let product = new Product({
             name: 
data.name
,
             price: data.price,
             image: data.image,
             description: data.description,
             categoryId: data.categoryId
         })
         let uresFromDb = await 
product.save
()
         // "userFromDb" howa nafs el objet bch yarjaa3lek
         res.status(201).send({ message: "product registred seccessfuly" })
     } catch (e) {
         res.status(400).send({ message: " failed", e })
 
     }*/
});


//gaditha b try
module.exports = app