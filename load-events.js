/* Ensure Babel transpilation for Safari support */
document.addEventListener("DOMContentLoaded", () => {
    const eventsContainer = document.getElementById("events-container");
    const events = JSON.parse(localStorage.getItem("events")) || [];

    eventsContainer.innerHTML = ""; // Clear previous events

    // Create a wrapper to maintain row layout
    const eventGrid = document.createElement("div");
    eventGrid.classList.add("event-grid");

    events.forEach(event => {
        const eventCard = document.createElement("div");
        eventCard.classList.add("event-card");

        // Get emoji based on category
        const emojiMap = {
            "hackathon": "💻",
            "sports": "⚽",
            "music": "🎶",
            "dance": "💃",
            "gaming": "🎮",
            "other": "🔹"
        };

        const categoryEmoji = emojiMap[event.category] || "🔹";

        eventCard.innerHTML = `
            <h3>${categoryEmoji} ${event.name}</h3>
            <p>${event.desc}</p>
            <span>📅 ${event.date}</span>
        `;

        eventGrid.appendChild(eventCard);
    });

    eventsContainer.appendChild(eventGrid); // Append the grid to the container
});
