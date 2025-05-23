import { Navbar,setCurrentPage } from "../components/navbar.js";
import { Game } from "../components/game.js";
import { generateGame } from "../core/game.js";
import { AnswerForm } from "../components/answer_form.js";
import { Card } from "../components/card.js";
setCurrentPage("Play")

document.querySelector("navbar").innerHTML = Navbar()
document.querySelector("game").innerHTML = Game()


const form = document.getElementById("game-form");



if (form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const numbersInput = document.getElementById("numbers");
        const hintsInput = document.getElementById("hints");
        const gameDiv = document.getElementById("game");
        const answerDiv = document.getElementById("answer");

        const numbers = parseInt(numbersInput.value, 10);
        const hints = parseInt(hintsInput.value, 10);


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
        answerDiv.innerHTML = ""
        answerDiv.appendChild( AnswerForm(game.answer, game.rules.length))

    });
}