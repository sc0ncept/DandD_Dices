// Variables
const result = document.querySelector('#result');
const bestWorst = document.querySelector('#best-worst');

const dices = {
  d4: [1, 2, 3, 4],
  d6: [1, 2, 3, 4, 5, 6],
  d8: [1, 2, 3, 4, 5, 6, 7, 8],
  d10: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  d12: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  d20: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
}

let rolls = [];

// Methods

/**
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 * @param  {Array} array The array to shuffle
 * @return {String}      The first item in the shuffled array
 */
const shuffle = function (array) {

  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;

};

// shuffle dices on page load
const startingShuffle = () => {
  for (const key in dices) {
    if (dices.hasOwnProperty(key)) {
      shuffle(dices[key]);
    }
  }
  // console.log(dices);
}

// roll the dice
const roll = (dice) => {
  shuffle(dices[dice]);
  rolls.push(dices[dice][0]);
}

const clickHandler = (event) => {

  // only run on [data-roll] attribute
  let dice = event.target.getAttribute('data-roll');
  if (!dice) return;

  // clear the rolls array
  rolls = [];

  // roll the dice
  roll(dice);

  //if bestof/worst of, roll again
  if (bestWorst.checked) {
    roll(dice);
  }

  // render the result in UI
  result.textContent = rolls.join(' - ');

}

// shuffle dices' numbers on page load
startingShuffle();

// Event Listeners

// listen for clicks in the DOM
document.addEventListener('click', clickHandler);