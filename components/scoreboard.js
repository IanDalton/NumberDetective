import { retrieveSortedScores } from "../core/storage.js";
function ScoreTable(scores, ndigits) {
    return `
    <div class="card shadow rounded-4 mb-4">
        <div class="card-header bg-success text-white rounded-top-4">
            <h3 class="mb-0 fs-5">Scores - ${ndigits} digits</h3>
        </div>
        <div class="card-body p-4">
            ${scores && scores.length > 0 ? `
                <div class="table-responsive">
                    <table class="table align-middle table-hover">
                        <thead class="table-success">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Player</th>
                                <th scope="col">Time (s)</th>
                                <th scope="col">Hints</th>
                                <th scope="col">Attempts</th>
                                <th scope="col">Answer</th>
                                <th scope="col">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${scores.map((s, i) => `
                                <tr>
                                    <td>${i + 1}</td>
                                    <td>${s.player}</td>
                                    <td>${s.time}</td>
                                    <td>${s.hints}</td>
                                    <td>${s.attempts}</td>
                                    <td>${s.answer}</td>
                                    <td>${new Date(s.date).toLocaleString()}</td>
                                </tr>
                            `).join("")}
                        </tbody>
                    </table>
                </div>
            ` : `
                <div class="alert alert-info mb-0">No scores for ${ndigits} digits yet.</div>
            `}
        </div>
    </div>`;
}


export function Scoreboard() {
    const grouped = retrieveSortedScores();
    const digitSections = Object.keys(grouped);
    
    return `
        <div class="container mt-4">
            <h2>Scoreboard</h2>
            ${digitSections.map(ndigits => ScoreTable(grouped[ndigits],ndigits)).join("")}
        </div>
    `;
}