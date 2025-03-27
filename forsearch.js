/* Ensure Babel transpilation for Safari support */
document.addEventListener("DOMContentLoaded", function () {
    const eventsContainer = document.getElementById("event-container");
    const categoryFilter = document.getElementById("category-filter");
    const applyFilterButton = document.getElementById("apply-filters");

    if (!eventsContainer) return;

    let events = JSON.parse(localStorage.getItem("events")) || [];

    if (events.length === 0) {
        eventsContainer.innerHTML = "<p>No events available.</p>";
        return;
    }

    // **Step 1: Create event cards**
    function createEvents(events) {
        eventsContainer.innerHTML = ""; // Clear existing cards

        events.forEach((event, index) => {
            const eventCard = document.createElement("div");
            eventCard.classList.add("event-card");
            eventCard.setAttribute("data-category", event.category.toLowerCase());
            eventCard.style.display = "none"; // Hide initially

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
        });

        // ✅ Attach event listeners for "Read More"
        attachReadMoreListeners();
        filterEvents(); // ✅ Apply filtering on page load
    }

    // **Step 2: Filter events**
    function filterEvents() {
        const selectedCategory = categoryFilter.value.toLowerCase();

        document.querySelectorAll(".event-card").forEach((card) => {
            const eventCategory = card.getAttribute("data-category");

            if (selectedCategory === "all" || eventCategory === selectedCategory) {
                card.style.display = "block"; // Show matching events
            } else {
                card.style.display = "none"; // Hide non-matching events
            }
        });

        // ✅ Re-attach event listeners after filtering
        attachReadMoreListeners();
    }

    // **Step 3: Attach event listeners to "Read More" buttons**
    function attachReadMoreListeners() {
        document.querySelectorAll(".read-more-circle").forEach((button) => {
            button.removeEventListener("click", handleReadMoreClick); // Prevent duplicate event listeners
            button.addEventListener("click", handleReadMoreClick);
        });
    }

    // **Step 4: Handle "Read More" click**
    function handleReadMoreClick() {
        const index = this.getAttribute("data-index");
        if (events[index]) {
            openModal(events[index]);
        }
    }

    // **Step 5: Initialize**
    createEvents(events);

    // **Step 6: Apply filter when the button is clicked**
    applyFilterButton.addEventListener("click", filterEvents);
});
