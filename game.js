var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = []; // This array stored which button clicked by user.
var level = 0;
var isStart = false;

$(document).on("touchstart",function(){
  if (!isStart) {
    $("h1").text("Level " + level);
    nextSequence();
    // After the game start keydown invalid.
    isStart = true;
  }
});
// checking whether if the user press any key or not!
$(document).keydown(function() {
  if (!isStart) {
    $("h1").text("Level " + level);
    nextSequence();
    // After the game start keydown invalid.
    isStart = true;
  }
});

// this callback function stored clicked button by user to userClickedPattern array
$(".btn").click(function() {

  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  //Calling checkMatch after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence
  checkMatch(userClickedPattern.length - 1);
});


function checkMatch(currentLevel) {

  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    console.log("success");
    console.log(userClickedPattern);

    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function() { //5. Call nextSequence() after a 1000 millisecond delay.
        nextSequence();
      }, 1000);
    }

  } else {
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    console.log("false");

    $("h1").text("Game Over, Press Any Key to Restart");
    startAgain(); // Reset values.
  }
}

function nextSequence() {

  // Everytime reset the userClickedPattern because of the game rule :)
  userClickedPattern = [];

  // When our code reach this function uptade the level info.
  level++
  $("h1").text("Level " + level);

  // We create a random number between 0 and 3
  var randomNumber = Math.floor(Math.random() * 4);

  // Create a new variable called randomChosenColour,we stored a random button colour inside
  var randomChosenColour = buttonColours[randomNumber];

  // Pushing the button colour stored called randomChosenColour to the gamePattern array.
  gamePattern.push(randomChosenColour);
  console.log(randomChosenColour);

  //Animating a flash and sound
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

// This function helps us to play sound clicked by user corresponding the button colour
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// adding some animate to the clicked button
function animatePress(currentColour) {
  //adding pressed class to the button pressed by user.
  $("#" + currentColour).addClass("pressed");

  //removing pressed class to the button pressed by user after 100milisecond.
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

 // to start game again we need to reset same values(level-isStart-gamePattern)
function startAgain() {
  level = 0;
  gamePattern = [];
  isStart = false;
}
