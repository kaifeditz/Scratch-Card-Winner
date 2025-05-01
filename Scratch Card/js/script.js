/* js/script.js */
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById("scratch");
    const context = canvas.getContext("2d");
    const prizeDisplay = document.getElementById("prize-amount");
    
    // Generate random prize amount
    function generatePrize() {
        const prizes = [5, 10, 25, 50, 100, 250, 500, 1000];
        const randomIndex = Math.floor(Math.random() * prizes.length);
        return "$" + prizes[randomIndex];
    }
    
    // Set the prize amount
    prizeDisplay.textContent = generatePrize();
    
    // Initialize the scratch area
    const init = () => {
        let gradientColor = context.createLinearGradient(0, 0, 200, 200);
        gradientColor.addColorStop(0, "#c3a3f1");
        gradientColor.addColorStop(1, "#6414e9");
        context.fillStyle = gradientColor;
        context.fillRect(0, 0, 200, 200);
    };
    
    // Variables to track mouse movement
    let isDragging = false;
    
    // Function to handle scratch effect
    function scratch(x, y) {
        context.globalCompositeOperation = "destination-out";
        context.beginPath();
        context.arc(x, y, 15, 0, Math.PI * 2);
        context.fill();
    }
    
    // Mouse event handlers
    canvas.addEventListener("mousedown", function(e) {
        isDragging = true;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        scratch(x, y);
    });
    
    canvas.addEventListener("mousemove", function(e) {
        if (isDragging) {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            scratch(x, y);
        }
    });
    
    canvas.addEventListener("mouseup", function() {
        isDragging = false;
    });
    
    canvas.addEventListener("mouseleave", function() {
        isDragging = false;
    });
    
    // Touch event handlers for mobile devices
    canvas.addEventListener("touchstart", function(e) {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        scratch(x, y);
    });
    
    canvas.addEventListener("touchmove", function(e) {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        scratch(x, y);
    });
    
    // Initialize the canvas
    init();
});