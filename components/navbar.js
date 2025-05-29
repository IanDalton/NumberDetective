import { retrieveSortedScores } from "../core/storage.js";

const digits = Object.keys(retrieveSortedScores());
export const NAVBAR_PAGES = [
    { name: "Play", href: "play" },
    { name: "Tutorial", href: "tutorial" },
    {
        name: "Scoreboard",
        href: "scoreboard",
        dropdown: digits.map((digit) => ({
            name: `${digit} digits`,
            href: `scoreboard?ndigits=${digit}`
        }))

    }
];

let currentPage = "Home";
export function setCurrentPage(page) {
    currentPage = page;
}

export function Navbar() {
    function isActive(page) {
        return page === currentPage ? "active btn btn-success " : "nav-link";
    }

    return `
    <nav class="navbar navbar-expand-lg bg-light fixed-top ">
        <div class="container-fluid">
            <a class="navbar-brand text-success fw-bold" href="index">Number Detective</a>
            <button class="navbar-toggler" type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                    ${NAVBAR_PAGES.map(page => {
        if (page.dropdown) {
            return `
                            <li class="nav-item dropdown">
                                <a class=" dropdown-toggle ${isActive(page.name)}" href="${page.href}"
                                    role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    ${page.name}
                                </a>
                                <ul class="dropdown-menu">
                                    ${page.dropdown.map(item =>
                `<li><a class="dropdown-item" href="${item.href}">${item.name}</a></li>`
            ).join("")}
                                </ul>
                            </li>
                            `;
        } else {
            return `
                            <li class="nav-item">
                                <a class=" ${isActive(page.name)} " href="${page.href}">${page.name}</a>
                            </li>
                            `;
        }
    }).join("")}
                </ul>
            </div>
        </div>
    </nav>
    `;
}