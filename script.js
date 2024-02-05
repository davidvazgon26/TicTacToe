// Importa SweetAlert2 desde el CDN
import "https://cdn.jsdelivr.net/npm/sweetalert2@11";

document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("board");
  const restartBtn = document.getElementById("restartBtn");
  let currentPlayer = "X";
  let gameActive = true;

  // Initialize the game board
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-index", i);
    board.appendChild(cell);
  }

  // Add click event listener to each cell
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
  });

  // Add click event listener to the restart button
  restartBtn.addEventListener("click", restartGame);

  // Function to handle cell click
  function handleCellClick() {
    if (gameActive && this.textContent === "") {
      this.textContent = currentPlayer;
      if (checkWinner()) {
        displayWinner();
        gameActive = false;
      } else {
        togglePlayer();
        updateTurnIndicator();
      }
    }
  }

  // Function to toggle players (X and O)
  function togglePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    console.log(currentPlayer);
  }

  // Function to update turn indicator
  function updateTurnIndicator() {
    const turnIndicator = document.getElementById("turnIndicator");
    turnIndicator.textContent = `Turno del jugador: ${currentPlayer}`;
  }

  // Function to check if there is a winner
  function checkWinner() {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (
        cells[a].textContent &&
        cells[a].textContent === cells[b].textContent &&
        cells[a].textContent === cells[c].textContent
      ) {
        return true; // We have a winner
      }
    }

    return false; // No winner yet
  }

  // Function to display the winner
  function displayWinner() {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (
        cells[a].textContent &&
        cells[a].textContent === cells[b].textContent &&
        cells[a].textContent === cells[c].textContent
      ) {
        document.body.style.background =
          "radial-gradient(circle at center, #00ff00, #1a1a1a)";
        // Draw a red line on the winning combination
        cells[a].style.color = "green";
        cells[b].style.color = "green";
        cells[c].style.color = "green";

        // Show victory message with SweetAlert2
        Swal.fire({
          title: `¡Jugador ${currentPlayer} gana!`,
          //   text: '<div style="font-size: 24px;">🎉🎉⭐⭐👍👑👑🎆🎆🔥🔥</div>',
          html: '<div style="font-size: 28px;">🎉🔥🎆⭐👑👍👑⭐🎆🔥🎉</div>',
          icon: "success",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "custom-confirm-button",
          },
        });

        gameActive = false;
        return;
      }
    }
  }

  // Function to restart the game
  function restartGame() {
    cells.forEach((cell) => {
      cell.textContent = "";
      cell.style.color = ""; // Resetear el color de la celda
    });
    document.body.style.background =
      "radial-gradient(circle at center, #ffd700, #1a1a1a)";
    currentPlayer = "X";
    gameActive = true;
  }
});
