//Example modules in Node 
var express = require('express')
var hbs = require('hbs')

var app = express()

const {rand, some} = require('./modules/randomNum')


//setup handlebars view engine

console.log(some);

app.set('view engine', 'hbs')
app.use(express.urlencoded({extended:false}))

hbs.registerHelper('ptag',function(num, messageToPassIn){
    var msg = ""
    for(var i = 0; i<num; i++){
        msg += `<p>${messageToPassIn}${num}</p>`
    }
    return new hbs.handlebars.SafeString(msg)
})
app.get('/form',function(req,res){
    res.render('form.hbs')
})

app.post('/results',function(req,res){
    console.log(req.body);
    res.render('results.hbs',{
        num:req.body.testNumber
    })
})

app.listen(3000,function(){
    console.log("connected on port 3000")
});


