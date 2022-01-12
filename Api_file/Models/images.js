module.exports = (sequelize,DataTypes) => {
    const Images = sequelize.define('images',{
        name:{
            type:DataTypes.STRING
        }
    },{
        timestamps:false
    })
    return Images;
}