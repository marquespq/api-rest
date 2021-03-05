const Sequelize = require('sequelize')
const instancia = require('../../banco-de-dados')
const colunas = {
    nome:{
        type:Sequelize.STRING,
        allowNull: false
    },
    preco:{
        type:Sequelize.STRING,
        allowNull: false
    },
    categoria:{
        type: Sequelize.ENUM('Inativo', 'Ativo'),
        allowNull:false
    }
}

const opcoes = {
    freezeTableName: true,
    tableName: 'fornecedores',
    timestamps: true,
    createdAt:'dataCriacao',
    updatedAt:'dataAtualizacao',
    version:'versao'
}
module.exports = instancia.define('fornecedor', colunas, opcoes)