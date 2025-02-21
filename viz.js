// ------------------------------------------------------------
// 1. Set up global variables
// ------------------------------------------------------------
let raceData = [];
let stateData = [];
let currentData = [];  // whichever data is currently in the pie chart

// Dimensions for the pie chart
const width = 400;
const height = 400;
const margin = 20;
const radius = Math.min(width, height) / 2 - margin;

// Create an SVG inside #chart
const svg = d3
  .select("#chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  // Move everything to the center
  .attr("transform", `translate(${width / 2}, ${height / 2})`);

// Create a color scale
const color = d3.scaleOrdinal(d3.schemeCategory10);

// The pie and arc generators
const pie = d3
  .pie()
  .sort(null)
  .value(d => d.value);

const arc = d3
  .arc()
  .innerRadius(0)
  .outerRadius(radius);

// ------------------------------------------------------------
// 2. Load CSV data and compute counts
// ------------------------------------------------------------
d3.csv("dummydata.csv").then(data => {
  /*
    Each row has:
      Race: e.g. "White"
      State: e.g. "California"
    We'll count how many times each unique Race appears,
    and how many times each unique State appears.
  */
  
  const raceCounts = {};
  const stateCounts = {};

  data.forEach(row => {
    const race = row.Race;
    const state = row.State;

    // Count this Race
    if (raceCounts[race]) {
      raceCounts[race]++;
    } else {
      raceCounts[race] = 1;
    }

    // Count this State
    if (stateCounts[state]) {
      stateCounts[state]++;
    } else {
      stateCounts[state] = 1;
    }
  });

  // Convert raceCounts -> raceData (array)
  raceData = Object.keys(raceCounts).map(r => ({
    label: r,
    value: raceCounts[r]
  }));

  // Convert stateCounts -> stateData (array)
  stateData = Object.keys(stateCounts).map(s => ({
    label: s,
    value: stateCounts[s]
  }));

  // Initially, show the Race distribution
  currentData = raceData;
  drawPie(currentData);
});

// ------------------------------------------------------------
// 3. Draw or update the pie chart
// ------------------------------------------------------------
function drawPie(data) {
  // Use d3.pie() to transform our data into arcs
  const arcs = pie(data);

  // Join arcs to path elements
  const paths = svg.selectAll("path").data(arcs, d => d.data.label);

  // ENTER + UPDATE
  paths
    .enter()
    .append("path")
    .attr("fill", d => color(d.data.label))
    .attr("stroke", "#fff")
    .attr("stroke-width", 2)
    .each(function(d) {
      // Store the current angles so we can animate from/to them
      this._current = d;
    })
    .merge(paths)
    .transition()
    .duration(750)
    .attrTween("d", arcTween);

  // EXIT
  paths.exit().remove();

  // Labels (optional)
  const texts = svg.selectAll("text.label").data(arcs, d => d.data.label);

  // ENTER + UPDATE
  texts
    .enter()
    .append("text")
    .attr("class", "label")
    .attr("text-anchor", "middle")
    .attr("dy", "0.35em")
    .each(function(d) {
      this._current = d;
    })
    .merge(texts)
    .transition()
    .duration(750)
    .attr("transform", d => `translate(${arc.centroid(d)})`)
    .tween("text", function(d) {
      // Optional numeric interpolation
      const self = this;
      const i = d3.interpolateNumber(
        parseFloat(self.textContent) || 0,
        d.data.value
      );
      return function(t) {
        // Display label (and optionally the count)
        d3.select(self).text(d.data.label);
        // If you want the count: 
        // d3.select(self).text(`${d.data.label} (${Math.round(i(t))})`);
      };
    });

  // EXIT
  texts.exit().remove();
}

// ------------------------------------------------------------
// 4. Arc Tween for transitions
// ------------------------------------------------------------
function arcTween(d) {
  // Interpolate from the old angle to the new angle
  const i = d3.interpolate(this._current, d);
  this._current = i(0);
  return function(t) {
    return arc(i(t));
  };
}

// ------------------------------------------------------------
// 5. Buttons to toggle Race/State data
// ------------------------------------------------------------
document.getElementById("race-btn").addEventListener("click", () => {
  currentData = raceData;
  drawPie(currentData);
});

document.getElementById("state-btn").addEventListener("click", () => {
  currentData = stateData;
  drawPie(currentData);
});