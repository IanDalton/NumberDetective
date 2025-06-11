import { retrieveSortedScores, deleteScore, deleteLeaderboard, clearScores, updateScore } from "../core/storage.js";

//TODO: Add warning popup


function startEditing(tr, score, refresh) {
  tr.querySelector(".player").innerHTML = `<input type="text" class="form-control form-control-sm" value="${score.player}">`;

  const actionsCell = tr.querySelector(".actions");
  actionsCell.innerHTML = `
    <button type="button" class="save-btn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-floppy-fill" viewBox="0 0 16 16">
  <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z"/>
  <path d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z"/>
</svg></button>
    <button type="button" class="cancel-btn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
</svg></button>
  `;

  // Save button handler - only update player name
  actionsCell.querySelector(".save-btn").addEventListener("click", () => {
    const updatedScore = {
      ...score,
      player: tr.querySelector(".player input").value.trim()
    };
    updateScore(updatedScore);
    refresh();
  });

  // Cancel button
  actionsCell.querySelector(".cancel-btn").addEventListener("click", () => {
    refresh();
  });
}




function ScoreRow(score, index, refresh) {
    const tr = document.createElement("tr")
    tr.innerHTML = `
    
      <td>${index + 1}</td>
      <td class ="player">${score.player}</td>
      <td>${score.time}</td>
      <td>${score.hints}</td>
      <td>${score.attempts}</td>
      <td>${score.answer}</td>
      <td>${new Date(score.date).toLocaleString()}</td>
      <td class="actions">
      <button type="button" class="edit-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
        </svg>
      </button>
        <button type="button" class = "delete-btn" >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
          </svg>
        </button>
      </td>
  `

    tr.querySelector(".edit-btn").addEventListener("click", () => {
        startEditing(tr, score, refresh);
    });

    tr.querySelector(".delete-btn").addEventListener("click", async () => {
        const confirmed = await ConfirmModal("Are you sure you want to delete this score?");
        if (confirmed) {
            deleteScore(score);
            refresh();
        }
    });


    return tr
}


function ScoreTable(scores, ndigits, refresh) {
    const div = document.createElement("div")

    div.className = "card shadow rounded-4 mb-4"
    div.innerHTML = `
        <div class="card-header bg-success text-white fs-5 fw-bold w-100 rounded-top-4 d-flex justify-content-between align-items-center">
            <h3 class="mb-0 fs-5">Scores - ${ndigits} digits</h3>
            <button type="button" class="btn btn-danger">Delete</button>
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
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                </div>
            ` : `
                <div class="alert alert-info mb-0">No scores for ${ndigits} digits yet.</div>
            `}
        </div>
    `
    const button = div.querySelector("button")
    button.addEventListener("click", async () => {
        const confirmed = await ConfirmModal("Are you sure you want to delete this table?");
        if (confirmed) {
            deleteLeaderboard(scores)
            refresh();
        }

    })
    const tbody = div.querySelector("tbody")
    scores.map((s, i) => {
        tbody.appendChild(ScoreRow(s, i, refresh))
    })
    return div
}

function clearDB(refresh) {
    const div = document.createElement("div")
    div.className = "d-flex justify-content-center my-4" // Center + margin

    const button = document.createElement("button")
    button.addEventListener("click", async () => {
        const confirmed = await ConfirmModal("Are you sure you want to delete ALL SCORES?");
        if (confirmed) {
            clearScores()
            refresh();
        }

    })
    button.className = "btn btn-danger"
    button.textContent = "Delete all scores"

    div.appendChild(button)
    return div
}

function VerificationModal(message) {
    const modalDiv = document.createElement("div");
    modalDiv.className = "modal fade";
    modalDiv.tabIndex = -1;
    modalDiv.setAttribute("aria-hidden", "true");

    modalDiv.innerHTML = `
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Confirm Delete</h5>
          <button type="button" class="btn-close" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>${message}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-danger">Confirm</button>
        </div>
      </div>
    </div>
  `;

    document.body.appendChild(modalDiv);

    // Bootstrap 5 modal instance
    const modal = new bootstrap.Modal(modalDiv, { backdrop: 'static', keyboard: false });

    return { modalDiv, modal };
}

function ConfirmModal(message) {
    return new Promise((resolve) => {
        const { modalDiv, modal } = VerificationModal(message);

        const confirmBtn = modalDiv.querySelector(".btn-danger");
        const cancelBtn = modalDiv.querySelector(".btn-secondary");
        const closeBtn = modalDiv.querySelector(".btn-close");

        function cleanup() {
            modal.hide();
            modalDiv.remove();
        }

        confirmBtn.onclick = () => {
            cleanup();
            resolve(true);
        };

        cancelBtn.onclick = () => {
            cleanup();
            resolve(false);
        };

        closeBtn.onclick = () => {
            cleanup();
            resolve(false);
        };

        modal.show();
    });
}


export function Scoreboard(refresh) {
    const grouped = retrieveSortedScores();
    const digitSections = Object.keys(grouped);

    const container = document.createElement("div")
    container.className = "container mt-4 dflex "
    container.innerHTML = "<h2>Scoreboard</h2>"
    digitSections.map(ndigits => container.appendChild(ScoreTable(grouped[ndigits], ndigits, refresh)))
    if (digitSections.length > 0){
    container.appendChild(clearDB(refresh))
} else {
    container.innerHTML = `<div class="d-flex justify-content-center align-items-center min-vh-100"> <div class="alert alert-light card shadow-lg rounded-4" role="alert">
  There are currently no scores on the database
  <br>
  <div class = "d-flex justify-content-center my-4"> <a href = "play" class ="btn btn-success fs-3 w-100"> Go play!</a> </div>
</div> </div>`
}

    return container
}