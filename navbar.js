/* Ensure Babel transpilation for Safari support */
document.addEventListener("DOMContentLoaded", function () {
    console.log("Navbar script is running!");

    // Get the last part of the URL path
    let currentPage = window.location.pathname.split("/").pop() || "index.html";
    
    // Ensure the current page has ".html" if missing
    if (!currentPage.includes(".")) {
        currentPage += ".html";
    }
    
    console.log("Current Page:", currentPage);

    // Select all navbar links
    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(link => {
        // Extract filename from each link's href
        let linkHref = link.getAttribute("href").split("/").pop();
        console.log("Checking link:", linkHref);

        // Compare filenames
        if (currentPage === linkHref) {
            link.classList.add("active");
            console.log("✅ Highlighting:", linkHref);
        } else {
            link.classList.remove("active");
        }
    });
});
