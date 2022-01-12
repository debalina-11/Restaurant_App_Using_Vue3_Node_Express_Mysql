const db = require('../Models')
const Users = db.users
const AddResto = db.restaurants
const Images = db.images
const { genSaltSync, hashSync, compare } = require("bcrypt")
const{sign}= require("jsonwebtoken")
const passport = require('passport')
const multer = require('multer')

function validEmail (email){
    return String(email)
    .toLowerCase()
    .match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}
function validPassword (password){
    return password.length > 6
}

const addUser = async (req, res) => {
    try {
        let { password, name, email } = req.body
        const oldUser = await Users.findOne({ where: { email } })
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login")
        }
        if(validEmail(email) && validPassword (password)){
            const salt = genSaltSync(10)
            password = hashSync(password, salt)
            let data = await Users.create({
                name, email,
                password: password
            })
            const token = sign({email:email},'dola123',{
                expiresIn: "2h"
            })
            res.status(200).json({
                msg:"Signup",
                data,
                token:token
            })
        }else{
            res.status(422).json({msg:"Please Enter Correct Email or Password must be longer than 6 charecters"})
        }
    
    } catch (err) {
        console.log(err)
    }
}

const getUser = async (req, res) => {

    let data = await Users.findAll()

    res.status(200).json(data)
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        let data = await Users.findOne({ where: { email } })
        const ismatch = await compare(password, data.password)

        if (ismatch) {

            const token = sign({email:email},'dola123',{
                expiresIn: "2h"
            })
            // Users.token = token
            console.log("token:",token)

            res.status(200).json({
                msg:"login",
                data,
                token:token
            })
        } else {
            res.status(403).json({ msg: "invalid login" })
        }
    } catch (error) {
        res.status(403).json({ msg: "invalid login Details" })
    }
}

const addResto = async (req, res) => {
    const{name,address,contact} = req.body
        let data = await AddResto.create({name,address,contact})
    res.status(200).json(data)
}

const getResto = async (req, res) => {

    let data = await AddResto.findAll()

    res.status(200).json(data)
}
const getRestoId = async (req, res) => {

    let data = await AddResto.findOne({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json(data)
}

const updateRestoId = async (req, res) => {
    const { name, address, contact } = req.body
    let data = await AddResto.update({ name, address, contact }, {
        where: {
            id: req.params.id
        },
    })
    res.status(200).json(data)
}

const deleteRestoId = async (req, res) => {

    let data = await AddResto.destroy({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json(data)
}

const uploadFile = async (req, res) => {
    console.log(req.file)
    const name = req.file.filename
    let data = await Images.create({name})
    console.log(data)
    res.json({msg: 'upload'})
  };

module.exports = {
    addUser,
    getUser,
    login,
    addResto,
    getResto,
    getRestoId,
    updateRestoId,
    deleteRestoId,
    uploadFile
}