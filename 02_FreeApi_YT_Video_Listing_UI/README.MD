# YouTube Video Listing UI

This is a simple YouTube-style video listing page built with HTML, CSS, and JavaScript. It fetches videos from the FreeAPI YouTube videos endpoint and displays them in a responsive card layout.

## Features

- YouTube-like video card layout
- Dark and light theme toggle
- Theme preference saved in `localStorage`
- Infinite scrolling instead of Previous/Next pagination
- Clickable video cards that open the real YouTube video
- Responsive design for desktop and mobile screens

## Files

- `index.html`: Contains the page structure.
- `style.css`: Contains the light/dark theme styles and responsive layout.
- `script.js`: Contains API fetching, rendering, infinite scroll, theme toggle, and helper functions.

## How To Run

Open `index.html` directly in your browser.

The app uses this API:

```txt
https://api.freeapi.app/api/v1/public/youtube/videos
```

## JavaScript Logic

### Theme Toggle

The theme button is selected from the HTML:

```js
const themeToggle = document.getElementById("theme-toggle");
```

When the page loads, the app checks whether a theme was already saved:

```js
const savedTheme =
    localStorage.getItem("theme") || "dark";
```

If no theme is saved, the app starts in dark mode.

The `applyTheme()` function adds or removes the `light-theme` class on the `body`:

```js
document.body.classList.toggle("light-theme", theme === "light");
```

The CSS uses this class to switch between dark and light colors.

When the user clicks the toggle button, the app checks the current theme and switches to the opposite one:

```js
const nextTheme =
    document.body.classList.contains("light-theme")
        ? "dark"
        : "light";
```

Then the selected theme is saved:

```js
localStorage.setItem("theme", nextTheme);
```

So when the page refreshes, the selected theme stays the same.

## Fetching Videos

Videos are fetched inside this function:

```js
async function fetchVideos(page = 1)
```

The function accepts a page number. For example:

```js
fetchVideos(1);
fetchVideos(2);
```

Before calling the API, it checks:

```js
if (isLoading || !hasNextPage) {
    return;
}
```

This prevents duplicate API calls while one request is already running. It also stops fetching when there are no more pages.

The API request is made with:

```js
const response = await fetch(
    `https://api.freeapi.app/api/v1/public/youtube/videos?page=${page}`
);
```

After getting the response, the app extracts the videos and renders them:

```js
const videos = result.data.data;

renderVideos(videos, page === 1);
```

If it is the first page, old content is replaced. For later pages, new videos are added below the existing ones.

## Rendering Video Cards

The `renderVideos()` function converts every video object into an HTML card.

Each card is an anchor tag:

```js
<a href="${videoUrl}" class="card">
```

That means the whole card is clickable.

The YouTube link is created using the video id:

```js
const videoUrl =
    `https://www.youtube.com/watch?v=${videoId}`;
```

So when the user clicks a thumbnail, title, channel name, or any part of the card, the browser opens the actual YouTube video.

## Infinite Scrolling

The app does not use Previous and Next buttons.

Instead, the HTML has a small empty element at the bottom:

```html
<div id="scroll-loader"></div>
```

JavaScript watches that element using `IntersectionObserver`:

```js
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        fetchVideos(currentPage + 1);
    }
});
```

When the user scrolls near the bottom and the loader comes into view, the next page is fetched automatically.

Then the observer starts watching the loader:

```js
observer.observe(scrollLoader);
```

## App Flow

1. The page opens.
2. The saved theme is applied.
3. `fetchVideos(1)` loads the first page of videos.
4. Videos are rendered as clickable cards.
5. When the user scrolls to the bottom, the next page is loaded.
6. New videos are appended to the existing list.
7. The process continues until the API has no next page.
