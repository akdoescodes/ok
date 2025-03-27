/* Ensure Babel transpilation for Safari support */
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.querySelector(".modal");
    const modalContent = document.getElementById("modal-content");
    const eventsContainer = document.getElementById("events-container") || document.getElementById("eventsList");

    if (!eventsContainer) return;

    // Fetch events from JSON file
    fetch("events.json")
        .then(response => response.json())
        .then(events => {
            if (events.length === 0) {
                eventsContainer.innerHTML = "<p>No events available.</p>";
                return;
            }

            eventsContainer.innerHTML = "";

            events.forEach((event, index) => {
                const eventCard = document.createElement("div");
                eventCard.classList.add("event-card");

                eventCard.innerHTML = `
                    <div class="event-details">
                        <span class="event-emoji">${getCategoryEmoji(event.category)}</span>
                        <h3>${event.name}</h3>
                        <p>📅 ${event.date}</p>
                        <p>${event.type === "Team" ? `👥 Team Event (${event.teamSize})` : "👤 Solo Event"}</p>
                    </div>
                    <div class="read-more-circle" data-index="${index}">
                        <span class="arrow-symbol">&rarr;</span> 
                    </div>
                `;

                eventsContainer.appendChild(eventCard);

                const readMoreButton = eventCard.querySelector(".read-more-circle");
                readMoreButton.addEventListener("click", function () {
                    openModal(event);
                });
            });
        })
        .catch(error => {
            console.error("Error fetching events:", error);
            eventsContainer.innerHTML = "<p>Failed to load events.</p>";
        });
});

function getCategoryEmoji(category) {
    const categoryEmojis = {
        "Art": "🎨", "Theatre": "🎭", "Photography": "📸", "Music": "🎵",
        "Hackathon": "💻", "Gaming": "🎮", "Football": "⚽", "Workshop": "🛠"
    };
    return categoryEmojis[category] || "🎟";
}
