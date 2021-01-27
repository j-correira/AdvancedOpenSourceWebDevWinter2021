var express = require('express')
var mongoose = require('mongoose')
var app = express()
var path = require('path')
var bodyparser = require('body-parser')

//Sets up Middleware to use in app
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.json())

//Connect to MongoDb Database using Mongoose
mongoose.connect('mongodb://localhost:27017/favoriteFood',{
    useNewUrlParser:true
}).then(function(){
    console.log("Connected to Database");
}).catch(function(err){
    console.log(err);
})

//Load in Database Templates or Schema
require('./models/Food')
//variable reference to model
var Food = mongoose.model('food')

//Basic Data Entry using Mongoose and MongoDB
/*var Food = mongoose.model('Food', {nameoffood:String})

var food = new Food({nameoffood:"Pizza"});

food.save().then(function(){
    console.log("Food entry was saved")
})*/

app.post('/saveFoodEntry', function(req,res){
    console.log("Request Made")
    console.log(req.body)

    new Food(req.body).save().then(function(){
        console.log("Data Saved")
        res.redirect('foodlist.html')
    })

})

app.get('/getData',function(req,res){
    Food.find({}).then(function(food){
        res.json({food})
    })
})

app.post('/deleteFood', function(req,res){
    console.log("Food deleted: " , req.body._id)
    Food.findByIdAndDelete(req.body._id).exec()
    res.redirect('foodlist.html')
})


//sets up static folder
app.use(express.static(__dirname+"/views"))
app.listen(3000, function(){
    console.log("Connected on Port 3000")
});


