// /*
// GAME RULES:

// - The game has 2 players, playing in rounds
// - In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
// - BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
// - The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
// - The first player to reach 100 points on GLOBAL score wins the game

document.addEventListener('contextmenu', event => event.preventDefault());
var scores, roundScore, activePlayer, gamePlaying;
initialize();
document.querySelector('.btn-roll').addEventListener('click', () => {
  //()=> is an ES6 feature and called as an anonymous function.
  //1.random number generation
  //Since math.random generates random numbers between 0&1 so we multiply if by 6.
  if (gamePlaying) {
    var dice = Math.floor(Math.random() * 6) + 1;

    //2.display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    //3.update the round score if rolled number is not 1

    if (dice > 1) {
      //add scores to current
      roundScore += dice;
      document.querySelector(
        '#current-' + activePlayer
      ).textContent = roundScore;
    } else {
      //next player
      nextPlayer();
    }
  }
});
//event listener for hold
document.querySelector('.btn-hold').addEventListener('click', () => {
  if (gamePlaying) {
    //add current score to the player score
    scores[activePlayer] += roundScore;
    //update the UI
    document.getElementById('score-' + activePlayer).textContent =
      scores[activePlayer];
    //check if player won the game
    if (scores[activePlayer] >= 20) {
      document.getElementById('name-' + activePlayer).textContent = 'winner';
      document.querySelector('.dice').style.display = 'none';
      document
        .querySelector('.player-' + activePlayer + '-panel')
        .classList.add('winner');
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  //making current as zero
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;

  //toggle the active class
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  //making dice invisible when its value=1
  document.querySelector('.dice').style.display = 'none';
}
document.querySelector('.btn-new').addEventListener('click', () => {
  initialize();
});
function initialize() {
  scores = [0, 0];
  roundScore = 0; //Score in current round
  activePlayer = 0;
  gamePlaying = true;
  //first player 0 rolls the dice
  // document.querySelector('#current-'+activePlayer).textContent=dice
  // # is used to select by id,. is used to select by class
  document.querySelector('.dice').style.display = 'none';
  //query selector will select the tags using class name or by id
  //to make every players score and current as zero
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'player1';
  document.getElementById('name-1').textContent = 'player2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}
