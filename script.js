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
restartBtn.addEventListener("click", startGame);
function startGame() {
  playerTurn = false;
  cell.forEach((cell) => {
    cell.classList.remove(xPlayer);
    cell.classList.remove(oPlayer);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  messageText.classList.remove("show");
}
function handleClick(e) {
  const cell = e.target;
  const current = playerTurn ? xPlayer : oPlayer;
  placeMarker(cell, current);
  if (checkWinner(current)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    switchplayerTurn();
  }
}

function endGame(draw) {
  if (draw) {
    winningMessage.innerText = "Draw!";
  } else {
    winningMessage.innerText = `${playerTurn ? "X's" : "O's"} Wins!`;
  }
  messageText.classList.add("show");
}

function isDraw() {
  return [...cell].every((cell) => {
    return cell.classList.contains(xPlayer) || cell.classList.contains(oPlayer);
  });
}
function placeMarker(cell, current) {
  cell.classList.add(current);
}

function switchplayerTurn() {
  playerTurn = !playerTurn;
}

function checkWinner(current) {
  return winningCombination.some((combination) => {
    return combination.every((index) => {
      return cell[index].classList.contains(current);
    });
  });
}
