/* Ensure Babel transpilation for Safari support */
document.addEventListener("DOMContentLoaded", function() {
    let canvas = document.getElementById("backgroundCanvas");

    if (!canvas) {
        console.error("Canvas element not found!");
        return;
    }

    let ctx = canvas.getContext("2d");

    // 🔥 Forcefully set width & height
    function forceResizeCanvas() {
        canvas.style.position = "fixed";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.zIndex = "-1";

        // ✅ Force size update
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // ✅ Apply resizing on window load & resize
    window.addEventListener("load", forceResizeCanvas);
    window.addEventListener("resize", forceResizeCanvas);

    // ✅ Apply immediately
    forceResizeCanvas();
});



// 🌟 Create & Configure Canvas
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.id = "backgroundCanvas";
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = "-1";

const ctx = canvas.getContext("2d");
let stars = [];
let particles = [];
const numStars = 100;
const numParticles = 100;
const mouse = { x: null, y: null, radius: 100 }; // Mouse attraction range

// 🎨 Generate Stars
function createStars() {
    stars = [];
    for (let i = 0; i < numStars; i++) {
        let radius = Math.random() * 1.5 + 0.5;
        stars.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight, // Limit to viewport height
            radius: radius,
            opacity: Math.random() * 0.5 + 0.5,
            twinkleSpeed: Math.random() * 0.02 + 0.01,
            speedX: (Math.random() - 0.5) * radius * 0.2,
            speedY: (Math.random() - 0.5) * radius * 0.2,
            color: `rgba(255, 255, 255, ${Math.random() * 1})`
        });
    }
}

// 🌠 Generate Floating Particles
function createParticles() {
    particles = [];
    for (let i = 0; i < numParticles; i++) {
        particles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            radius: Math.random() * 1 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            color: `rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2})`
        });
    }
}

// 🖱️ Track Mouse Movement
window.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

// 🏆 Animation Loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 🌟 Draw stars
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.fill();

        // Twinkle effect
        star.opacity += (Math.random() - 0.5) * star.twinkleSpeed;
        star.opacity = Math.max(0.2, Math.min(1, star.opacity));

        // Move the stars
        star.x += star.speedX;
        star.y += star.speedY;

        // Attract to Mouse
        let dx = mouse.x - star.x;
        let dy = mouse.y - star.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
            star.x += dx * 0.02; // Attraction effect
            star.y += dy * 0.02;
        }

        // Wrap around edges
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;
    });

    requestAnimationFrame(animate);
}

// 🔄 Adjust Canvas on Resize
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createStars();
    createParticles();
});

// ✅ Start Animation
function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createStars();
    createParticles();
    animate();
}
init();
function resizeCanvas() {
    const canvas = document.getElementById("starsCanvas");
    canvas.width = window.innerWidth;
    canvas.height = document.body.scrollHeight; // Dynamically adjust height
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas(); // Call initially
