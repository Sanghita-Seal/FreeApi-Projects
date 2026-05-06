const container =
    document.getElementById("quotes-container");

const loader =
    document.getElementById("loader");

const sentinel =
    document.getElementById("sentinel");

const themeBtn =
    document.getElementById("theme-btn");



const API_URL =
    "https://api.freeapi.app/api/v1/public/quotes";



let currentPage = 1;

let isLoading = false;

let hasMore = true;



/* =========================
   GRADIENTS
========================= */

const gradients = [

    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",

    "linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)",

    "linear-gradient(135deg, #43cea2 0%, #185a9d 100%)",

    "linear-gradient(135deg, #f7971e 0%, #ffd200 100%)",

    "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",

    "linear-gradient(135deg, #ff9966 0%, #ff5e62 100%)"
];



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
        document.body.classList.contains("light")
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
   FETCH QUOTES
========================= */

async function fetchQuotes(page = 1) {

    try {

        isLoading = true;

        loader.style.display = "block";



        const response = await fetch(
            `${API_URL}?page=${page}`
        );

        const result =
            await response.json();

        console.log(result);



        const quotes =
            result.data.data;



        renderQuotes(quotes);



        hasMore =
            result.data.nextPage;



    } catch (error) {

        console.log(error);

        loader.innerHTML = `
            <h2>
                Failed to load quotes
            </h2>
        `;

    } finally {

        isLoading = false;

        loader.style.display = "none";
    }
}



/* =========================
   RENDER QUOTES
========================= */

function renderQuotes(quotes) {

    const cards = quotes.map((quote) => {

        const randomGradient =
            gradients[
                Math.floor(
                    Math.random() *
                    gradients.length
                )
            ];



        return `

            <div
                class="quote-card"
                style="
                    background:
                    ${randomGradient};
                "
            >

                <p class="quote-text">

                    "${quote.content}"

                </p>

                <h3 class="author">

                    — ${quote.author}

                </h3>

                <div class="bottom-section">

                    <span class="length">

                        ${getQuoteLength(
                            quote.length
                        )}

                    </span>

                    <button
                        class="copy-btn"
                        onclick="
                            copyQuote(
                                \`${quote.content}\`
                            )
                        "
                    >

                        Copy

                    </button>

                </div>

            </div>

        `;
    }).join("");



    container.innerHTML += cards;
}



/* =========================
   QUOTE LENGTH LABEL
========================= */

function getQuoteLength(length) {

    if (length < 80) {

        return "Short Read";
    }

    if (length < 150) {

        return "Medium Read";
    }

    return "Long Read";
}



/* =========================
   COPY QUOTE
========================= */

function copyQuote(text) {

    navigator.clipboard.writeText(text);

    alert("Quote copied!");
}



/* =========================
   INFINITE SCROLL
========================= */

const observer =
    new IntersectionObserver((entries) => {

        if (
            entries[0].isIntersecting &&
            !isLoading &&
            hasMore
        ) {

            currentPage++;

            fetchQuotes(currentPage);
        }
});



observer.observe(sentinel);



/* =========================
   INITIAL FETCH
========================= */

fetchQuotes(currentPage);