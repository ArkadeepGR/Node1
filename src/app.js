const express=require("express")
const app=express()
const utils=require("./utils.js")
const port=process.env.PORT || 3000
path=require("path")
///public directory
app.use(express.static(path.join(__dirname,"../public")))

//hbs partials
const hbs=require("hbs")
hbs.registerPartials(path.join(__dirname,"../templates/partials"))


//hbs views
app.set("view engine","hbs")
app.set("views",path.join(__dirname,"../templates/views"))  //set views directory path



app.get("",function(req,res){
    res.render("index",{title:"Weather",name:"Arkadeep"})
})
app.get("/help",function(req,res){
    res.render("help",{name:"Arkadeep",title:"Help"})
})
app.get("/about",function(req,res){
    res.render("about",{name:"Arkadeep",title:"About"})
})

//API Development json response
app.get("/weather",function(req,res){
    if(!req.query.address)
    {
        res.send({Error:"Address is mandetory"})
    }
    else{
        utils.weather(req.query.address,function(error,response){
            if(!error)
                res.send(response)
            else
                res.send({Error:error})
        })
    }
})

//404 inside help
app.get("/help/*",function(req,res){
    res.render("pageNot",{title:"404",name:"Arkadeep",msg:"Help article not found"})
})

//404
app.get("*",function(req,res){
    res.render("pageNot",{title:"404",name:"Arkadeep",msg:"404 page not found"})
})

/*
app.listen(3000,function(){
    console.log("Server up in port 3000")
})
*/
app.listen(port,function(){
    console.log("Server up in port "+port)
})