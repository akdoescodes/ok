/* Ensure Babel transpilation for Safari support */
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.querySelector(".modal");
    const modalContent = document.getElementById("modal-content");
    const eventsContainer = document.getElementById("events-container") || document.getElementById("eventsList");

    if (!eventsContainer) return;

    // ✅ Fetch events from JSON file instead of local storage
    fetch("events.json")
        .then(response => {
            if (!response.ok) throw new Error("Failed to load events.json");
            return response.json();
        })
        .then(events => {
            console.log("Events Loaded:", events);

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

                // ✅ Open modal on clicking the arrow button
                const readMoreButton = eventCard.querySelector(".read-more-circle");
                readMoreButton.addEventListener("click", function () {
                    console.log("Opening Modal for:", event.name);
                    openModal(event);
                });
            });
        })
        .catch(error => {
            console.error("Error fetching events:", error);
            eventsContainer.innerHTML = "<p>Failed to load events.</p>";
        });

    // ✅ Open Modal Function
    function openModal(event) {
        if (!event) {
            console.error("No event data found!");
            return;
        }

        modalContent.innerHTML = `
            <button id="close-modal">×</button>
            <h2>${event.name}</h2>
            <p><strong>📅 Date:</strong> ${event.date}</p>
            <p><strong>🕒 Time:</strong> ${event.time || "Not specified"}</p>
            <p><strong>📍 Location:</strong> ${event.location}</p>
            <p><strong>👥 Type:</strong> ${event.type === "Team" ? `Team (${event.teamSize} members)` : "Solo"}</p>
            <p><strong>🎯 Category:</strong> ${event.category}</p>
            <p><strong>📝 Description:</strong> ${event.desc || "No description available."}</p>
            <p><strong>💰 Entry Fee:</strong> ${event.price && event.price.trim() !== "" ? `₹${event.price}` : "Free"}</p>
            <p><strong>📢 Contact Info:</strong> ${event.contact || "Not provided"}</p>
            <a id="register-button" class="register-btn" href="${event.link && event.link.trim() !== "" ? event.link : "#"}" target="_blank" rel="noopener noreferrer">
                Register Now
            </a>
        `;

        modal.classList.add("show");
        modal.style.display = "block";

        // ✅ Close modal when clicking close button
        document.getElementById("close-modal").addEventListener("click", function () {
            modal.classList.remove("show");
            modal.style.display = "none";
        });
    }

    // ✅ Close Modal when clicking outside content
    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.classList.remove("show");
            modal.style.display = "none";
        }
    });

    // Ensure modal is hidden initially
    window.addEventListener("load", function () {
        modal.style.display = "none";
    });
});

// ✅ Function to return category emoji
function getCategoryEmoji(category) {
    const categoryEmojis = {
        "Art": "🎨", "Theatre": "🎭", "Poetry": "🎤", "Movie": "🎬",
        "Photography": "📸", "Music": "🎵", "Band": "🎸", "Dance": "💃",
        "DJ": "🎧", "Classical": "🎻", "Debate": "📖", "Quiz": "🏅",
        "Hackathon": "💻", "Gaming": "🎮", "Speech": "🗣", "Football": "⚽",
        "Basketball": "🏀", "Gym": "🏋️", "Marathon": "🏃", "Badminton": "🏸",
        "Workshop": "🛠", "Seminar": "📚", "Science": "🧪", "Research": "🔬",
        "BookClub": "📖", "Food": "🍔", "Camp": "🏕", "Networking": "🤝",
        "Charity": "🎗", "Environment": "🌱"
    };
    return categoryEmojis[category] || "🎟";
}

// Function to update modal position based on scroll
function updateModalPosition() {
    const modal = document.querySelector(".modal");
    const modalContent = document.getElementById("modal-content");
    
    if (modal && modal.classList.contains("show") && modalContent) {
        // Get current scroll position
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Calculate viewport center
        const viewportCenter = scrollTop + (window.innerHeight / 2);
        
        // Set modal content position
        modalContent.style.position = "absolute";
        modalContent.style.top = viewportCenter + "px";
        modalContent.style.left = "50%";
        modalContent.style.transform = "translate(-50%, -50%)";
    }
}

// Add event listeners for scroll and resize
window.addEventListener("scroll", updateModalPosition);
window.addEventListener("resize", updateModalPosition);

// Override the openModal function
const originalOpenModal = window.openModal || function(){};
window.openModal = function(event) {
    // Call the original function if it exists
    if (typeof originalOpenModal === "function") {
        originalOpenModal(event);
    }
    
    // Update modal position
    setTimeout(updateModalPosition, 10);
};

// Also update position when any modal show class is added
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.target.classList.contains("show")) {
            updateModalPosition();
        }
    });
});

// Start observing the modal for class changes
const modal = document.querySelector(".modal");
if (modal) {
    observer.observe(modal, { attributes: true });
}
