import { saveScore } from "../core/storage.js";
export function AnswerForm(answer, numHints, onVictory) {
    const n = answer.length;
    const form = document.createElement("form");
    form.id = "answer-form";
    form.className = "mb-3";

    const label = document.createElement("label");
    label.htmlFor = "answer1";
    label.className = "form-label";
    label.textContent = "Enter your answer:";
    form.appendChild(label);

    const inputGroup = document.createElement("div");
    inputGroup.className = "input-group justify-content-center";

    const inputs = [];
    for (let i = 1; i <= n; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.maxLength = 1;
        input.className = "form-control text-center";
        input.id = `answer${i}`;
        input.name = `answer${i}`;
        input.required = true;
        input.style.maxWidth = "60px";
        inputGroup.appendChild(input);
        inputs.push(input);
    }
    form.appendChild(inputGroup);

    const button = document.createElement("button");
    button.type = "submit";
    button.className = "btn btn-success mt-2";
    button.textContent = "Submit Answer";
    form.appendChild(button);

    // Cambio de input al siguiente
    inputs.forEach((input, i) => {
        input.addEventListener("input", (e) => {
            if (e.target.value.length === 1 && i < inputs.length - 1) {
                inputs[i + 1].focus();
            }
        });
        input.addEventListener("keydown", (e) => {
            if (e.key === "Backspace" && !e.target.value && i > 0) {
                inputs[i - 1].focus();
            }
        });
    });

    var attempts = 0
    const startTime = Date.now();

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const userAnswer = inputs.map(input => input.value).join('');
        if (userAnswer === answer) {
            const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);
            
            const score = {
                time: Number(timeTaken),
                hints: numHints,
                attempts: attempts,
                answer: answer,
                date: new Date().toISOString(),
                player: undefined
            };
            
            if (typeof onVictory === "function") onVictory(score);
        } else {
            const oldAlert = form.querySelector(".alert-danger");
            if (oldAlert) oldAlert.remove();
            const alert = document.createElement("div");
            alert.className = "alert alert-danger";
            alert.role = "alert";
            alert.textContent = "Wrong answer, try again!";
            form.insertBefore(alert, button);
            attempts++
            setTimeout(() => {
                alert.remove();
            }, 5000);
        }
    });

    return form;
}