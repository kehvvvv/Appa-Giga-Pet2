var pets = [
  { name: "Appa", weight: 10, happiness: 5, img: "appa.png", alt: "Appa, YIP YIP!"},
  { name: "Momo", weight: 4, happiness: 7, img: "momo.png", alt: "Momo, do something cool." }
]
var petImagePool = ["dog.png", "cow.png", "snake.png"];

var currentPetIndex = 0;
var pet_info = pets[currentPetIndex]; // variable will always hold "current" object
$(function () { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.

// Bug error 
$("#dtRunBug").off("click").on("click", function () {
  var a = $("#dtA").val();  // string
  var b = $("#dtB").val();  // string

  var result = a + b;       // INTENTIONAL BUG: string concatenation

  $("#dtMathOutput").text('Bug demo: "' + a + '" + "' + b + '" = ' + result);
});


  setupPetSelector();
  // Called function to update the name, happiness, and weight of our pet in our HTML
  checkAndUpdatePetInfoInHtml();

  // When each button is clicked, it will "call" function for that button (functions are below)
  $('.treat-button').click(clickedTreatButton);
  $('.play-button').click(clickedPlayButton);
  $('.exercise-button').click(clickedExerciseButton);

  $('#pause-pet').click(pauseButton);
  $('#resume-pet').click(resumeButton);

  $('.pet-image').click(function () {
    $(this).toggleClass('happy');
  });
});

function setupPetSelector() {
  var selector = $('#pet-Selector');
  for (var i = 0; i < pets.length; i++) {
    var option = $('<option></option>');
    option.val(i);
    option.text(pets[i].name);
    selector.append(option);
  }
  selector.val(currentPetIndex);
  selector.change(function () {
    currentPetIndex = parseInt($(this).val());
    pet_info = pets[currentPetIndex];
    checkAndUpdatePetInfoInHtml();
  });

  $('#add-Pet-Button').click(function () {
    var newName = $('#new-Pet-Name').val();
    if (newName === "") {
      newName = "New Pet (" + (pets.length + 1) + ")";
    }
    var imgIndex = pets.length % petImagePool.length;
    var chosenImg = petImagePool[imgIndex];

    var newPet = {
      name: newName,
      weight: 10,
      happiness: 5,
      img: chosenImg,
      alt: newName + " the giga pet"
    };

    pets.push(newPet);
    var newOption = $('<option></option>');
    newOption.val(pets.length - 1);
    newOption.text(newPet.name);
    selector.append(newOption);

    currentPetIndex = pets.length - 1;
    pet_info = newPet;
    selector.val(currentPetIndex);
    checkAndUpdatePetInfoInHtml();

    $('#new-Pet-Name').val("")
  });
}
// Add a variable "pet_info" equal to a object with the name (string), weight (number), and happiness (number) of your pet
var pet_info = { name: "My Pet Name", weight: "??", happiness: "??" };

function clickedTreatButton() {
  // Increase pet happiness
  pet_info.happiness = pet_info.happiness + 1;
  // Increase pet weight
  pet_info.weight = pet_info.weight + 1;
  checkAndUpdatePetInfoInHtml();
  showReaction("Delicious!");
}

function clickedPlayButton() {
  // Increase pet happiness
  pet_info.happiness = pet_info.happiness + 2;
  // Decrease pet weight
  pet_info.weight = pet_info.weight - 1;
  checkAndUpdatePetInfoInHtml();
  showReaction("That was fun!");
}

function clickedExerciseButton() {
  // Decrease pet happiness
  pet_info.happiness = pet_info.happiness - 1;
  // Decrease pet weight
  pet_info.weight = pet_info.weight - 2;
  checkAndUpdatePetInfoInHtml();
  showReaction("So tired...");
}

function checkAndUpdatePetInfoInHtml() {
  checkWeightAndHappinessBeforeUpdating();
  updatePetInfoInHtml();
}

function checkWeightAndHappinessBeforeUpdating() {
  // Add conditional so if weight is lower than zero.
  if (pet_info.weight < 0) {
    pet_info.weight = 0;
  }

  if (pet_info.happiness < 0) {
    pet_info.happiness = 0;
  }
}

function showReaction(message) {
  $('#pet-reaction').text(message);
}

// Updates your HTML with the current values in your pet_info object
function updatePetInfoInHtml() {
  $('.name').text(pet_info['name']);
  $('.weight').text(pet_info['weight']);
  $('.happiness').text(pet_info['happiness']);
  $("#petImg").attr("src", pet_info.img);
  $("#petImg").attr("alt", pet_info.alt);
}

// uses .off() to remove all click handlers from main buttons
function pauseButton() {
  $('.treat-button').off('click');
  $('.play-button').off('click');
  $('.exercise-button').off('click');
}

//uses .off() before reattaching handlers
function resumeButton() {
  $('.treat-button').off('click');
  $('.play-button').off('click');
  $('.exercise-button').off('click');

  $('.treat-button').click(clickedExerciseButton);
  $('.play-button').click(clickedExerciseButton);
  $('.exercise-button').click(clickedExerciseButton);
}
