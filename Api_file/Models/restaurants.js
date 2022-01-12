module.exports = (sequelize,DataTypes) => {
    const Users = sequelize.define('restaurants',{
        name:{
            type:DataTypes.STRING
        },
        address:{
            type:DataTypes.STRING
        },
        contact:{
            type:DataTypes.INTEGER
        }
    },{
        timestamps:false
    })
    return Users;
}