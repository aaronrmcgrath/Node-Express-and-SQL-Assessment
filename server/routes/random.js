//RANDOM NUMBER MODULE

var express = require('express');
var random = express.Router();

function randomNumber(min, max){
  return Math.floor(Math.random() * (1 + max - min) + min);
}

module.exports = random;
