var uniqueNumbersCardboard = [];

export function getRandomCardboard(maxNr) {
  //Generate random number
  let random = (Math.random() * maxNr).toFixed();

  //Coerce to number by boxing
  random = Number(random);

  if(!uniqueNumbersCardboard.includes(random) && random !== 0 && random !== undefined) {
    uniqueNumbersCardboard.push(random);
    return random;
  }
  else if(uniqueNumbersCardboard.length < maxNr) {
    //Recursively generate number
    return getRandomCardboard(maxNr)
    }
}



// Player
export const playerSquares = document.querySelectorAll('.p1square');
export const changePlayerCardboard = document.getElementById('player1-button');

changePlayerCardboard.onclick = function refreshCardboard() {
  uniqueNumbersCardboard = []
  let i = -1
  do {
    getRandomCardboard(90)
    i++
  }while(i < playerSquares.length)

  uniqueNumbersCardboard.sort((a, b) => b - a )
  playerSquares.forEach(square => square.innerHTML = uniqueNumbersCardboard[i--])// one number left over
  uniqueNumbersCardboard = []
}

// Bot
export const botSquares = document.querySelectorAll('.botsquare');
export const changeBotCardboard = document.getElementById('bot-button');

changeBotCardboard.onclick = function refreshCardboard() {
  uniqueNumbersCardboard = []
  let i = -1
  do {
    getRandomCardboard(90)
    i++
  }while(i < botSquares.length)

  uniqueNumbersCardboard.sort((a, b) => b - a )// order from lowest to highest
  botSquares.forEach(square => square.innerHTML = uniqueNumbersCardboard[i--])// one number left over
  uniqueNumbersCardboard = []
}

// Showing the cardboard

/* ----------- Player 1 ----------- */

playerSquares.forEach(
  function(element) {
    element.innerHTML = getRandomCardboard(90);
  }
)

/* ----------- Bot ----------- */

botSquares.forEach(
  function(element) {
    element.innerHTML = getRandomCardboard(90);
})
