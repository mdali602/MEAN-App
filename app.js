var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();

const route = require('./routes/route');

// connect to mongoDB
mongoose.connect('mongodb://localhost:27017/contactlist');

// on connection
mongoose.connection.on('connected', () => {
  console.log(`Connected to database mongodb @ 27017`);
});

// on connection error
mongoose.connection.on('error', (err) => {
  if(err) {
    console.log('Error in database connection: ', err);
  }
});

// port no
const port = 3000;

// adding middleWare - cors
app.use(cors());

// body - parser
app.use(bodyParser.json());

// static files
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/api', route);

// testing Server
app.get('/', (req, res) => {
  res.send('foobar');
})

app.listen(port, () => {
	console.log(`Server listening at port: ${port}`);
})