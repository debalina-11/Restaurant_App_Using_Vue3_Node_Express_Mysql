module.exports = (sequelize,DataTypes) => {
    const Users = sequelize.define('users',{
        name:{
            type:DataTypes.STRING
        },
        email:{
            type:DataTypes.STRING,
            unique:true
        },
        password:{
            type:DataTypes.STRING
        }
    },{
        timestamps:false
    })
    return Users;
}