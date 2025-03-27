/* Ensure Babel transpilation for Safari support */
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.querySelector(".modal");
    const modalContent = document.getElementById("modal-content");

    if (!modal || !modalContent) return;

    // ✅ Open Modal Function
    window.openModal = function (event) {
        if (!event) {
            console.log("No event data found!");
            return;
        }

        console.log("Opening Modal for:", event.name);

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
            <button id="register-button" class="register-btn">Register Now</button>
        `;

        // ✅ Show the modal
        modal.classList.add("show");
        modal.style.display = "block";

        // Close modal event
        document.getElementById("close-modal").addEventListener("click", function () {
            modal.classList.remove("show");
            modal.style.display = "none";
        });

        // ✅ Register button event (now correctly opens the event link)
        document.getElementById("register-button").addEventListener("click", function () {
            console.log("Registering for event:", event.name);

            if (event.link && event.link.trim() !== "") {
                window.open(event.link, "_blank"); // Opens the event link in a new tab
            } else {
                alert("Registration link not available for this event.");
            }
        });
    };

    // ✅ Close Modal when clicking outside content
    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.classList.remove("show");
            modal.style.display = "none";
        }
    });

    // Ensure modal is hidden initially
    modal.style.display = "none";
});
