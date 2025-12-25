// ----------------------------
// VARIABLES & DOM ELEMENTS
// ----------------------------
const cell = document.querySelectorAll("[data-cell]"); // Tic-Tac-Toe cells
const messageText = document.querySelector("#message-text"); // Message container
const winningMessage = document.querySelector("[data-winning-message]"); // Winner message
const restartBtn = document.querySelector("#restart-game"); // Restart button
const submitedNames = document.querySelector(".submit-names"); // Submit player names

const markerX = "x"; // Player marker
const markerO = "o"; // AI marker

let playerName1 = ""; // Player 1 name
let playerName2 = "AI"; // AI name
let playerTurn = true; // Track whose turn it is
let canPlay = true; // Flag to control if moves are allowed
let board = []; // Internal board state for game logic

// Winning combinations for Tic-Tac-Toe
const winningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columns
  [0, 4, 8],
  [2, 4, 6], // Diagonals
];

// ----------------------------
// CORE FUNCTIONS
// ----------------------------

// Get player's name from input field
function getUserName() {
  const Player1 = document.querySelector("#Player1").value;
  if (!Player1) {
    alert("You must submit a name first");
    canPlay = false;
    return;
  }
  playerName1 = Player1;
  canPlay = true;
}

// Start or restart the game
function startGame() {
  board = Array(9).fill(null); // Reset internal board
  playerTurn = true; // X always starts
  canPlay = true;

  // Reset UI cells and attach click event
  cell.forEach((c) => {
    c.classList.remove(markerX, markerO);
    c.removeEventListener("click", handleClick);
    c.addEventListener("click", handleClick, { once: true });
  });

  messageText.classList.remove("show"); // Hide previous messages
}

// Handle a player's move
function handleClick(e) {
  if (!canPlay) return;

  const currentMarker = playerTurn ? markerX : markerO;
  const clickedCell = e.target;
  const index = [...cell].indexOf(clickedCell);

  // Ignore clicks on occupied cells
  if (board[index] !== null) return;

  placeMarker(clickedCell, currentMarker, index);

  // Check if current move ends the game
  if (checkWinner(currentMarker)) endGame(false);
  else if (isDraw()) endGame(true);
  else switchPlayerTurn();
}

// Place a marker on the board & update internal state
function placeMarker(cellElement, marker, index) {
  cellElement.classList.add(marker);
  board[index] = marker;
}

// Check if a player has won
function checkWinner(currentMarker) {
  // Grabs all the winning combination and loops through them
  // until one is true.Checks if every elements from the combinaton satisfies the condition
  return winningCombination.some((combo) =>
    // Checks whether every element corresponds to a cell with the class name current
    combo.every((i) => board[i] === currentMarker)
  );
}

// Checks for a draw
function isDraw() {
  return board.every((c) => c !== null);
}

// Display end game message according to outcome
function endGame(draw) {
  if (draw) winningMessage.innerText = "It's a Draw!";
  else
    winningMessage.innerText = `${
      playerTurn ? playerName1 : playerName2
    } Wins!`;

  messageText.classList.add("show");
  canPlay = false;
}

// Switch turns between player and AI
function switchPlayerTurn() {
  playerTurn = !playerTurn;

  // Let AI move if it's AI's turn
  if (!playerTurn && canPlay) setTimeout(aiMove, 200);
}

// ----------------------------
// AI FUNCTIONS (Minimax)
// ----------------------------

// AI makes its move
function aiMove() {
  const index = bestMove(); // Determine best move
  placeMarker(cell[index], markerO, index);

  if (checkWinner(markerO)) endGame(false);
  else if (isDraw()) endGame(true);
  else switchPlayerTurn();
}

/// Determine the AI's optimal move using Minimax
function bestMove() {
  let bestScore = -Infinity; // Start with the lowest possible score for maximizer
  let move;

  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      // Only consider empty cells
      board[i] = markerO; // Simulate AI move
      // Recursively evaluate this move using Minimax for the opponent's turn
      let score = minimax(board, 0, false);
      board[i] = null; // Undo move (backtracking)
      if (score > bestScore) {
        // Choose the move with the highest score
        bestScore = score;
        move = i;
      }
    }
  }

  return move; // Return the index of the best move for AI
}

// Minimax algorithm to evaluate moves
function minimax(boardState, depth, isMaximizing) {
  // Base cases: check if game ended
  if (checkWinner(markerO)) return 10 - depth; // AI wins -> positive score
  if (checkWinner(markerX)) return depth - 10; // Player wins -> negative score
  if (isDraw()) return 0; // Draw -> neutral score

  if (isMaximizing) {
    // Maximizer: AI tries to get the highest score
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (boardState[i] === null) {
        boardState[i] = markerO; // Simulate AI move
        let score = minimax(boardState, depth + 1, false); // Evaluate opponent's best response
        boardState[i] = null; // Undo move (backtracking)
        bestScore = Math.max(score, bestScore); // Keep the best score for AI
      }
    }
    return bestScore;
  } else {
    // Minimizer: Player tries to minimize AI's score
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (boardState[i] === null) {
        boardState[i] = markerX; // Simulate player move
        let score = minimax(boardState, depth + 1, true); // Evaluate AI's best response
        boardState[i] = null; // Undo move (backtracking)
        bestScore = Math.min(score, bestScore); // Keep the lowest score for AI
      }
    }
    return bestScore;
  }
}
// ----------------------------
// EVENT LISTENERS
// ----------------------------
restartBtn.addEventListener("click", startGame); // Restart game
submitedNames.addEventListener("click", () => {
  // Submit names & start game
  getUserName();
  startGame();
});
