const {Sequelize} = require("sequelize");
const db = require("../config/Database.js");

const {DataTypes} = Sequelize;

const Pengetahuan = db.define('pengetahuan', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    judul:{
        type: DataTypes.STRING,
    },
    kategori:{
      type: DataTypes.STRING,
    },
    penulis:{
      type: DataTypes.STRING,
    },
    content:{
        type: DataTypes.TEXT,
      },
    image:{
      type: DataTypes.STRING,
    },
    url:{
      type: DataTypes.STRING,
    },
    createdAt: {
        field: 'created_at',
        type: Sequelize.DATE,
    },
    updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE,
    },
},
{
    tableName: 'pengetahuan',
    freezeTableName:true,    
}
);


module.exports = Pengetahuan;

