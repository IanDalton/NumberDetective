export function Game(){
    return `<div class="container mt-4">
            <form id="game-form" class="mb-3">
                <div class="mb-3">
                    <label for="numbers" class="form-label">Amount of
                        Numbers</label>
                    <input type="number" class="form-control" id="numbers"
                        name="numbers" min="1" value="3" required>
                </div>
                <div class="mb-3">
                    <label for="hints" class="form-label">Amount of
                        Hints</label>
                    <input type="number" class="form-control" id="hints"
                        name="hints" min="1" value="3" required>
                </div>
                <button type="submit" class="btn btn-primary">Generate
                    Game</button>
            </form>
            <div id="game">
            </div>
            <div id="answer">

            </div>

        </div>`
}