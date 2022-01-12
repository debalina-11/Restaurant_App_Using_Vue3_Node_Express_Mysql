const {Sequelize,DataTypes} = require('sequelize')

const sequelize = new Sequelize('resto_details','root','',{
    host:'localhost',
    dialect:'mysql',
    pool:{max:5,min:0,idle:10000},
    logging:false
})

sequelize.authenticate()
.then(()=>{
    console.log("DB Connected");
})
.catch(err => {
    console.log("Error"+err);
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./users')(sequelize,DataTypes)
db.restaurants = require('./restaurants')(sequelize,DataTypes)
db.images = require('./images')(sequelize,DataTypes)

db.sequelize.sync({force:false})
.then(()=>{
    console.log("yes re sync");
})
module.exports=db