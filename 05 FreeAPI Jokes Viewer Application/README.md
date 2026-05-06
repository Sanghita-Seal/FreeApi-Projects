# Laughing Corner - Jokes Viewer

Laughing Corner is a simple web app that fetches random jokes from a public API and displays them in a clean, responsive card layout. Users can browse jokes page by page, copy jokes, open a joke in a modal, and switch between dark and light themes.

## Features

- Fetches jokes from the FreeAPI random jokes endpoint
- Displays jokes in responsive cards
- Pagination with previous, next, numbered pages, and last-page shortcut
- Copy button for each joke
- Modal view for reading a selected joke
- Safe and 18+ category labels
- Dark/light theme toggle with `localStorage` support
- Responsive design for mobile and desktop screens

## Tech Stack

- HTML
- CSS
- JavaScript
- FreeAPI public random jokes API

## Project Files

```text
05/
|-- index.html
|-- style.css
|-- script.js
|-- README.md
```

## How To Run

1. Open the project folder.
2. Open `index.html` in any modern web browser.
3. Make sure you are connected to the internet because the jokes are loaded from an external API.

No installation or build step is required.

## API Used

```text
https://api.freeapi.app/api/v1/public/randomjokes
```

The app requests jokes using a page query parameter:

```text
https://api.freeapi.app/api/v1/public/randomjokes?page=1
```

## Main Functionality

- `fetchJokes(page)` loads jokes from the API.
- `renderJokes(jokes)` displays joke cards on the page.
- `updatePagination(data)` updates page buttons and page information.
- `copyJoke(text)` copies a joke to the clipboard.
- `openModal(joke)` shows the selected joke in a modal.

## Author

Created as a cohort assignment project.
