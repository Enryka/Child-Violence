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
    const flourishContainer = document.querySelector(".flourish-container"); // Select Flourish embed div

    function showContent(index) {
        // Hide all images
        images.forEach(img => img.style.display = "none");

        // Hide Flourish embed initially
        if (flourishContainer) flourishContainer.style.display = "none";

        // Show corresponding content
        if (index === 2) {  // If "Crime Distribution" tab is clicked
            if (flourishContainer) {
                flourishContainer.style.display = "block"; // Show Flourish embed

                // Force Flourish to reload
                const flourishScript = document.createElement("script");
                flourishScript.src = "https://public.flourish.studio/resources/embed.js";
                flourishScript.async = true;
                document.body.appendChild(flourishScript);
            }
        } else {
            images[index].style.display = "block"; // Show corresponding image
        }

        // Update active tab styling (optional)
        tabs.forEach(tab => tab.classList.remove("active-tab"));
        tabs[index].classList.add("active-tab");
    }

    tabs.forEach(tab => {
        tab.addEventListener("click", function () {
            const index = parseInt(this.getAttribute("data-index"));
            showContent(index);
        });
    });

    // Show the first image by default
    showContent(0);
});
