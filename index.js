import { generateGame } from "./game";
const button = document.querySelector("button");

if (button) {
    button.addEventListener("click", () => {
        const gameDiv = document.getElementById("game");
        if (gameDiv) {
            gameDiv.textContent = generateGame(3,3);
        }
    });
}
