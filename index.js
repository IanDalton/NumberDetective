import { generateGame } from "./game.js";
import { Card } from "./components/card.js";

const form = document.getElementById("game-form");

if (form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault(); 

        const numbersInput = document.getElementById("numbers");
        const hintsInput = document.getElementById("hints");
        const gameDiv = document.getElementById("game");

        const numbers = parseInt(numbersInput.value, 10);
        const hints = parseInt(hintsInput.value, 10);

        if (gameDiv) {
            let game = generateGame(numbers, hints);
            console.log(game);
            gameDiv.innerHTML = ""; 
            for (const ruleObj of game.rules) {
                gameDiv.innerHTML += Card(
                    ruleObj.correct,
                    ruleObj.hintNumber,
                    ruleObj.misplaced,
                    ruleObj.rule
                );
            }
        }
    });
}