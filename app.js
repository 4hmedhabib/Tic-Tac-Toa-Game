<%- include('../partials/header') %>

<div class="container">
	
	<header class="jumbotron">
		<div class="container">
			<h1>
				Welcome To YalpCamp
			</h1>
			<p>
				View our hand-picked campgrounds from all the world
			</p>
			<a class="btn btn-primary" href="/campgrounds/new" > Add New Campground</a>
		</div>
	</header>
    	
	<div class="row text-center" style="display:flex; flex-wrap: wrap">
		<% campgrounds.forEach(function(campground){  %>
		<div class="col-md-3 col-sm-6">
			<div class="thumbnail">
				<img src="<%= campground.image %>">
				<div class="caption">
					<h4><%= campground.name %></h4>
				</div>
				<p>
					<a href="/campgrounds/<%= campground._id %>" class="btn btn-primary">More Info</a>
				</p>

			</div>
			
		</div>
		<% }) %>
	</div>
</div>
var express         = require("express"),
    router          = express.Router(),
	Campground      = require("../models/campground"),
	middlewareObj	= require("../middleware");


<%- include("../partials/footer") %>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Tic Tac Toe Game</title>
</head>

<body>

    <div class="board" id="board">
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
    </div>
    <div class="winning-message" id="winning-message">
        <div data-winning-message-text>
            <button class="resetbtn" id="resetbtn">Restart</button>
        </div>
    </div>


    <script src="app.js"></script>
</body>

</html>

// INDEX -- show all campgrounds
router.get("/", function(req, res){
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err)
		}
		else
		{	
		res.render("campgrounds/index", {campgrounds: allCampgrounds});
		}
	});
});

// CREATE - add new campground to DB
router.post("/",  function(req, res){
	var name= req.body.name;
	var price= req.body.price;
	var image= req.body.image;
	var desc= req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCampground= {name:name, price:price, image:image, description:desc, author: author}
	console.log(req.user)
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		}else{
			console.log(newlyCreated)
			res.redirect("/campgrounds")
		}
	})
	
});

// NEW - show  for to create new   campground
router.get("/new", middlewareObj.isLoggedIn,function(req, res){
	res.render("campgrounds/new");
});

// SHOW - show more info about one campground
router.get("/:id", middlewareObj.isLoggedIn, (req, res)=>{
	// find the campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
		if(err){
			console.log(err)
		}else{
			console.log(foundCampground)
			// render show template with that campground
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit",  middlewareObj.checkCampgroundOwnership, function (req, res) {
	Campground.findById(req.params.id, function(err, foundCampground){
		res.render("campgrounds/edit", {campground: foundCampground});
	});
  });

// UPDATE CAMPROUND ROUTE
router.put("/:id", middlewareObj.checkCampgroundOwnership, function(req, res){
	// find and update the correct campground 
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			console.log(err)
			res.redirect("/campgrounds")
		}else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// DELETE CAMPROUND ROUTE
router.delete("/:id",   middlewareObj.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds")
		} 
		res.redirect("/campgrounds")
	})
});



module.exports = router;