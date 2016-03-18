// ANIMALS MODULE

var express = require('express');
var animals = express.Router();
var randomNum = require('./random');

animals.use('/random', randomNum);

animals.post('/add', function(req, res) {
  var newAnimal = req.body.animal;
  console.log('Zookeeper, here is your new animal: ', newAnimal);
});

module.exports = animals;
