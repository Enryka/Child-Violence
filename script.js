document.addEventListener("DOMContentLoaded", function () {
    // Function to animate number counting
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
            element.textContent = start.toFixed(0); // Ensures whole numbers
        }, 30);
    }

    // Select the number element and animate it
    const percentElement = document.querySelector('.count-up[data-value="31"]');
    if (percentElement) {
        animateNumber(percentElement, 4500); // Run animation for 4.5 seconds
    }

    // Handle visualization switching
    const images = document.querySelectorAll(".story-image");
    const tabs = document.querySelectorAll(".folder-tab");

    function showImage(index) {
        images.forEach((img, i) => {
            img.style.display = i === index ? "block" : "none";
        });

        // Update active tab styling (optional)
        tabs.forEach(tab => tab.classList.remove("active-tab"));
        tabs[index].classList.add("active-tab");
    }

    tabs.forEach(tab => {
        tab.addEventListener("click", function () {
            const index = parseInt(this.getAttribute("data-index"));
            showImage(index);
        });
    });

    // Show the first image by default
    showImage(0);
});
