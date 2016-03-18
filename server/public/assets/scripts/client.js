// JAVASCRIPT APPLICATION - jQuery

// Global variables

var animalArray = [];


// jQuery on page load

$(document).ready(function(){
  console.log('Works!');
  // initDom();
  $('#animal-form').on('submit', addAnimal);

});


// Functions

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
    success: function(animal){
      console.log('POST successful: ', animal);
    }
  });

  $('#catform').find('input[type=text]').val('');
}
