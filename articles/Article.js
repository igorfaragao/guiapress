const Sequelize = require("sequelize");
const connection = require("../database/database");
//relacionamento
const Category = require("../categories/Category");

const Article = connection.define('articles',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },slug:{
        type: Sequelize.STRING,
        allowNull: false
    },
    body:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});
//relacionamentos
Category.hasMany(Article); // UMA CATEGORIA tem MUITOS ARTIGOS 1-P-M
Article.belongsTo(Category);// UM ARTIGO pertence a UMA CATEGORIA 1-P-1
//







module.exports = Article;