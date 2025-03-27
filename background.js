/* Ensure Babel transpilation for Safari support */
document.addEventListener("DOMContentLoaded", function () {
    let canvas = document.getElementById("backgroundCanvas");

    if (!canvas) {
        console.error("Canvas element not found!");
        return;
    }

    let ctx = canvas.getContext("2d");

    function resizeCanvas() {
        
        canvas.width = document.documentElement.clientWidth;

        
        canvas.height = Math.max(
            document.documentElement.scrollHeight, 
            document.body.scrollHeight,
            window.innerHeight
        );

        console.log(`Canvas resized: ${canvas.width} x ${canvas.height}`);
    }

    
    window.addEventListener("load", resizeCanvas);
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("scroll", resizeCanvas); // Ensures full-page coverage dynamically
    
    
    resizeCanvas();
});
