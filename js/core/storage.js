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

export function saveScores(scores) {
    localStorage.setItem("numberDetectiveScores", JSON.stringify(scores));
}

export function deleteScore(score){
    let scores = retrieveScores()
    scores = scores.filter(o => o.date != score.date)
    localStorage.setItem("numberDetectiveScores", JSON.stringify(scores));
}

export function deleteLeaderboard(scores){
    scores.map(score => deleteScore(score))
}

export function clearScores(){
    localStorage.setItem("numberDetectiveScores", []);
}

export function retrieveScores(){
    const scores = JSON.parse(localStorage.getItem("numberDetectiveScores") || "[]");
    return scores
}

export function updateScore(updatedScore) {

  const allScores = retrieveScores();
  const idx = allScores.findIndex(s => s.date === updatedScore.date);
  if (idx === -1) return;

  allScores[idx] = updatedScore;

  saveScores(allScores);
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