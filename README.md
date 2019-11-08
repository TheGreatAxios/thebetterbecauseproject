# The Better Because Project

The Better Because Project is an open source project.

The mission of The Better Because Project is to inspire people through stories about how we’ve changed for the better because of what we’ve gone through with our mental health experiences. In addition, our stories discussthe growth and fulfillment that can come with these journeys.

In addition to this project having an open source codebase; we are always on the lookout for those willing to volunteer.  These positions include: graphic designers, social media managers, story editors, outreach team members and general volunteers.

If you’re interested in volunteering on an ongoing basis with the team please email the founder, Rebecca Massie, at Rebecca@TheBetterBecauseProject.org

We’re a fun remote international team and very passionate about this important cause. We can offer letters of recommendations to add to your resumes. You’d also be contributing to an important and impactful social justice project.

# About the Code

This repository contains the entire codebase for The Better Because Project.  Currently the codebase has 4 sections: Root (The highest level), Admin (For all Backend Code), Client (For all Front End Code), Public (For all client side scripts, styles, and images).

## Project Setup

1) Fork the Repository from https://github.com/TheGreatAxios/thebetterbecauseproject.git

2) CMD **cd** into the directory and run **npm install**
	- Please note you will need the at least the latest stable version of NodeJs (10.16.3), preferably the most current version (12.xx.x)

3) Rename the .env.sample file to .env in order to access *Environmental Variables*


## Running Locally

*To Run Locally: * Run **npm run dev** in your terminal in the root folder and access at localhost

*To Run Tests (In the Future): * Run **npm test** in your terminal in the root folder

## controller.js vs content.js (vs index.js)

A **controller** is where the logic of the platform lies.  Currently, the logic is **NOT** separarated from the router.  That will be fixed in the future.  Once that happens, the normal component folder will contain  both a controller.js and an index.js (router) file. 

A **content** file is where the content for certain pages are held.  This allows for easy understanding of where content (text) is placed and easy changes to be made without directly touching the pug (layout) files.

Once the controllers are separated, the **index** file in each component will contain the direct routes to pages.  

Current Example (WRONG)

	router.get('/stories/:id', (req, res) => {
		Story.findById(req.params.id, (err, story) => {
			if (err) { console.log(err); return err; }
			res.render('story', {
				content: content,
				story: story
			});
		});
	});

   Future Example (Will be Correct)
   

    router.get('/stories/:id', (req, res) => {
	    Story.getIndividualStory(req.params.id, (err, story) => {
		    .then(result => {
				res.render('story', {
					story: result,
					content: content
				});
			})
			.catch(err => {
				if (err.status) {
					res.status(err.status).json({
						message: err.message
					});
				} else {
					//console.log(err); // For Development Only
					res.status(500).json({
						message: 'Internal Server Error'
					});
				}
		});

## What is a model?

This project utilizes MongoDB (NoSQL) as the database with MongooseJs as the ORM (Object Relational Mapping). The models folder contains the layout of what the a story submission will contain.  The best part about Mongoose is that you don't need much if any SQL experience. If you know JavaScript; you can access the database.  

Currently the model file is fairly basic.  Over time it will grow as the platform does to utilize more of the feature set offered by both MongoDB and Mongoose.

## Roadmap (Features under Github Projects)

 - [X] NodeJs Configuration with Mongoose
 - [X] Cloudinary API Integration for Story Images
 - [X] Custom Backend with Admin and Developer Access
 - [X] Ability to edit stories via the backend
 - [ ] Ability to delete stories via the backend
 - [ ] Ability to update images via the backend
 - [ ] Change one story section to dynamic paragraphs as selected by the user
 - [ ] Make dynamic paragraphs editable via the backend
 - [ ] Integration of Medium
 - [ ] Update's to the Front-end Design

## Tests

Currently this project has no tests written. We hope to improve that by writing tests for as much as possible in order to better help future developers easily come into the project as well as understand where issues are coming from.

### Contributors

|Sawyer Cutler|[Fleur Technologies](https://fleurtechnologies.com) | TheGreatAxios |
|--|--|--|
| Project Advisor | Project Developer | Owner of Repository
