const Sequelize = require('sequelize');
const database = require('../db.js');

const Imagem = database.define('imagem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    foto: {
        type: Sequelize.BLOB,
        allowNull: false
    },
    equipamentoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "equipamento",
            key: "id",
        },
    },
}, {
    tableName: 'imagem',
    paranoid: true
})

Imagem.associate = function (models) {
    Imagem.belongsTo(models.Equipamento)
}
module.exports = Imagem;