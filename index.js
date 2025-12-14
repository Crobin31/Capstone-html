function roll(){
    var randomNumber1 = Math.floor(Math.random() * 6) + 1;
    var randomNumber2 = Math.floor(Math.random() * 6) + 1;
    document.getElementById("dice1").setAttribute("src", "./images/dice" + randomNumber1 + ".png");
    document.getElementById("dice2").setAttribute("src", "./images/dice" + randomNumber2 + ".png");

    if (randomNumber1 > randomNumber2){
        document.querySelector(".dice-h1").innerHTML = document.querySelector("h1").innerHTML = `<span class="material-symbols-outlined">golf_course</span> Player 1 Wins`;
    }
    else if (randomNumber1 < randomNumber2){
        document.querySelector(".dice-h1").innerHTML = `Player 2 Wins<span class="material-symbols-outlined">golf_course</span>`; 
    }
    else{
        document.querySelector(".dice-h1").innerHTML = "Draw";
    }
}