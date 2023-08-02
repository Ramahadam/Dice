/*

1.make the current total score to 0 from dom

 *Build a function 'roleDiceGenerator()'

 A. When user click on the function Do the next steps:
 *Simplifying the process to small picese
  1.Create a random number between 1 to 6//TODO
  2. Fitch the image which hold the same random number TODO
  3.increase the current score by the random number.TODO
  4. If the dice === 1 ,then reset the current score to 0 
  5.Switch the player :
    I.create a variable called active player
    II.Start the activePlaer
    III.Repeat the process 45

   6.Creat function listen to hold
    I. create an array taks two scors [0,0]
    2. add the current scores to the array as accumulative
    3. when hold button click
      I.check if(dice ===1 ) show toll score and switch user
      II. Else show the  score and then switch user show the score from the array
    */

'use strict';

//veriable declartions
let diceImage = document.querySelector('.dice');
let btnNew = document.querySelector('.btn--new');
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');
let activePlayer, currentScore, tolScores;

let diceSecretNumber;

//Inital view (currents value == 0 ), (hidding dice image)
//Reset game function
function initGame() {
  activePlayer = 0;
  currentScore = 0;
  tolScores = [0, 0];
  diceImage.style.display = 'none';

  document.getElementById('player-score--0').textContent = 0;
  document.getElementById('player-score--1').textContent = 0;
  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;

  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
}
initGame();

//Function for generating random number
const roleDiceGenerator = function () {
  //Creating random secret number
  diceSecretNumber = Math.trunc(Math.random() * 6) + 1;

  //changin the image according to secret number
  diceImage.src = `dice-${diceSecretNumber}.png`;
  diceImage.style.display = 'block';

  //Increasing the current score
  if (diceSecretNumber === 1) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    //Show the toll score of current player
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    // document.getElementById(`current--${activePlayer}`);
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--active');
  }

  //Show the toll score of current player
  document.getElementById(`current--${activePlayer}`).textContent =
    diceSecretNumber +
    Number(document.getElementById(`current--${activePlayer}`).textContent);
};

//Hold function
function holdDice() {
  // 6.Creat function listen to hold TODO
  // I. create an array taks two scors [0,0] TODO
  // 2. add the current scores to the array as accumulative
  tolScores[activePlayer] += Number(
    document.getElementById(`current--${activePlayer}`).textContent
  );
  console.log(tolScores);

  // 3. when hold button click
  //   I.check if(dice ===1 ) show toll score and switch user
  if (diceSecretNumber === 1) {
    //Show the toll score for the current player
    document.getElementById(`player-score--${activePlayer}`).textContent =
      tolScores[activePlayer];
    activePlayer = activePlayer === 0 ? 1 : 0;
  }

  if (tolScores[activePlayer] >= 20) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    btnRoll.disabled = true;
    btnHold.disabled = true;
    btnHold.style.cursor = 'no-drop';
    btnRoll.style.cursor = 'no-drop';
  }
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  document.getElementById(`player-score--${activePlayer}`).textContent =
    tolScores[activePlayer];
  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  //   II. Else show the  score and then switch user show the score from the array
}

//Calling function generator on click event
btnRoll.addEventListener('click', roleDiceGenerator);

//Caling hol function

btnHold.addEventListener('click', holdDice);

//Calling reset function
btnNew.addEventListener('click', function () {
  initGame();
});
