export function Game() {
    return `
    <div class="d-flex justify-content-center align-items-center min-vh-100">
        <div class="card shadow-lg rounded-4">
            <div class="card-header bg-success text-white fs-5 fw-bold w-100 rounded-top-4 d-flex justify-content-between align-items-center" style="font-size:1.5rem;">
                <div id="card-header">New game</div>
                <div id="time"></div>
            </div>
            <div class="card-body py-4 px-5">
                <form id="game-form" class="mb-3">
                    <div class="mb-3">
                        <label for="numbers" class="form-label text-start">Amount of Numbers</label>
                        <input type="number" class="form-control" id="numbers"
                            name="numbers" min="1" value="3" required>
                    </div>
                    <div class="mb-3">
                        <label for="hints" class="form-label">Amount of Hints</label>
                        <input type="number" class="form-control" id="hints"
                            name="hints" min="1" value="3" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Generate Game</button>
                </form>
                <div id="game"></div>
                <div id="answer"></div>
            </div>
        </div>
    </div>
    `;
}