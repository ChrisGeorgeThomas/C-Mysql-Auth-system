
document.addEventListener("DOMContentLoaded", function () {
    const choices = document.querySelectorAll(".choice");
    const statusText = document.getElementById("status");
    const playerChoiceText = document.getElementById("playerChoice");
    const computerChoiceText = document.getElementById("computerChoice");
    const resultText = document.getElementById("result");

    const singlePlayerBtn = document.getElementById("singlePlayer");
    const multiPlayerBtn = document.getElementById("multiPlayer");

    let gameMode = "single"; // Default to Single Player
    let player1Move = null;

    singlePlayerBtn.addEventListener("click", () => {
        gameMode = "single";
        statusText.textContent = "Single Player Mode";
    });

    multiPlayerBtn.addEventListener("click", () => {
        gameMode = "multi";
        statusText.textContent = "Multiplayer Mode (Player 1 Turn)";
        player1Move = null; 
    });

    choices.forEach(choice => {
        choice.addEventListener("click", function () {
            const playerMove = this.id;
            
            if (gameMode === "single") {
                fetch("/play", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ move: playerMove })
                })
                .then(response => response.json())
                .then(data => {
                    playerChoiceText.textContent = `You selected: ${playerMove}`;
                    
                    // ✅ Only show computer choice in single-player mode
                    computerChoiceText.textContent = `Computer selected: ${data.computer}`;
                    
                    resultText.textContent = `Result: ${data.result}`;
                });
            } 
            else if (gameMode === "multi") {
                if (player1Move === null) {
                    player1Move = playerMove;
                    statusText.textContent = "Player 2 Turn";
                } 
                else {
                    fetch("/play-multi", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ player1: player1Move, player2: playerMove })
                    })
                    .then(response => response.json())
                    .then(data => {
                        playerChoiceText.textContent = `Player 1: ${player1Move} | Player 2: ${playerMove}`;
                        
                        // ✅ Remove computer choice in multiplayer mode
                        computerChoiceText.textContent = ""; 
                        
                        resultText.textContent = `Result: ${data.result}`;
                        statusText.textContent = "Multiplayer Mode (Player 1 Turn)";
                        player1Move = null;
                    });
                }
            }
        });
    });
});
