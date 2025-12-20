// Varibales
const cell = document.querySelectorAll("[data-cell]");
const messageText = document.querySelector("#message-text");
const winningMessage = document.querySelector("[data-winning-message]");
const restartBtn = document.querySelector("#restart-game");
const xPlayer = "x";
const oPlayer = "o";
let playerTurn;
// Winning combinations to Tic-Tac-Toe
const winningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

startGame();

// When pressed the game starts
restartBtn.addEventListener("click", startGame);

// Starting the game
function startGame() {
  playerTurn = false;

  // Loops through cell's
  cell.forEach((cell) => {
    cell.classList.remove(xPlayer);
    cell.classList.remove(oPlayer);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  messageText.classList.remove("show");
}

// Handles the platers pick
function handleClick(e) {
  const cell = e.target;
  const current = playerTurn ? xPlayer : oPlayer;

  // Places the marker to the cell
  placeMarker(cell, current);

  // Checks for a winner
  if (checkWinner(current)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    switchplayerTurn();
  }
}

// When the game ends the following shows to the
// Winning message depending on the outcome
function endGame(draw) {
  if (draw) {
    winningMessage.innerText = "It's a Draw!";
  } else {
    winningMessage.innerText = `${playerTurn ? "X's" : "O's"} Wins!`;
  }
  messageText.classList.add("show");
}

// Check for a draw
function isDraw() {
  // Copies the cell and checks for a draw
  return [...cell].every((cell) => {
    return cell.classList.contains(xPlayer) || cell.classList.contains(oPlayer);
  });
}

// Place's the X or O
function placeMarker(cell, current) {
  cell.classList.add(current);
}

// Switches players turns
function switchplayerTurn() {
  playerTurn = !playerTurn;
}

// Checks for a winner
function checkWinner(current) {
  // Grabs all the winning combination and loops through them
  // Until one is true
  return winningCombination.some((combination) => {
    // Checks if every elements from the combinaton
    // satisfies the condition
    return combination.every((index) => {
      // checks whether every element corresponds to a cell
      // with the class name current
      return cell[index].classList.contains(current);
    });
  });
}
