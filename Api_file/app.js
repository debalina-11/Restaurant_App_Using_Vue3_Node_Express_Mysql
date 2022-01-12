const express = require("express");
const app = express();
const port = 2020;

const cors = require('cors')
app.use(cors())

app.use(express.urlencoded({ extended: false}))
app.use(express.json())

require('./Models')
const userCtrl = require('./controllers/usersCtrl')

var passport = require("passport")
var upload = require('./middleware/upload')


app.use(passport.initialize())
require('./auth/passports')(passport)

app.get('/',(req,res)=>{
    res.send('Wellcome to Home Page')
})

app.post('/users',userCtrl.addUser)
app.get('/users/getuser',passport.authenticate('jwt',{session:false}),userCtrl.getUser)
app.post('/users/login',userCtrl.login)
app.post('/users/addResto',passport.authenticate('jwt',{session:false}),userCtrl.addResto)
app.get('/users/getResto',passport.authenticate('jwt',{session:false}),userCtrl.getResto)
app.get('/users/getResto/:id',passport.authenticate('jwt',{session:false}),userCtrl.getRestoId)
app.put('/users/updateResto/:id',passport.authenticate('jwt',{session:false}),userCtrl.updateRestoId)
app.delete('/users/deleteResto/:id',passport.authenticate('jwt',{session:false}),userCtrl.deleteRestoId)
app.post('/users/upload',upload.single('file'),passport.authenticate('jwt',{session:false}),userCtrl.uploadFile)


app.listen(port, () => {
    console.log(`port listening from ${port}`);
})
