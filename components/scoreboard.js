import { retrieveSortedScores } from "../core/storage.js";

function ScoreTable(scores, ndigits){
 return `<section id="scoreboard-${ndigits}">
                    <h3>${ndigits} digits</h3>
                    ${scores && scores.length > 0 ? `
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Player</th>
                                    <th>Time (s)</th>
                                    <th>Hints</th>
                                    <th>Attempts</th>
                                    <th>Answer</th>
                                    <th>Date</th>
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
                    ` : `<div class="alert alert-info">No scores for ${ndigits} digits yet.</div>`}
                </section>`
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