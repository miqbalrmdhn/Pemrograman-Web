document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("board");
    const cells = board.querySelectorAll(".cell");
    const status = document.getElementById("status");
    const resetButton = document.getElementById("reset");
    const toggleDarkModeButton = document.getElementById("toggleDarkMode");

    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6] 
        ];

        for (const combo of winningCombinations) {
            const [a, b, c] = combo;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                gameActive = false;
                status.innerHTML = `Player ${gameBoard[a]} wins!`;
                cells[a].classList.add("win");
                cells[b].classList.add("win");
                cells[c].classList.add("win");
            }
        }

        if (gameBoard.every(cell => cell !== "")) {
            gameActive = false;
            status.innerHTML = "draw!";
        }
    }

    function handleCellClick(event) {
        const cell = event.target;
        const index = parseInt(cell.getAttribute("data-index"));

        if (gameBoard[index] === "" && gameActive) {
            gameBoard[index] = currentPlayer;
            cell.textContent = currentPlayer;
            cell.classList.add(currentPlayer);

            checkWinner();

            currentPlayer = currentPlayer === "X" ? "O" : "X";

            if (gameActive) {
                status.innerHTML = ` ${currentPlayer} turn`;
            }
        }
    }

    
    function resetGame() {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        currentPlayer = "X"; 
        status.innerHTML = ` ${currentPlayer} turn`;
    
        for (const cell of cells) {
            cell.textContent = "";
            cell.classList.remove("X", "O", "win");
        }
    }
    
    resetButton.addEventListener("click", resetGame);


    for (const cell of cells) {
        cell.addEventListener("click", handleCellClick);
    }

    toggleDarkModeButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        toggleDarkModeButton.classList.toggle("dark-mode-button");
    });     
});
