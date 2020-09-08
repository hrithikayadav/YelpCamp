var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app", { useNewUrlParser: true });

mongoose.set('useUnifiedTopology', true);


var catSchema = new mongoose.Schema({
	name : String,
	age : Number,
	temparament : String,
});

var Cat = mongoose.model("Cat",catSchema);

// var George = new Cat({
// 	name : "Iris",
// 	age:7,
// 	temparament : "Quiet"
// });

// George.save(function(err,cat){
// 	if(err){
// 		console.log("SOMETHING WENT WRONG !!!")
// 	}else{
// 		console.log("WE JUST SAVED A CAT TO DB...");
// 		console.log(cat);
// 	}
// });

Cat.create({
	name:"Snow White",
	age:5,
	temparament:"Bland"
}, function(err,cat){
	if(err){
		console.log(err)
	}else{
		console.log(cat);
	}
});

Cat.find({},function(error){
	if(error){
		console.log("OH NO ! ERROR !");
		console.log(error);
	}else{
		console.log("ALL THE CATS......");
		console.log(error);
	}
})