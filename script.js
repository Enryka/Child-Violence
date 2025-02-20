// Data for reasons and placeholder stats
const reasonsData = [
    { text: "Systemic Discrimination", stats: "Placeholder for Stats 1" },
    { text: "False Forensics", stats: "Placeholder for Stats 2" },
    { text: "Mistaken Identification", stats: "Placeholder for Stats 3" },
    { text: "Suppression of Exculpatory Evidence", stats: "Placeholder for Stats 4" },
    { text: "Police Misconduct", stats: "Placeholder for Stats 5" },
    { text: "False Confessions", stats: "Placeholder for Stats 6" },
    { text: "Witness Perjury", stats: "Placeholder for Stats 7" },
    {text: "Ineffective Counsel", stats: "Placeholder for Stats 8"},
];

// Select the section where the buttons will be added
const reasonsContainer = d3.select('.reason-holder');

// Dynamically create buttons using D3
reasonsContainer.selectAll('.reason')
    .data(reasonsData)
    .enter()
    .append('div')
    .attr('class', 'reason')
    .style('cursor', 'pointer')
    .style('padding', '10px')
    .style('margin', '30px')
    .style('border', '1px solid #ccc')
    .style('border-radius', '5px')
    
    .text(d => d.text)
    .on('mouseover', function() {
        d3.select(this).style('background', '#f0f0f0');
    })
    .on('mouseout', function() {
        d3.select(this).style('background', 'white');
    })
    .on('click', function(event, d) {
        // Display the popup with placeholder stats
        const popup = d3.select('#popup');
        popup.select('#popup-content').text(d.stats);
        popup.style('display', 'block')
            .style('left', event.pageX + 'px')
            .style('top', event.pageY + 'px');
    });

// Close the popup when clicking outside
d3.select('body').on('click', function(event) {
    if (!event.target.closest('.reason') && !event.target.closest('.popup')) {
        d3.select('#popup').style('display', 'none');
    }
});

// Close popup button function
function closePopup() {
    d3.select('#popup').style('display', 'none');
}
