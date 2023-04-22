"use strict";
const bntNew = document.querySelector(".btn--new");
const bntRoll = document.querySelector(".btn--roll");
const bntHold = document.querySelector(".btn--hold");
const dice = document.querySelector(".dice");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const scorePl0 = document.querySelector("#score--0");
const scorePl1 = document.querySelector("#score--1");

let currentScore, activePlayer, totalScore, playing;

const init = function () {
  currentScore = 0;
  activePlayer = 0;
  totalScore = [0, 0];
  playing = true;
  scorePl0.textContent = 0;
  scorePl1.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.add("player--active");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--active");
  player1El.classList.remove("player--winner");
  dice.classList.add("hidden");
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

bntRoll.addEventListener("click", function () {
  if (playing) {
    let diceRoll = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove("hidden");
    dice.src = `dice-${diceRoll}.png`;

    if (diceRoll !== 1) {
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

bntHold.addEventListener("click", function () {
  if (playing) {
    totalScore[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScore[activePlayer];
    if (totalScore[activePlayer] >= 100) {
      playing = false;

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");

      dice.classList.add("hidden");
    } else {
      switchPlayer();
    }
  }
});

bntNew.addEventListener("click", init);
