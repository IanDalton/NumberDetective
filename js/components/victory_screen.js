export function ScoreSubmissionForm(score, onSubmit) {
    const container = document.createElement("div");

    container.innerHTML = `
        <p><strong>Time taken:</strong> ${score.time} seconds</p>
        <p><strong>Hints used:</strong> ${score.hints}</p>
        <p><strong>Attempts:</strong> ${score.attempts}</p>
        <p><strong>Answer:</strong> ${score.answer}</p>
        <form id="score-submit-form" class="mt-4">
            <div class="mb-3">
                <label for="player-name" class="form-label fw-bold">Enter your name:</label>
                <input type="text" class="form-control" id="player-name" required placeholder="Your name">
            </div>
            <button type="submit" class="btn btn-success">Save Score</button>
        </form>
    `;

    const form = container.querySelector("#score-submit-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const playerName = form.querySelector("#player-name").value;
        score.player = playerName;
        if (typeof onSubmit === "function") {
            onSubmit(score);
        }
    });

    return container;
}