const container = document.getElementById("video-container");

const scrollLoader = document.getElementById("scroll-loader");

const themeToggle = document.getElementById("theme-toggle");

let currentPage = 1;

let isLoading = false;

let hasNextPage = true;



function applyTheme(theme) {

    document.body.classList.toggle("light-theme", theme === "light");

    themeToggle.innerText =
        theme === "light"
            ? "\u{1F319}"
            : "\u2600\uFE0F";

    themeToggle.setAttribute(
        "aria-label",
        theme === "light"
            ? "Switch to dark theme"
            : "Switch to light theme"
    );
}



const savedTheme =
    localStorage.getItem("theme") || "dark";

applyTheme(savedTheme);



async function fetchVideos(page = 1) {

    if (isLoading || !hasNextPage) {
        return;
    }

    try {

        isLoading = true;

        if (page === 1) {
            container.innerHTML = `
                <h2 class="message">
                    Loading videos...
                </h2>
            `;
        }

        const response = await fetch(
            `https://api.freeapi.app/api/v1/public/youtube/videos?page=${page}`
        );

        const result = await response.json();

        console.log(result);

        const videos = result.data.data;

        renderVideos(videos, page === 1);

        hasNextPage = Boolean(result.data.nextPage);

        currentPage = page;

    } catch (error) {

        console.log(error);

        container.innerHTML = `
            <h2 class="message error">
                Failed to fetch videos
            </h2>
        `;
    } finally {

        isLoading = false;
    }
}



function renderVideos(videos, shouldReplace = false) {

    const cards = videos.map((video) => {

        const item = video.items;

        const videoId =
            typeof item.id === "string"
                ? item.id
                : item.id.videoId;

        const videoUrl =
            `https://www.youtube.com/watch?v=${videoId}`;

        const thumbnail =
            item.snippet.thumbnails.high.url;

        const title =
            item.snippet.title;

        const channel =
            item.snippet.channelTitle;

        const views =
            formatViews(
                Number(item.statistics.viewCount)
            );

        const duration =
            convertDuration(
                item.contentDetails.duration
            );

        const published =
            timeAgo(
                item.snippet.publishedAt
            );

        return `
            <a href="${videoUrl}" class="card">

                <div class="thumbnail-container">

                    <img
                        src="${thumbnail}"
                        alt="${title}"
                        class="thumbnail"
                    />

                    <span class="duration">
                        ${duration}
                    </span>

                </div>

                <div class="card-content">

                    <h3 class="title">
                        ${title}
                    </h3>

                    <p class="channel">
                        ${channel}
                    </p>

                    <p class="meta">
                        ${views} views &bull; ${published}
                    </p>

                </div>

            </a>
        `;
    }).join("");

    if (shouldReplace) {
        container.innerHTML = cards;
        return;
    }

    container.insertAdjacentHTML("beforeend", cards);
}



function formatViews(num) {

    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + "M";
    }

    if (num >= 1000) {
        return (num / 1000).toFixed(1) + "K";
    }

    return num;
}



function convertDuration(duration) {

    const match =
        duration.match(/PT(\d+M)?(\d+S)?/);

    const minutes =
        match[1]
            ? match[1].replace("M", "")
            : "0";

    const seconds =
        match[2]
            ? match[2].replace("S", "")
            : "00";

    return `${minutes}:${seconds.padStart(2, "0")}`;
}



function timeAgo(dateString) {

    const date = new Date(dateString);

    const now = new Date();

    const seconds =
        Math.floor((now - date) / 1000);

    const days =
        Math.floor(seconds / 86400);

    if (days > 365) {
        return Math.floor(days / 365) + " years ago";
    }

    if (days > 30) {
        return Math.floor(days / 30) + " months ago";
    }

    if (days > 0) {
        return days + " days ago";
    }

    return "Today";
}



const observer = new IntersectionObserver((entries) => {

    if (entries[0].isIntersecting) {

        fetchVideos(currentPage + 1);
    }
});



observer.observe(scrollLoader);



themeToggle.addEventListener("click", () => {

    const nextTheme =
        document.body.classList.contains("light-theme")
            ? "dark"
            : "light";

    localStorage.setItem("theme", nextTheme);

    applyTheme(nextTheme);
});



fetchVideos(currentPage);
