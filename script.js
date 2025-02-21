document.addEventListener("DOMContentLoaded", function () {
    function animateNumber(element, duration) {
        let start = 0;
        let end = parseFloat(element.getAttribute("data-value")); // Get the final number
        let increment = end / (duration / 30); // Adjust speed

        let interval = setInterval(() => {
            start += increment;
            if (start >= end) {
                start = end;
                clearInterval(interval);
            }
            element.textContent = start.toFixed(1); // Ensures 1 decimal place (e.g., 7.2)
        }, 30);
    }

    // Select ONLY the "7.2%" element (not "2023")
    const percentElement = document.querySelector('.count-up[data-value="7.2"]');
    if (percentElement) {
        animateNumber(percentElement, 2000); // Run animation for 2 seconds
    }
});
