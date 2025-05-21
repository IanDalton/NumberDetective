export function AnswerForm(n = 3) {
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

    inputs.forEach((input, idx) => {
        input.addEventListener("input", (e) => {
            if (e.target.value.length === 1 && idx < inputs.length - 1) {
                inputs[idx + 1].focus();
            }
        });
        input.addEventListener("keydown", (e) => {
            if (e.key === "Backspace" && !e.target.value && idx > 0) {
                inputs[idx - 1].focus();
            }
        });
    });

    return form;
}