const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
//CATERGORIAS
const categoriesController = require("./categories/CategoriesController");
const Category = require("./categories/Category")
//ARTIGOS
const articlesController = require("./articles/ArticlesController");
const Article = require("./articles/Article");
//Usuarios
const userController = require("./user/UserController");
const User = require("./user/User")




//VIEW ENGINE
app.set('view engine','ejs');

//STATIC
app.use(express.static('public'));

//BODY PARSER
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());





//DATABASE
connection
    .authenticate()
    .then(()=>{
        console.log("conexão feita")
    }).catch((error)=>{
        console.log(error);
    });

app.use("/", categoriesController);
app.use("/", articlesController);
app.use("/", userController);



app.get("/", (req,res) =>{

    Article.findAll({
        order:[
            ['id','DESC']
        ],
        limit: 4
    }).then(articles =>{

        Category.findAll().then(categories=>{

            
        res.render("index",{articles: articles, categories: categories});

        });
    
    });

});


//PAGINA DE ARTIGOS
app.get("/:slug",(req,res)=>{
    var slug = req.params.slug;
    Article.findOne({
        where:{
            slug: slug
        }
    }).then(article =>{
        if(article != undefined){
            Category.findAll().then(categories=>{

            
                res.render("article",{article: article, categories: categories});
        
                });
        }else{
            res.redirect("/");
        }

    }).catch(err =>{
        res.redirect("/")
    })

});

// FITRO DE ARTIGO POR CATEGORIA DA NAVBAR
    app.get("/category/:slug",(req,res)=>{
        var slug = req.params.slug;
        Category.findOne({
            where:{
                slug:slug
            },include:[{model: Article}]
        }).then(category =>{
            if(category != undefined){

                Category.findAll().then(categories =>{
                    res.render("index",{articles: category.articles, categories: categories})
                });

            }else{
                res.redirect("/")
            }
        }).catch(err =>{
            res.redirect("/")
        });
    });



app.listen(4040,() =>{
    console.log("O servidor está rodando!")
});
