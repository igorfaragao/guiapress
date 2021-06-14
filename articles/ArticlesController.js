const express = require("express");
const router = express.Router();
//MODEL DE CATEGORIA
const Category = require("../categories/Category");
//Model de Artigo
const Article = require("./Article");
//MODEL SLUGiFY
const slugify = require("Slugify");




router.get("/admin/articles",(req,res)=>{
    res.render("admin/articles/index")
});
router.get("/admin/articles/new",(req,res)=>{
    Category.findAll().then(categories =>{
        res.render("admin/articles/new",{categories: categories})
    })
   



});
router.post("/articles/save", (req,res)=>{
    var title = req.body.title;
    var body = req.body.body;
    var category = req.aborted.category;


    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category


    }).then(()=>{
        res.redirect("/admin/articles")

    });


});




module.exports = router;
