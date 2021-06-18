const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require("bcryptjs");

router.get("/admin/users/create",(req,res)=>{
    res.render("admin/users/create")
});
//LISTANDO USUARIO
router.get("/admin/users", (req,res)=>{

    User.findAll().then(users=>{
        res.render("admin/users/index",{users: users})

    });
});
//CRIANDO NOVO USUARIO
router.post("/users/create",(req,res)=>{

    var email = req.body.email;
    var password = req.body.password


    User.findOne({where:{email: email}}).then(user =>{

        if(user == undefined){
            
            //INCRIPTAÇÃO DE SENHA
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password,salt);
            User.create({
            email: email,
            password: hash
            }).then(()=>{

                res.redirect("/");  
        
            }).catch((err)=>{
            res.redirect("/")
        });

        }else{
            res.redirect("/admin/users/create")
        }

    });
 

});
//DELETANDO USUÁRIO
router.post("/users/delete", (req,res) =>{
    var id = req.body.id;
    if (id != undefined){
        if (!isNaN(id)){
            User.destroy({
                where:{
                    id: id
                }
            }).then(()=>{
                res.redirect("/admin/users")
            })
        }else{ //NÂO FOR UM NUMERO
            res.redirect("/admin/users");
        }
    }else{ //NULO
        res.redirect("admin/users")
    }
});



module.exports = router;
