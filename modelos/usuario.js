const {Sequelize, DataTypes} = require('sequelize');
const database = require('../db.js');

const Usuario = database.define('usuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.NUMBER,
        allowNull: false, 
        unique: true
    },
    email: {
        type: DataTypes.NUMBER,
        allowNull: false,
        validate:{
            isEmail: true
        }
    },
    senha: {
        type: DataTypes.NUMBER,
        allowNull: false
    }
}, {
    tableName: 'usuario',
    paranoid: true
})

Usuario.associate = function (models) {
}
module.exports = Usuario;