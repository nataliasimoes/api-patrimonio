const Sequelize = require('sequelize');
const database = require('../db.js');

const Secretaria = database.define('secretaria', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
}, {
    tableName: 'secretaria',
    paranoid: true
  })

Secretaria.associate = function(models) {
}

module.exports = Secretaria;