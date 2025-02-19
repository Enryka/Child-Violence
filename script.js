// Select the "reasons" divs and log them
d3.selectAll(".reason").style("cursor", "pointer");

// Placeholder for interactive elements (we'll add more later)
d3.selectAll(".reason").on("mouseover", function(event) {
    d3.select(this).style("background", "#f0f0f0");
}).on("mouseout", function(event) {
    d3.select(this).style("background", "white");
});
