const container =
    document.getElementById("jokes-container");

const loader =
    document.getElementById("loader");

const themeBtn =
    document.getElementById("theme-btn");



/* =========================
   PAGINATION ELEMENTS
========================= */

const prevBtn =
    document.getElementById("prev-btn");

const nextBtn =
    document.getElementById("next-btn");

const pageInfo =
    document.getElementById("page-info");

const paginationNumbers =
    document.getElementById(
        "pagination-numbers"
    );



/* =========================
   MODAL ELEMENTS
========================= */

const modal =
    document.getElementById("modal");

const modalJoke =
    document.getElementById("modal-joke");

const closeBtn =
    document.getElementById("close-btn");



/* =========================
   API
========================= */

const API_URL =
    "https://api.freeapi.app/api/v1/public/randomjokes";



/* =========================
   STATE
========================= */

let currentPage = 1;



/* =========================
   THEME
========================= */

const savedTheme =
    localStorage.getItem("theme");

if (savedTheme === "light") {

    document.body.classList.add("light");
}



themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");



    if (
        document.body.classList.contains(
            "light"
        )
    ) {

        localStorage.setItem(
            "theme",
            "light"
        );

    } else {

        localStorage.setItem(
            "theme",
            "dark"
        );
    }
});



/* =========================
   FETCH JOKES
========================= */

async function fetchJokes(page = 1) {

    try {

        loader.style.display = "block";



        const response = await fetch(
            `${API_URL}?page=${page}`
        );

        const result =
            await response.json();

        console.log(result);



        const jokes =
            result.data.data;



        renderJokes(jokes);



        updatePagination(
            result.data
        );



    } catch (error) {

        console.log(error);



        container.innerHTML = `
            <h2>
                Failed to load jokes
            </h2>
        `;

    } finally {

        loader.style.display = "none";
    }
}



/* =========================
   RENDER JOKES
========================= */

function renderJokes(jokes) {

    const cards = jokes.map((joke) => {

        const isExplicit =
            joke.categories.includes(
                "explicit"
            );



        return `

            <div
                class="joke-card"

                onclick="
                    openModal(
                        \`${joke.content}\`
                    )
                "
            >

                <p class="joke-text">

                    ${joke.content}

                </p>

                <div class="bottom-section">

                    <span class="
                        ${
                            isExplicit
                            ? "explicit"
                            : "safe"
                        }
                    ">

                        ${
                            isExplicit
                            ? "18+"
                            : "Safe"
                        }

                    </span>



                    <button
                        class="copy-btn"

                        onclick="
                            event.stopPropagation();

                            copyJoke(
                                \`${joke.content}\`
                            )
                        "
                    >

                        Copy

                    </button>

                </div>

            </div>

        `;
    }).join("");



    container.innerHTML = cards;
}



/* =========================
   UPDATE PAGINATION
========================= */

function updatePagination(data) {

    pageInfo.innerText =
        `Page ${data.page} of ${data.totalPages}`;



    paginationNumbers.innerHTML = "";



    const totalPages =
        data.totalPages;



    const pagesToShow = [];



    if (currentPage <= 3) {

        pagesToShow.push(
            1, 2, 3, 4, 5
        );

    } else if (
        currentPage >= totalPages - 2
    ) {

        pagesToShow.push(
            totalPages - 4,
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
            totalPages
        );

    } else {

        pagesToShow.push(
            currentPage - 2,
            currentPage - 1,
            currentPage,
            currentPage + 1,
            currentPage + 2
        );
    }



    pagesToShow.forEach((page) => {

        const button =
            document.createElement(
                "button"
            );

        button.innerText = page;

        button.classList.add(
            "page-number"
        );



        if (page === currentPage) {

            button.classList.add(
                "active"
            );
        }



        button.addEventListener(
            "click",
            () => {

                currentPage = page;

                fetchJokes(
                    currentPage
                );

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }
        );



        paginationNumbers.appendChild(
            button
        );
    });



    if (currentPage < totalPages - 2) {

        const dots =
            document.createElement(
                "span"
            );

        dots.innerText = "...";

        dots.classList.add("dots");



        paginationNumbers.appendChild(
            dots
        );



        const lastPageBtn =
            document.createElement(
                "button"
            );

        lastPageBtn.innerText =
            totalPages;

        lastPageBtn.classList.add(
            "page-number"
        );



        lastPageBtn.addEventListener(
            "click",
            () => {

                currentPage =
                    totalPages;

                fetchJokes(
                    currentPage
                );

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }
        );



        paginationNumbers.appendChild(
            lastPageBtn
        );
    }



    prevBtn.disabled =
        !data.previousPage;

    nextBtn.disabled =
        !data.nextPage;
}



/* =========================
   PREVIOUS PAGE
========================= */

prevBtn.addEventListener("click", () => {

    if (currentPage > 1) {

        currentPage--;

        fetchJokes(currentPage);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
});



/* =========================
   NEXT PAGE
========================= */

nextBtn.addEventListener("click", () => {

    currentPage++;

    fetchJokes(currentPage);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});



/* =========================
   COPY JOKE
========================= */

function copyJoke(text) {

    navigator.clipboard.writeText(text);

    alert("Joke copied!");
}



/* =========================
   OPEN MODAL
========================= */

function openModal(joke) {

    modal.style.display = "flex";

    modalJoke.innerText = joke;
}



/* =========================
   CLOSE MODAL
========================= */

closeBtn.addEventListener("click", () => {

    modal.style.display = "none";
});



window.addEventListener("click", (e) => {

    if (e.target === modal) {

        modal.style.display = "none";
    }
});



/* =========================
   INITIAL FETCH
========================= */

fetchJokes(currentPage);