"use strict";
// Classes and IDs that we will use :
//.player--active,#score--0,#current--0,#score--1,#current--1
//.btn btn--new,btn btn--roll,btn btn--hold,.dice

const player1 = document.querySelector(".player--0");
const player2 = document.querySelector(".player--1");

const player1Score = document.querySelector("#score--0");
const player1Current = document.querySelector("#current--0");

const player2Score = document.querySelector("#score--1");
const player2Current = document.querySelector("#current--1");

const btnNewGame = document.querySelector(".btn--new");
const btnRollDice = document.querySelector(".btn--roll");
const originalRollText = document.querySelector(".btn--roll").textContent;
const btnHoldScore = document.querySelector(".btn--hold");

const dice = document.querySelector(".dice");

//Random Number Generator (Between 1 and 6)
let player1TotalScore = 0;
let player2TotalScore = 0;
player1Score.textContent = player1TotalScore;
player2Score.textContent = player2TotalScore;

let player1CurrentScore = 0;
let player2CurrentScore = 0;

let wonAlready = 0;

const diceRollRandom = () => Math.trunc(Math.random() * 6) + 1;

const addCurrentScore = function (currentScore) {
  if (currentScore !== 1) {
    if (checkClassActive() === "1") {
      player1CurrentScore += currentScore;
      player1Current.textContent = player1CurrentScore;
    } else if (checkClassActive() === "2") {
      player2CurrentScore += currentScore;
      player2Current.textContent = player2CurrentScore;
    }
  }
};

const changeCurrentPlayer = function () {
  if (player1.classList.contains("player--active")) {
    player1.classList.remove("player--active");
    player2.classList.add("player--active");
    player1CurrentScore = 0;
    player1Current.textContent = player1CurrentScore;
  } else {
    player2.classList.remove("player--active");
    player1.classList.add("player--active");
    player2CurrentScore = 0;
    player2Current.textContent = player2CurrentScore;
  }
};

const setActivePlayer1 = function () {
  player2.classList.remove("player--active");
  player1.classList.add("player--active");
};

const checkClassActive = () =>
  player1.classList.contains("player--active") ? "1" : "2";

btnRollDice.addEventListener("click", function () {
  if (!wonAlready) {
    const rollDice = diceRollRandom();
    dice.src = `dice-${rollDice}.png`;

    if (checkClassActive() === "1") {
      if (rollDice === 1) {
        player1CurrentScore = 0;
        player1Current.textContent = player1CurrentScore;
        changeCurrentPlayer();
      } else {
        addCurrentScore(rollDice);
      }
    }

    //Player 2
    else if (checkClassActive() === "2") {
      if (rollDice === 1) {
        player2CurrentScore = 0;
        player2Current.textContent = player2CurrentScore;
        changeCurrentPlayer();
      } else {
        addCurrentScore(rollDice);
      }
    }
  }
});

btnHoldScore.addEventListener("click", function () {
  if (!wonAlready) {
    let player1ScoreTotal = Number(player1Score.textContent);
    let player2ScoreTotal = Number(player2Score.textContent);

    if (player1ScoreTotal < 100 && player2ScoreTotal < 100) {
      if (checkClassActive() === "1") {
        player1ScoreTotal += Number(player1Current.textContent);
        player1Score.textContent = player1ScoreTotal;
        changeCurrentPlayer();
      } else if (checkClassActive() === "2") {
        player2ScoreTotal += Number(player2Current.textContent);
        player2Score.textContent = player2ScoreTotal;
        changeCurrentPlayer();
      }
    }
    const player1Won = player1ScoreTotal > 50 ? true : false;
    const player2Won = player2ScoreTotal > 50 ? true : false;
    if (player1Won) {
      btnRollDice.textContent = `P1 WON by ${
        player1ScoreTotal - player2ScoreTotal
      } points`;
      wonAlready = 1;
    } else if (player2Won) {
      btnRollDice.textContent = `P2 WON by ${
        player2ScoreTotal - player1ScoreTotal
      } points`;
      wonAlready = 1;
    }
  }
});

btnNewGame.addEventListener("click", function () {
  wonAlready = 0;
  btnRollDice.textContent = originalRollText;
  setActivePlayer1();
  player1TotalScore = 0;
  player2TotalScore = 0;
  player1Score.textContent = player1TotalScore;
  player2Score.textContent = player2TotalScore;

  player1CurrentScore = 0;
  player2CurrentScore = 0;
});
