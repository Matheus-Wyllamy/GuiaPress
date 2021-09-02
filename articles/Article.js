const Sequelize = require ('sequelize');
const connection = require('../database/database');
const Category = require('../categories/Category')

const Article = connection.define('Articles', {
title:{
    type: Sequelize.STRING,
    allowNull: false
},slug: {
    type: Sequelize.STRING,
    allowNull: false
}, 
body: {
    type: Sequelize.TEXT,
    allowNull: false

}
})

Category.hasMany(Article) // UMA CATEGORIA TEM MUITOS ARTIGOS
Article.belongsTo(Category) // UM ARTIGO PERTENCE A UMA CATEGORIA

// logo depois de criar as tables tem que remover => porque ele vai tentar criar toda vez quando
 // rodar a aplicação Article.sync({force: true})

module.exports = Article;
 