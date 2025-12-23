// Varibales
const cell = document.querySelectorAll("[data-cell]");
const messageText = document.querySelector("#message-text");
const winningMessage = document.querySelector("[data-winning-message]");
const restartBtn = document.querySelector("#restart-game");
const submitedNames = document.querySelector(".submit-names");
const nameInput = document.querySelectorAll(".player-name");
const markerX = "x";
const markerO = "o";
let playerName1 = " ";
let playerName2 = " ";
let playerTurn;
canPlay = true;

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

function getUserName() {
  console.log("pressed");
  const PLayer1 = document.querySelector("#Player1").value;
  const Player2 = document.querySelector("#Player2").value;

  if (PLayer1 === "" || Player2 === "") {
    window.alert("Both names must be entred to submit");
    canPlay = false;
    return;
  } else {
    playerName1 = PLayer1;
    playerName2 = Player2;
    canPlay = true;
    return;
  }
}

// When pressed the game restarts
restartBtn.addEventListener("click", startGame);

// Handles the players pick
function handleClick(e) {
  if (canPlay == false) {
    window.alert("You have to enter both names to submit");
    return;
  }
  console.log(canPlay);
  if (canPlay == true) {
    const cell = e.target;
    const current = playerTurn ? markerX : markerO;
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
    return;
  }
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

// When the game ends the following shows to the
// Winning message depending on the outcome
function endGame(draw) {
  if (draw) {
    winningMessage.innerText = "It's a Draw!";
  } else {
    winningMessage.innerText = `${
      playerTurn ? playerName1 : playerName2
    } Wins!`;
  }
  messageText.classList.add("show");
}

// Starting the game
function startGame() {
  playerTurn = false;

  // Loops through cell's
  cell.forEach((cell) => {
    cell.classList.remove(markerX);
    cell.classList.remove(markerO);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  messageText.classList.remove("show");
}

// Check for a draw
function isDraw() {
  // Copies the cell and checks for a draw
  return [...cell].every((cell) => {
    return cell.classList.contains(markerX) || cell.classList.contains(markerO);
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

submitedNames.addEventListener("click", () => {
  getUserName();
  startGame();
});
