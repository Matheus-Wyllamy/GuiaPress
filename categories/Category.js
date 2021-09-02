const Sequelize = require ('sequelize');
const connection = require('../database/database');

const Category = connection.define('categories', {
title:{
    type: Sequelize.STRING,
    allowNull: false
},slug: {
    type: Sequelize.STRING,
    allowNull: false
}
})

 // logo depois de criar as tables tem que remover => porque ele vai tentar criar toda vez quando 
 // rodar a aplicação Category.sync({force: true})

module.exports = Category;
 