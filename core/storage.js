/**
 * @typedef {Object} Score
 * @property {number} time
 * @property {number} hints
 * @property {number} attempts
 * @property {string} answer
 * @property {string} date
 * @property {string} player
 */
export function saveScore(score) {
    let scores = JSON.parse(localStorage.getItem("numberDetectiveScores") || "[]");
    scores.push(score);
    localStorage.setItem("numberDetectiveScores", JSON.stringify(scores));
}
export function retrieveScores(){
    const scores = JSON.parse(localStorage.getItem("numberDetectiveScores") || "[]");
    return scores
}

export function retrieveSortedScores(){
    const scores = retrieveScores()
    const grouped = {};
    for (const score of scores) {
        const ndigits = score.answer.length;
        if (!grouped[ndigits]) grouped[ndigits] = [];
        grouped[ndigits].push(score);
    }
    // Sort each group by time ascending
    for (const ndigits in grouped) {
        grouped[ndigits].sort((a, b) => a.time - b.time);
    }
    return grouped;
}