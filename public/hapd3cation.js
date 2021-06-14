// const TEST_DATA = [
//     { name: "Person_1", age: "17", height: "1.80", weight: "61", gender: "male" },
//     { name: "Person_2", age: "23", height: "1.87", weight: "93", gender: "female" },
//     { name: "Person_3", age: "35", height: "1.65", weight: "69", gender: "male" },
//     { name: "Person_4", age: "42", height: "1.90", weight: "75", gender: "diverse" },
// ];

const COVID_DATA = [
    {country: "Germany", fullyVaccinated: "20700000", confirmedCases: "3720000", confirmedDeaths: "89693"},
    {country: "Italy", fullyVaccinated: "13720000", confirmedCases: "4240000", confirmedDeaths: "126855"},
    {country: "France", fullyVaccinated: "13700000", confirmedCases: "5790000", confirmedDeaths: "110432"},
    {country: "Spain", fullyVaccinated: "12250000", confirmedCases: "3730000", confirmedDeaths: "80465"},
];

const COVID_DATA_2 = [
    {
        key: "Germany",
        values: [
            {key: "fullyVaccinated", value: "20700000"},
            {key: "confirmedCases", value: "3720000"},
            {key: "confirmedDeaths", value: "89693"}
        ]
    },
    {
        key: "Italy",
        values: [
            {key: "fullyVaccinated", value: "13720000"},
            {key: "confirmedCases", value: "4240000"},
            {key: "confirmedDeaths", value: "126855"}
        ]
    },
    {
        key: "France",
        values: [
            {key: "fullyVaccinated", value: "13700000"},
            {key: "confirmedCases", value: "5790000"},
            {key: "confirmedDeaths", value: "110432"}
        ]
    },
    {
        key: "Spain",
        values: [
            {key: "fullyVaccinated", value: "12250000"},
            {key: "confirmedCases", value: "3730000"},
            {key: "confirmedDeaths", value: "80465"}
        ]
    }
];

const xScale = d3.scaleBand()
    .domain(COVID_DATA.map((dataPoint) => dataPoint.country))
    .rangeRound([0, 500])
    .padding(0.1);

const yScale = d3.scaleLinear()
    .domain([0, 21000000])
    .range([500, 0]);

const scene = d3.select('scene');

const group = scene
    .append('group');

const transform = group
    .selectAll('transform')
    .data(COVID_DATA)
    .enter()
    .append('transform')
    .attr('scale', (data => "100, " + (500 - yScale(data.fullyVaccinated)) + ", 100"))
    .attr('translation', data => xScale(data.country) + ", " + ((500 - yScale(data.fullyVaccinated)) / 2) + ", 0");

const shape = transform
    .append('shape');

const appearance = shape
    .append('appearance')
    .append('material')
    .attr('diffuseColor', '0.54, 0.17, 0.89');

const box = shape
    .append('box')
    .attr('size', '1, 1, 1');

const viewpoint = scene
    .append('viewpoint')
    .attr('viewall', 'true');