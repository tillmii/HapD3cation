const CSV = require('csv-string');
// const exampleSpecification = require('./ExampleSpecification');

function compile(specification) {

    // console.log(exampleSpecification)

    // specification = JSON.stringify(exampleSpecification);

    let jsonSpec = null;

    try {
        jsonSpec = specification
    } catch(e) {
        return false;
    }

    let data = CSV.parse(jsonSpec.data.values);
    // Get first row from csv as array
    let dataHeader = data.splice(0, 1)[0];

    let maxHeight = jsonSpec.encoding.z.scale.maxHeight;
    let indicatorValue = jsonSpec.encoding.z.scale.indicatorValue;

    let xAxisField = jsonSpec.encoding.x.field;
    let yAxisField = jsonSpec.encoding.y.field;
    let zAxisField = jsonSpec.encoding.z.field;
    let textureField = jsonSpec.encoding.texture.field;

    let xAxisFieldPos = dataHeader.indexOf(xAxisField);
    let yAxisFieldPos = dataHeader.indexOf(yAxisField);
    let zAxisFieldPos = dataHeader.indexOf(zAxisField);
    let roughnessFieldPos = dataHeader.indexOf(textureField);

    let xAxisValues = []
    let yAxisValues = []
    //let zAxisValues = []
    let roughnessValues = []

    data.forEach((item, index, array) => {
        if (!xAxisValues.includes(item[xAxisFieldPos])) {
            xAxisValues.push(item[xAxisFieldPos]);
        }
        if (!yAxisValues.includes(item[yAxisFieldPos])) {
            yAxisValues.push(item[yAxisFieldPos]);
        }
        //zAxisValues.push(item[zAxisFieldPos]);
        if (!roughnessValues.includes(item[roughnessFieldPos])) {
            roughnessValues.push(item[roughnessFieldPos]);
        }
    })

    // Get the Value of the tallest bar in the chart
    let maxValue = 0;
    xAxisValues.forEach((xItem, xIndex, xArray) => {
        yAxisValues.forEach((yItem, yIndex, yArray) => {
            let barValue = 0;
            roughnessValues.forEach((roughnessItem, roughnessIndex, roughnessArray) => {
                data.forEach((dataItem, dataIndex, dataArray) => {
                    if (dataItem.includes(xItem) && dataItem.includes(yItem) && dataItem.includes(roughnessItem)) {
                        console.log(dataItem[zAxisFieldPos])
                        barValue += parseFloat(dataItem[zAxisFieldPos]);
                    }
                })
            })
            if (barValue > maxValue) {
                console.log("Bar Value:")
                console.log(barValue);
                maxValue = barValue;
            }
        })
    })

    // console.log(maxValue);
    //maxValue = 3451402;

    let factor = maxHeight / maxValue;

    let xAxisCount = xAxisValues.length;
    let yAxisCount = yAxisValues.length;
    // let zAxisCount = zAxisValues.length;
    // let roughnessCount = roughnessValues.length;

    // console.log(xAxisValues.toString());
    // console.log(yAxisValues.toString());
    // console.log(zAxisValues.toString());
    // console.log(roughnessValues.toString());

    let jscadSpec = {};

    jscadSpec.legend_x = xAxisValues;
    jscadSpec.legend_y = yAxisValues;

    console.log(JSON.stringify(jsonSpec, null, 4));

    jscadSpec.external_legend = {};
    jscadSpec.external_legend.title = jsonSpec.title;
    jscadSpec.external_legend.list = [];

    roughnessValues.forEach((roughnessItem, roughnessIndex, roughnessArray) => {
        jscadSpec.external_legend.list.push(
            {
                texture: {
                    type: "roughness",
                    value: 2 + roughnessIndex * 2
                },
                label: roughnessItem
            }
        );
    });

    jscadSpec.bars = []
    xAxisValues.forEach((xItem, xIndex, xArray) => {
        jscadSpec.bars.push([]);
        yAxisValues.forEach((yItem, yIndex, yArray) => {
            jscadSpec.bars[xIndex].push([]);
            let barSpec = [];
            roughnessValues.forEach((roughnessItem, roughnessIndex, roughnessArray) => {
                data.forEach((dataItem, dataIndex, dataArray) => {
                    if (dataItem.includes(xItem) && dataItem.includes(yItem) && dataItem.includes(roughnessItem)) {
                        let barSegmentSpec = {
                            "height": Math.round(dataItem[zAxisFieldPos] * factor),
                            "texture": {
                                "type": "roughness",
                                "value": 2 + roughnessIndex * 2,
                            }
                        }
                        barSpec.push(barSegmentSpec);
                    }
                })
            })
            jscadSpec.bars[xIndex][yIndex] = barSpec;
        })
    })

    jscadSpec.indicator_dist =  Math.round(indicatorValue * factor);
    jscadSpec.base_size = {"x": xAxisCount, "y": yAxisCount};

    // console.log(JSON.stringify(jscadSpec));

    return jscadSpec;
}

function getHeight(value, maxHeight, indicatorValue) {
    return Math.round(value / indicatorValue * maxHeight);
}

module.exports = { compile }