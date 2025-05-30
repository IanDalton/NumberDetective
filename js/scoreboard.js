import { Navbar, setCurrentPage } from "../components/navbar.js";
import { Scoreboard } from "../components/scoreboard.js";
setCurrentPage("Scoreboard");

document.querySelector("navbar").innerHTML = Navbar();


const scoreboardWrapper = document.querySelector("scoreboard");
function refreshScoreboard() {
  scoreboardWrapper.innerHTML = "";
  scoreboardWrapper.appendChild(Scoreboard(refreshScoreboard));
}

refreshScoreboard();

const params = new URLSearchParams(window.location.search);
const ndigits = params.get("ndigits");

if (ndigits && document.getElementById(`scoreboard-${ndigits}`)) {
  document.getElementById(`scoreboard-${ndigits}`).scrollIntoView({ behavior: "smooth" });
}
