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
            element.textContent = start.toFixed(0); // Ensures 0 decimal place (e.g., 31 instead of 31.00000000000001)
        }, 30);
    }

    // Select ONLY the "31" element (not "2023")
    const percentElement = document.querySelector('.count-up[data-value="31"]');
    if (percentElement) {
        animateNumber(percentElement, 4500); // Run animation for 5 seconds
    }
});
