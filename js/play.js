import { Navbar, setCurrentPage } from "./components/navbar.js";
import { Game } from "./components/game.js";
import { generateGame } from "./core/game.js";
import { AnswerForm } from "./components/answer_form.js";
import { Card } from "./components/card.js";
import { ScoreSubmissionForm } from "./components/victory_screen.js";
import { saveScore } from "./core/storage.js";
setCurrentPage("Play")

document.querySelector("navbar").innerHTML = Navbar()
document.querySelector("game").innerHTML = Game()


const form = document.getElementById("game-form");

let timerInterval;
let secondsElapsed = 0;
const timer = document.getElementById("time");

function stopTimer() {
    clearInterval(timerInterval);
}
function startTimer() {
    clearInterval(timerInterval);
    secondsElapsed = 0;

    if (timer) {
        timer.textContent = "00:00";
        timerInterval = setInterval(() => {
            secondsElapsed++;
            const minutes = String(Math.floor(secondsElapsed / 60)).padStart(2, "0");
            const seconds = String(secondsElapsed % 60).padStart(2, "0");
            timer.textContent = `${minutes}:${seconds}`;
        }, 1000);
    }
}


if (form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        console.log("aaa2")
        const numbersInput = document.getElementById("numbers");
        const hintsInput = document.getElementById("hints");
        const gameDiv = document.getElementById("game");
        const answerDiv = document.getElementById("answer");

        const numbers = parseInt(numbersInput.value, 10);
        const hints = parseInt(hintsInput.value, 10);

        form.innerHTML = ""


        let game = generateGame(numbers, hints);

        console.log(game);
        gameDiv.className = "row justify-content-center"
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
        answerDiv.appendChild(AnswerForm(game.answer, game.rules.length, (score) => {
            stopTimer();
            gameDiv.innerHTML = ""
            gameDiv.appendChild(ScoreSubmissionForm(score, (score) => {
                saveScore(score)
                window.location.href = `scoreboard?ndigits=${score.answer.length}`
            }))
            const cardHeader = document.getElementById("card-header")
            cardHeader.textContent = "Victory!"
            answerDiv.innerHTML = ""
        }))
        startTimer()
        form.innerHTML = ""


    });
}