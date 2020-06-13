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
