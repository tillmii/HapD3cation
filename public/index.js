const TEST_DATA = [
    { name: "Person_1", age: "17", height: "1.80", weight: "61", gender: "male" },
    { name: "Person_2", age: "23", height: "1.87", weight: "93", gender: "female" },
    { name: "Person_3", age: "35", height: "1.65", weight: "69", gender: "male" },
    { name: "Person_4", age: "42", height: "1.90", weight: "75", gender: "diverse" },
];

const COVID_DATA = [
    { country: "Germany", fullyVaccinated: "20700000", confirmedCases: "3720000", confirmedDeaths: "89693" },
    { country: "Italy", fullyVaccinated: "13720000", confirmedCases: "4240000", confirmedDeaths: "126855" },
    { country: "France", fullyVaccinated: "13700000", confirmedCases: "5790000", confirmedDeaths: "110432" },
    { country: "Spain", fullyVaccinated: "12250000", confirmedCases: "3730000", confirmedDeaths: "80465" },
];

const xScale = d3.scaleBand()
    .domain(COVID_DATA.map((dataPoint) => dataPoint.country))
    .rangeRound([0, 500])
    .padding(0.1);

const yScale = d3.scaleLinear()
    .domain([0, 21000000])
    .range([500, 0]);

const container = d3.select('svg')
    .classed('container', true);

const bars = container
    .selectAll('.bar')
    .data(COVID_DATA)
    .enter()
    .append('rect')
    .classed('bar', true)
    .attr('width', xScale.bandwidth())
    .attr('height', (data) => 500 - yScale(data.fullyVaccinated))
    .attr('x', data => xScale(data.country))
    .attr('y', data => yScale(data.fullyVaccinated));