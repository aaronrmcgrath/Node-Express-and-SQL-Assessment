// JAVASCRIPT APPLICATION - jQuery

// Global variables

var animalArray = [];


// jQuery on page load

$(document).ready(function(){

  initDom();
  $('#animal-form').on('submit', addAnimal);

});


// Functions

function initDom(){
  console.log('Works!');
  appendAnimals();
}

function getAnimals() {
  $.ajax({
    type: 'GET',
    url: '/animals/get',
    success: function(data){
      console.log('GET successful: ', data);
      console.log(data);
    }
  });
}

function addAnimal() {
  event.preventDefault();

  var animal = {};

  $.each($('#animal-form').serializeArray(), function(i, field){
    animal[field.name] = field.value;
  });

  animalArray.push(animal);

  // var animal = $('#animal-form').serialize();
  console.log(animal);

  $.ajax({
    type: 'POST',
    url: '/animals/add',
    data: animal,
    success: function(data){
      console.log('POST successful: ', data);
    }
  });

  getAnimals();

  $('#catform').find('input[type=text]').val('');
}

function appendAnimals() {
  getAnimals();
  $('.display-animals').append('<div class="animals"></div>');

  var $el = $('.animals').children().last();

  for(var i = 0; i < animalArray.length; i++) {
    $el.append('<p>' + animalArray[i].animal + '</p>');
  }


}
