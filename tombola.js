import { playerSquares, botSquares, changeBotCardboard, changePlayerCardboard } from "./getRandomCardboard.js";

const uniqueNumbers = [];
let switchMachine = true;

function getUniqueRandomTombola(maxNr) {
    //Generate random number
    let random = (Math.random() * maxNr).toFixed();

    //Coerce to number by boxing
    random = Number(random);

    if(!uniqueNumbers.includes(random) && random !== 0 && random !== undefined) {
        uniqueNumbers.push(random);
        return random;
    } else {
        if(uniqueNumbers.length < maxNr) {
          //Recursively generate number
          return getUniqueRandomTombola(maxNr);
        } else {
          switchMachine = false;
        }
    }
}

do {
  getUniqueRandomTombola(90)// Change the 90 to the numbers you want to play
} while (switchMachine == true);

const results = document.getElementById('results')
const tombolaBtn = document.getElementById('tombola-start-button');
const tombolaBox = document.getElementById('random-number-tombola-box');

let numbersList = [];
let counter = 0;

function printTombolaNumbers(miliseconds) {
  tombolaBtn.remove()
  changeBotCardboard.remove()
  changePlayerCardboard.remove()

  let interval = setInterval(() => {
    // Show the uniqueNumber position array element
    tombolaBox.innerHTML = uniqueNumbers[counter];
    counter++;
    numbersList.push(tombolaBox.innerHTML)

    const tableOfResults = numbersList.map(function(x) {
      return `<td class="results-table-num">${x}</td>`
    }).join('')// This join('') is to delete commas of the array
    results.innerHTML = tableOfResults

    /* Painting the cardboard numbers */

    //Player 1
    playerSquares.forEach(square => {
      if(numbersList.includes(square.innerHTML)){
        square.style.backgroundColor = "lime"
      }
    })

    //Bot
    botSquares.forEach(square => {
      if(numbersList.includes(square.innerHTML)){
        square.style.backgroundColor = "lime"
      }
    })

    if(counter >= uniqueNumbers.length){
      clearInterval(interval)
      tombolaBox.innerHTML = ""
    }

    function bingoWinner(squares){
      let myArr = [];
      for (let i = 0; squares.length > i; i++){
        myArr.push(squares[i].style.backgroundColor)

        if (myArr.length === 24) {
          const isLime = (currentValue) => currentValue === "lime"

          if (myArr.every(isLime) === true){
            setTimeout(() => {
              if (squares === playerSquares && squares === botSquares){
                alert("TIE!")
              }
              else if (squares === botSquares) {
                document.getElementById('dot').remove()
                document.getElementById('winner').innerHTML =
                `Ganador: Bot 🏆 <br>
                <button id="restart-game" onClick="window.location.reload()"> Reiniciar juego </button>`
              } else if (squares === playerSquares) {
                document.getElementById('dot').remove()
                document.getElementById('winner').innerHTML =
                `Ganador: Player 1 🏆 <br>
                <button id="restart-game" onClick="window.location.reload()"> Reiniciar juego </button>`
              }
            }, miliseconds + 10); // This time must be MORE than that of the global fn
            /* Stopping the tombola */
            clearInterval(interval)
            tombolaBox.innerHTML = ""
          }
        }
      }
    }

    bingoWinner(playerSquares)
    bingoWinner(botSquares)
  }, miliseconds)// Time of the global fn
}

tombolaBtn.onclick = () => printTombolaNumbers(1000); // SET HERE THE MILISECONDS TO DROP EACH NUMBER
