// ANIMALS MODULE

var express = require('express');
var pg = require('pg');
var animals = express.Router();
var randomNum = require('./random');
var connectionString;

var quantity = parseInt(randomNum.req);

if (process.env.DATABASE_URL) {
  pg.defaults.ssl = true;
  connectionString = process.env.DATABASE_URL;
} else {
  connectionString = 'postgres://localhost:5432/zoo_animals';
}

pg.connect(connectionString, function(err, client, done){
  if (err) {
    console.log('Error connecting to DB!', err);
    //TODO end process with error code
  } else {
    var query = client.query('CREATE TABLE IF NOT EXISTS animals (' +
                              'id SERIAL PRIMARY KEY,' +
                              'animal varchar(80) NOT NULL,' +
                              'quantity int NOT NULL);'
    );

    query.on('end', function(){
      console.log('Successfully ensured schema exists');
      done();
    });

    query.on('error', function(error) {
      console.log('Error creating schema!', error);
      //TODO exit(1)
      done();
    });
  }
});


animals.use('/random', randomNum);

console.log('Here is a random number: ', quantity);

animals.post('/add', function(req, res) {
  var newAnimal = {
    animal: req.body.animal,
    quantity: 6
  };
  console.log('Zookeeper, here is your new animal: ', newAnimal);

  pg.connect(connectionString, function(err, client, done){
    client.query('INSERT INTO animals (animal, quantity) VALUES($1, $2)',
    [newAnimal.animal, newAnimal.quantity],
    function(err, result){
      done();

      if(err){
        console.log('Error inserting data: ', err);
        res.send(false);
      } else {
        res.send(result);
      }
    });
  });
});

animals.get('/get', function(req,res) {
  var results = [];
  pg.connect(connectionString, function(err, client, done){
    var query = client.query('SELECT * FROM animals ORDER BY id DESC;');

    query.on('row', function(row) {
      results.push(row);
    });

    query.on('end', function(){
      done();
      return res.json(results);
    });

    if(err) {
      console.log(err);
    }
  });
});


module.exports = animals;
