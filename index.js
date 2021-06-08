const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");


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


app.get("/",(req,res)=>{
    res.render("index");

});

app.listen(4040,() =>{
    console.log("O servidor está rodando!")
});
