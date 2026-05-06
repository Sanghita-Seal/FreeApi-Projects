# Quotes Gallery

A beautiful responsive quote listing application built with HTML, CSS, and JavaScript. It fetches quotes from the FreeAPI public quotes API and displays them as colorful glass-style cards with infinite scrolling, copy support, and a light/dark theme toggle.

## Features

- Fetches quotes from the FreeAPI quotes endpoint
- Infinite scrolling using `IntersectionObserver`
- Random gradient quote cards
- Bengali-inspired glassmorphism UI theme
- Light and dark theme support with `localStorage`
- Copy quote text to clipboard
- Quote length labels: Short Read, Medium Read, and Long Read
- Fully responsive layout for desktop and mobile

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- FreeAPI public quotes API

## Project Structure

```text
.
├── index.html
├── style.css
├── script.js
└── README.MD
```

## How To Run

1. Download or clone this project.
2. Open `index.html` in your browser.
3. Make sure you are connected to the internet because quotes are loaded from an external API.

No build tools or package installation are required.

## API Used

```text
https://api.freeapi.app/api/v1/public/quotes
```

The app requests quotes page by page and loads more automatically when the user reaches the bottom of the page.

## Main Files

- `index.html` contains the app layout.
- `style.css` contains the responsive Bengali-themed glass UI.
- `script.js` handles fetching quotes, rendering cards, theme switching, copying quotes, and infinite scroll.

## Author

Created as a FreeAPI Quotes Listing Application assignment.
