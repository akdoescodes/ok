/* Ensure Babel transpilation for Safari support */
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".event-form");
    if (!form) return;

    document.querySelectorAll("input[name='event-type']").forEach((radio) => {
        radio.addEventListener("change", function () {
            const teamSizeSelect = document.getElementById("team-size");
            if (this.value === "Team") {
                teamSizeSelect.style.display = "block";
            } else {
                teamSizeSelect.style.display = "none";
                teamSizeSelect.value = "";
            }
        });
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const eventName = document.getElementById("event-name").value.trim();
        const eventDesc = document.getElementById("event-desc").value.trim();
        const eventDate = document.getElementById("event-date").value;
        const eventTime = document.getElementById("event-time").value;
        const eventContact = document.getElementById("event-contact").value;
        const eventCategory = document.getElementById("event-category").value;
        const eventLocation = document.getElementById("event-location").value;
        const eventPrice = document.getElementById("event-price").value;
        const eventLink = document.getElementById("event-link").value;
        const eventType = document.querySelector("input[name='event-type']:checked")?.value;
        let teamSize = document.getElementById("team-size").value || "Solo";

        if (!eventName || !eventDesc || !eventDate || !eventCategory || !eventLocation) {
            alert("Please fill all required fields!");
            return;
        }

        if (eventType === "Team" && !teamSize) {
            alert("Please select a team size.");
            return;
        }

        const newEvent = {
            name: eventName,
            desc: eventDesc,
            date: eventDate,
            time: eventTime || "Not specified",
            contact: eventContact || "Not provided",
            category: eventCategory,
            location: eventLocation,
            type: eventType,
            price: eventPrice.trim() !== "" ? `₹${eventPrice}` : "Free",
            teamSize: eventType === "Team" ? `${teamSize} members` : "Solo",
            link: eventLink.trim() !== "" ? eventLink : null,
        };

        console.log("Copy and paste this into events.json:");
        console.log(JSON.stringify(newEvent, null, 4));

        alert("Event data generated! Check the console and add it manually to events.json.");
        window.location.href = "index.html";
    });
});

// Get elements
const teamRadio = document.querySelector('input[name="event-type"][value="Team"]');
const soloRadio = document.querySelector('input[name="event-type"][value="Solo"]');
const teamSizeDropdown = document.getElementById('team-size');

// Function to toggle team size dropdown visibility
function toggleTeamSizeDropdown() {
    if (teamRadio.checked) {
        teamSizeDropdown.style.display = 'block';
        teamSizeDropdown.required = true;
    } else {
        teamSizeDropdown.style.display = 'none';
        teamSizeDropdown.required = false;
    }
}

// Add event listeners to radio buttons
teamRadio.addEventListener('change', toggleTeamSizeDropdown);
soloRadio.addEventListener('change', toggleTeamSizeDropdown);

// Run once on page load to set initial state
toggleTeamSizeDropdown();