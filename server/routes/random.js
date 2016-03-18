//RANDOM NUMBER MODULE

var express = require('express');
var random = express.Router();
var randomNum = 0;

function randomNumber(min, max){
  return Math.floor(Math.random() * (1 + max - min) + min);
}

randomNumber(1,100);

console.log('In Random Module, number = ', randomNumber(1,100));


module.exports = random;
