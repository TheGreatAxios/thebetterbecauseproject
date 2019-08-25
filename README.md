# The Better Because Project Work Flow

## Project Setup
	1. Git Clone the Repository
	2. cd into the directory
	3. npm install (to install all dependencies)
	4. make sure that you have a .env file (environment variables)
	... The .env file should contain the following code: 
	... PORT=80
	...SECRET=better
	... The next three are from the Cloudinary API
	...CLOUD_NAME=fleur-technologies
	...API_KEY=282957596687138
	...API_SECRET=N80-_WsQW3iKjyHHe-QwWJ69jNA
	... The following two are for the MONGO_DB Production and Test Databases
	..MONGO_URI_PRODUCTION=
	...MONGO_URI_TEST=
	...NODE_ENV=development (this is production when put to a live server)
## Running The Project
	... Once everything is setup you have to run one command to get everything started in your development environment.
	1. You simply run "npm run dev" into your terminal once you cd into the project root
	2. From there type localhost into your browser and you should see the website
	3. In addition, other commands can be used via npm scripts to provide new functionality  
## The Tech Stack
	... The tech stack currently consists of NodeJs, ExpressJs, MongoDB (with the Mongoose ORM), and the PugJs template engine, as well as SCSS for Styling Sheets.