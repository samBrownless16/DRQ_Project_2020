const port = 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
// MongoDB Connection String (used to connect server to database)
const connectionString = 'mongodb+srv://admin:4jYT5K45BR4q@cluster0.ijihv.mongodb.net/drq_project?retryWrites=true&w=majority'
const schema = mongoose.Schema;

// CORS
app.use(cors());
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// Essentially configiration telling us where the front end content is located
app.use(express.static(path.join(__dirname, '../build')));
app.use('/static', express.static(path.join(__dirname, 'build//static')));

// parse application
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Connects to MongoDB server
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

// Database Schema
const titleSchema = new schema({
	title: String,
	year: String,
	genre: String,
	type: String,
	synopsis: String,
	imageUrl: String,
	actors: []
});

// Construct a database model
const titleModel = mongoose.model("titles", titleSchema);

/*app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});*/

// Find all documents
app.get('/api/titles', (req, res) => {
	titleModel.find((error, data) => {
		res.json(data);
	});
});

// Find a document with its _id
app.get('/api/titles/:id', (req, res) => {
	titleModel.findById({ _id: req.params.id }, (error, data) => {
		res.json(data);
	});
});

// post request which will add a document
app.post('/api/titles', (req, res) => {
	titleModel.create({
		title: req.body.title,
		year: req.body.year,
		genre: req.body.genre,
		type: req.body.type,
		synopsis: req.body.synopsis,
		imageUrl: req.body.imageUrl,
		actors: req.body.actors
	});
});

// put request which will update a document
app.put('/api/titles/:id', (req, res) => {
	titleModel.findByIdAndUpdate(req.params.id, req.body, { new: true },
		(error, data) => {
			res.send(data);
		}
	);
});

// delete request which will delete a document
app.delete('/api/titles/:id', (req, res) => {
	titleModel.findByIdAndDelete({ _id: req.params.id }, (error, data) => {
		if (error)
			res.send(error);
		else
			res.send(data);
	})
})

// * is for all other routes
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/../build/index.html'))
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})