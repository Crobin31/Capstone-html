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

/*Buttons Nav*/
$("#tocontact").click(function navigateToPage() {
  window.location.href = "./main/aboutme.html";
});

$("#tohome").click(function navigateToPage() {
  window.location.href = "./index.html";
});

/*MATCHING GAME*/
let cardOneClickable = true;
let cardTwoClickable = true;
let cardThreeClickable = true;
let cardFourClickable = true;
let cardFiveClickable = true;
let cardSixClickable = true;
let cardSevenClickable = true;
let cardEightClickable = true;
let cardNineClickable = true;
let cardTenClickable = true;
let clicks = 0;
let firstCard = null; // Stores the jQuery object of the first click
let secondCard = null; // Stores the jQuery object of the second click

let cardType = [];
let cards = [];

let points = 0;

//Initialize
const initialize = () => {
  // 1. Fill the deck
  cardType = [
    "images/animals/animal1.png",
    "images/animals/animal1.png",
    "images/animals/animal2.png",
    "images/animals/animal2.png",
    "images/animals/animal3.png",
    "images/animals/animal3.png",
    "images/animals/animal4.png",
    "images/animals/animal4.png",
    "images/animals/animal5.png",
    "images/animals/animal5.png",
  ];

  // 2. Empty the cards array for a fresh game
  cards = [];

  // 3. Loop through the deck until it's empty
  while (cardType.length > 0) {
    // Pick a random index based on current deck size
    let randomIndex = Math.floor(Math.random() * cardType.length);

    // .splice(index, 1) removes the item and returns it in an array
    let pickedCard = cardType.splice(randomIndex, 1)[0];

    // Push it into our shuffled cards array
    cards.push(pickedCard);
  }

  console.log(cards); // Your shuffled deck of 10 cards!
  $("#wintext").html("");

  for (i = 1; i <= 10; ++i) {
    $(`#card${i}`).fadeTo(0, 1).removeClass("matched");
    $(`#card${i}`).attr("src", "images/animals/animalback.png");
  }
};
initialize();

//2 CARDS FLIPPED FUNCTION
$(".cardimg").click(function () {
  // If we already have 2 cards flipped, don't allow more clicks
  if ($(this).hasClass("matched")) return;
  if (clicks >= 2) return;

  // 1. Get the index of this card (e.g., "card1" becomes 0)
  // We subtract 1 because our array starts at 0, but IDs start at 1
  let idNumber = $(this).attr("id").replace("card", "");
  let index = parseInt(idNumber) - 1;

  // 2. Reveal the ACTUAL hidden animal from our shuffled 'cards' array
  $(this).attr("src", cards[index]);

  if (!firstCard) {
    // FIRST CLICK
    clicks = 1;
    firstCard = $(this);
    $("#debug1").attr("src", firstCard.attr("src"));
  } else {
    // Prevent clicking the SAME card twice
    if ($(this).attr("id") === firstCard.attr("id")) return;

    // SECOND CLICK
    clicks = 2;
    secondCard = $(this);
    $("#debug2").attr("src", secondCard.attr("src"));

    // Check match after a tiny delay so the user sees the second card
    setTimeout(checkMatch, 500);
  }
});

function checkMatch() {
  let img1 = firstCard.attr("src");
  let img2 = secondCard.attr("src");

  if (img1 === img2 && firstCard.attr("id") !== secondCard.attr("id")) {
    // MATCH!
    firstCard.fadeTo(500, 0).addClass("matched"); // Add 'matched' class
    secondCard.fadeTo(500, 0).addClass("matched");
    points = points + 1;
    if (points >= 5) {
      setTimeout(win, 500);
      return;
    }
    setTimeout(reflip, 500);
  } else {
    // NO MATCH
    setTimeout(reflip, 500);
  }

  // Reset for next turn
  firstCard = null;
  secondCard = null;
}

//REFLIP FUNCTION
function reflip() {
  // We change '1 <= 10' to 'i <= 10'
  for (let i = 1; i <= 10; i++) {
    $(`#card${i}`).attr("src", "images/animals/animalback.png");
  }
  clicks = 0;
  cardOneClickable = true;
  cardTwoClickable = true;
  cardThreeClickable = true;
  cardFourClickable = true;
  cardFiveClickable = true;
  cardSixClickable = true;
  cardSevenClickable = true;
  cardEightClickable = true;
  cardNineClickable = true;
  cardTenClickable = true;
}

//Win Function
function win() {
  $("#wintext").html("Winner Winner Chicken Dinner");
  clicks = 0;
  cardType = [];
  cards = [];
  points = 0; 
  firstCard = null;
  secondCard = null;
  setTimeout(initialize, 2500);
}

/*$("#flip").click(function () {
  // Wait 1 second, then run the reflip code
  setTimeout(reflip, 1000);
});*/

//Cards Flipping
/*$("#card1").click(function () {
  if (clicks < 2 && cardOneClickable) {
    $("#card1").attr("src", cards[0]);
    cardOneClickable = false;
  }
});

$("#card2").click(function () {
  if (clicks < 2 && cardTwoClickable) {
    $("#card2").attr("src", cards[1]);
    cardTwoClickable = false;
  }
});

$("#card3").click(function () {
  if (clicks < 2 && cardThreeClickable) {
    $("#card3").attr("src", cards[2]);
    cardThreeClickable = false;
  }
});

$("#card4").click(function () {
  if (clicks < 2 && cardFourClickable) {
    $("#card4").attr("src", cards[3]);
    cardFourClickable = false;
  }
});

$("#card5").click(function () {
  if (clicks < 2 && cardFiveClickable) {
    $("#card5").attr("src", cards[4]);
    cardFiveClickable = false;
  }
});

$("#card6").click(function () {
  if (clicks < 2 && cardSixClickable) {
    $("#card6").attr("src", cards[5]);
    cardSixClickable = false;
  }
});

$("#card7").click(function () {
  if (clicks < 2 && cardSevenClickable) {
    $("#card7").attr("src", cards[6]);
    cardSevenClickable = false;
  }
});

$("#card8").click(function () {
  if (clicks < 2 && cardEightClickable) {
    $("#card8").attr("src", cards[7]);
    cardEightClickable = false;
  }
});

$("#card9").click(function () {
  if (clicks < 2 && cardNineClickable) {
    $("#card9").attr("src", cards[8]);
    cardNineClickable = false;
  }
});

$("#card10").click(function () {
  if (clicks < 2 && cardTenClickable) {
    $("#card10").attr("src", cards[9]);
    cardTenClickable = false;
  }
});*/
