function roll() {
  var randomNumber1 = Math.floor(Math.random() * 6) + 1;
  var randomNumber2 = Math.floor(Math.random() * 6) + 1;
  $("#dice1").attr("src", "./images/dice" + randomNumber1 + ".png");
  $("#dice2").attr("src", "./images/dice" + randomNumber2 + ".png");

  if (randomNumber1 > randomNumber2) {
    $(".dice-h1").html(
      `<span class="material-symbols-outlined">golf_course</span> Player 1 Wins`
    );
  } else if (randomNumber1 < randomNumber2) {
    $(".dice-h1").html(
      `Player 2 Wins <span class="material-symbols-outlined">golf_course</span>`
    );
  } else {
    $(".dice-h1").text("Draw");
  }
}

/*DrumSets*/ 
// Detecting Button Clicks
$(".drum").on("click", function () {
  var buttonInnerHTML = $(this).text();
  makeSound(buttonInnerHTML);
  buttonAnimation(buttonInnerHTML);
});

// Detecting Keyboard Press
$(document).on("keydown", function (event) {
  makeSound(event.key);
  buttonAnimation(event.key);
});

function makeSound(key) {
  switch (key) {
    case "w":
      new Audio("./sounds/tom-1.mp3").play();
      break;
    case "a":
      new Audio("./sounds/tom-2.mp3").play();
      break;
    case "s":
      new Audio("./sounds/tom-3.mp3").play();
      break;
    case "d":
      new Audio("./sounds/tom-4.mp3").play();
      break;
    case "j":
      new Audio("./sounds/snare.mp3").play();
      break;
    case "k":
      new Audio("./sounds/crash.mp3").play();
      break;
    case "l":
      new Audio("./sounds/kick-bass.mp3").play();
      break;
    default:
      return;
  }
}

function buttonAnimation(currentKey) {
  var $activeButton = $("." + currentKey);

  if ($activeButton.length === 0) return;

  $activeButton.addClass("pressed");

  setTimeout(function () {
    $activeButton.removeClass("pressed");
  }, 100);
}