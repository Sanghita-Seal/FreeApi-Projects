# Product Listing Interface

A responsive product listing website built with HTML, CSS, and JavaScript. The app fetches product data from the FreeAPI random products endpoint and displays it in a clean product grid with theme switching and infinite scrolling.

## Features

- Fetches products from a public API
- Responsive product card layout
- Infinite scroll using `IntersectionObserver`
- Dark and light theme toggle
- Theme preference saved in `localStorage`
- Product image, title, brand, category, price, rating, discount, and stock status
- Loading and error states
- Modern CSS styling with hover effects and mobile-friendly layout

## Tech Stack

- HTML5
- CSS3
- JavaScript
- FreeAPI public products API

## Project Structure

```text
.
├── index.html
├── style.css
├── script.js
└── README.md
```

## How To Run

1. Download or clone this project.
2. Open the project folder.
3. Open `index.html` in your browser.

No build tools or package installation are required.

## API Used

The app uses the following API endpoint:

```text
https://api.freeapi.app/api/v1/public/randomproducts
```

Products are loaded page by page. When the user scrolls near the bottom of the page, the next page of products is fetched automatically.

## Files

- `index.html` contains the page structure.
- `style.css` contains all visual styling and responsive design.
- `script.js` handles API fetching, rendering products, infinite scroll, and theme switching.

## Theme

Click the **Toggle Theme** button to switch between dark and light mode. The selected theme is saved in the browser, so it stays the same when the page is reopened.
