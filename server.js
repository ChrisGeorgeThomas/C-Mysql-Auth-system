
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

const choices = ["rock", "paper", "scissors"];

function getWinner(player, computer) {
    if (player === computer) return "It's a tie!";
    if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    ) {
        return "You win!";
    }
    return "Computer wins!";
}

app.post("/play", (req, res) => {
    const playerMove = req.body.move;
    const computerMove = choices[Math.floor(Math.random() * choices.length)];
    const result = getWinner(playerMove, computerMove);

    res.json({ player: playerMove, computer: computerMove, result: result });
});

app.post("/play-multi", (req, res) => {
    const { player1, player2 } = req.body;
    
    let result;
    if (player1 === player2) {
        result = "It's a tie!";
    } 
    else if (
        (player1 === "rock" && player2 === "scissors") ||
        (player1 === "paper" && player2 === "rock") ||
        (player1 === "scissors" && player2 === "paper")
    ) {
        result = "Player 1 wins!";
    } 
    else {
        result = "Player 2 wins!";
    }

    res.json({ player1, player2, result });
});

app.listen(PORT, () => {
    const ip = require("ip").address();
    console.log(`Server running at http://${ip}:${PORT}`);
});
