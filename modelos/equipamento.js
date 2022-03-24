const { BOOLEAN } = require('sequelize');
const Sequelize = require('sequelize');
const database = require('../db.js');

const Equipamento = database.define('equipamento', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    tombo: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate:{
            isNumeric: true,
            len: [2,10]
        }
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    secretariaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "secretaria",
            key: "id",
        },
    },
    notaFiscal: {
        type: Sequelize.BLOB,
        allowNull: true
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            isIn: [['Em uso', 'Parado']], 
        }
    },
    estado: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    usuarioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "usuario",
            key: "id"
        }
    }
}, {
    tableName: 'equipamento',
    paranoid: true
})

Equipamento.associate = function(models) {
    Equipamento.belongsTo(models.Secretaria),
    Equipamento.belongsTo(models.Usuario)
}
module.exports = Equipamento;