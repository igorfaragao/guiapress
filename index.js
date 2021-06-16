const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
//CATERGORIAS
const categoriesController = require("./categories/CategoriesController");
//ARTIGOS
const articlesController = require("./articles/ArticlesController");
//importação dos models
const Article = require("./articles/Article");
const Category = require("./categories/Category")



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




app.get("/", (req,res) =>{

    Article.findAll({
        order:[
            ['id','DESC']
        ]
    }).then(articles =>{
        res.render("index",{articles: articles});
    });

});



app.get("/:slug",(req,res)=>{
    var slug = req.params.slug;
    Article.findOne({
        where:{
            slug: slug
        }
    }).then(article =>{
        if(article != undefined){
            res.render("article",{article: article});
        }else{
            res.redirect("/");
        }

    }).catch(err =>{
        res.redirect("/")
    })

});

app.listen(4040,() =>{
    console.log("O servidor está rodando!")
});
