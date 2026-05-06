const container = document.getElementById("product-container");
const loader = document.getElementById("loader");
const sentinel = document.getElementById("sentinel");
const themeBtn = document.getElementById("theme-btn");

const API_URL = "https://api.freeapi.app/api/v1/public/randomproducts";

let currentPage = 1;
let isLoading = false;
let hasMore = true;

/****   THEME *********/

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  document.body.classList.add("light");
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {
    localStorage.setItem("theme", "light");
  } else {
        localStorage.setItem("theme", "dark");

  }
});

/********* FETCH PRODUCTS *****************/

async function fetchProducts(page=1){
    try {
        isLoading = true;
        loader.style.display = "block";

        const response = await fetch(`${API_URL}?page=${page}`);

        const result = await response.json();

        console.log(result);

        const products = result.data.data;

        renderProducts(products);

        hasMore=result.data.nextPage;
        
    } catch (error) {
        console.error(error);

        loader.innerHTML =`
          <h2>
            Failed to load Products
          </h2>
        `
    }finally{
        isLoading=false;

        loader.style.display = "none";
    }
}

/****  RENDER PRODUCTS  ******/

function renderProducts(products){
    const cards = products.map((product)=>{
        return `
              <a
                href="${product.thumbnail}"
                target="_blank"
                class="card"
            >

                <div class="image-container">

                    <img
                        src="${product.thumbnail}"
                        alt="${product.title}"
                    />

                    <span class="discount">

                        ${Math.floor(
                            product.discountPercentage
                        )}% OFF

                    </span>

                </div>

                <div class="content">

                    <h3 class="title">

                        ${product.title}

                    </h3>

                    <p class="brand">

                        ${product.brand}

                    </p>

                    <p class="category">

                        ${product.category}

                    </p>

                    <div class="price-section">

                        <span class="price">

                            $${product.price}

                        </span>

                        <span class="rating">

                            ⭐ ${product.rating}

                        </span>

                    </div>

                    <p class="stock">

                        ${
                            product.stock < 20
                            ? "⚠️ Few Left"
                            : "✅ In Stock"
                        }

                    </p>

                </div>

            </a>
        `;
    }).join("");

    container.innerHTML += cards;
}

const observer =
    new IntersectionObserver((entries) => {

        if (
            entries[0].isIntersecting &&
            !isLoading &&
            hasMore
        ) {

            currentPage++;

            fetchProducts(currentPage);
        }
});



observer.observe(sentinel);



/* =========================
   INITIAL FETCH
========================= */

fetchProducts(currentPage);