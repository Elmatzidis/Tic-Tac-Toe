const cell = document.querySelectorAll("[data-cell]");
const messageText = document.querySelector("#message-text");
const winningMessage = document.querySelector("[data-winning-message]");
const restartBtn = document.querySelector("#restart-game");
const xPlayer = "x";
const oPlayer = "o";
let playerTurn;
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

function startGame() {
  playerTurn = false;
  cell.forEach((cell) => {
    cell.addEventListener("click", handleClick, { once: true });
  });
}
function handleClick(e) {
  const cell = e.target;
  const current = playerTurn ? xPlayer : oPlayer;
  placeMarker(cell, current);
  switchplayerTurn();
}

function placeMarker(cell, current) {
  cell.classList.add(current);
}

function switchplayerTurn() {
  playerTurn = !playerTurn;
}
