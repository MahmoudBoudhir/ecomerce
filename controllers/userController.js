const express = require('express')
const bcrypt = require('bcryptjs')
const  jwt  = require('jsonwebtoken')

const User = require('./../models/user')

const app = express()
app.post
('/login', (req, res) => {
   
    let data = req.body
    User
        .findOne({ email: 
data.email
 })
        .then((userFromDb) => {
            if (!userFromDb) {
                res.status(404).send({ message: "not found" })
            }

            else {
                let compare = bcrypt.compareSync(data.password, userFromDb.password)
                if (!compare) {
                    res.status(404).send({ message: "not found" })
                }
                else {
                    let myToken = jwt.sign({ id: userFromDb._id, role: userFromDb.role }, "2K")
                    res.status(200).send({ token: myToken })
                }
            }
        }
        )
        .catch((e) => {
            res.status(400).send({ message: "not found", e })
        })
});
    


//gaditha  b try 
app.post('/register', async (req, res) => {

    try {
        let data = req.body
        data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10))

        let user = new User({
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: data.password,
        })
        let userFromDb = await user.save()
        res.status(200).send({ message: 'user registred' })
    }
    catch (e) { res.status(400).send({ message: 'user not registred', e }) }
})
//gaditha b try

app.get("/stat", async(req, res) => {
    try{
let usere = await User.find({role:"client"})


    let cpm=[0,0,0,0,0,0,0,0,0,0,0,0]
for(let i=0;i<client.length;i++){
cpm[client[i].createdAt.getMonth()]++
}
res.status(200).send({nbrclients:client.length})

    
}
    catch (e) { res.status(400).send({ message: 'user not registred', e }) }
})

//GADITHA b try

app.get("/all", async (req, res) => {
    try {
        let users = await User.find()
        res.status(200).send(users)
    }
    catch (e) { res.status(400).send({ message: 'not seccessfully' }) }

})
//gaditha b try

app.delete("/delete/:id", async(req, res) => {
    try{
    let userId = req.params.id
    let usere= await User.findByIdAndDelete({ _id: userId })
        if (!user) {
            res.status(404).send({ message: "user not foun" })

        } else {
            res.status(200).send({ message: "user deleted succesefuly" })

        }
    }
        catch (e) { res.status(400).send({ message: 'user not deleted', e }) }
    })

//gaditha

app.patch("/change-state/:id", (req, res) => {
    let data = req.body
    let userId = req.params.id
    console.log(data);
    console.log(userId);
    res.status(200).send({ message: "success" })
})
//hehdi mazeelt 

module.exports = app