var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useUnifiedTopology', true);

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended : true}));


//SCHEMA SETUP
var campgroundSchema= new mongoose.Schema({
	name:String,
	image:String,
	description:String,
});

var Campground = mongoose.model("Campground",campgroundSchema);

// Campground.create(
// 	{
// 	name:"Northern Rim Campground",
		
// 	image:"https://images.unsplash.com/photo-1520824071669-892f70d8a23d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=997&q=80",
		
// 	description:"This is such a peaceful place ! We should come here more often !!!!"
// 	}, function(err,campground){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log("NEWELY CREATED CAMPGROUND");
// 		console.log(campground);
// 	}
// });


// var campgrounds=[
// 		{name:"Northern Rim Campground",image:"https://images.unsplash.com/photo-1520824071669-892f70d8a23d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=997&q=80"},
// 		{name:"Joshua Tree's Jumbo Rocks Campground",image:"https://images.unsplash.com/photo-1477581265664-b1e27c6731a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
// 		{name:"Sage Creek Primitive Campground",image:"https://images.unsplash.com/photo-1486179814561-91c2d61316b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
// 	{name:"Northern Rim Campground",image:"https://images.unsplash.com/photo-1520824071669-892f70d8a23d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=997&q=80"},
// 		{name:"Joshua Tree's Jumbo Rocks Campground",image:"https://images.unsplash.com/photo-1477581265664-b1e27c6731a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
// 		{name:"Sage Creek Primitive Campground",image:"https://images.unsplash.com/photo-1486179814561-91c2d61316b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"}
// ];


app.get("/",function(req,res){
	//res.send("This will be the main landing page !!!");
	res.render("landing");
});


app.get("/campgrounds",function(req,res){
	Campground.find({},function(err,allCampgrounds){
		if(err){
			console.log(err);
		}else{
			res.render("index",{campgrounds:allCampgrounds});
		}
	})
	//res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds",function(req,res){
	//res.send("You hit the post route !");
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name:name,image:image,description:desc}
	
	//campgrounds.push(newCampground);
	Campground.create(newCampground,function(err,newlyCampground){
		if(err){
			console.log(err);
		}else{
			res.redirect("/campgrounds");
		}
	})
	
	//res.redirect("/campgrounds");
	//console.log(body);
	
});

app.get("/campgrounds/new",function(req,res){
	res.render("new.ejs");
});

app.get("/campgrounds/:id",function(req,res){
	//res.render("show");
	Campground.findById(req.params.id,function(err,foundCampground){
		if(err){
			console.log(err);
		}else{
			res.render("show",{campground:foundCampground});
		}
	})
	
})

app.listen(3000,function(){
	console.log("Yelpcamp server has started !");
});