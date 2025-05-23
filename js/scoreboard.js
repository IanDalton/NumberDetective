import { Navbar,setCurrentPage } from "../components/navbar.js";
import { Scoreboard } from "../components/scoreboard.js";
setCurrentPage("Scoreboard")


document.querySelector("navbar").innerHTML = Navbar()
document.querySelector("scoreboard").innerHTML = Scoreboard()


const ndigits = params.get("ndigits");
if (ndigits && document.getElementById(`scoreboard-${ndigits}`)) {
    document.getElementById(`scoreboard-${ndigits}`).scrollIntoView({ behavior: "smooth" });
}