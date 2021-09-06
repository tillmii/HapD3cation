const CSV = require('csv-string');

function compile(specification) {
    let jsonSpec = specification;

    let patternTypes = [
        {
            texture: {
                type: "lines",
                value: 1,
                rotation: 45
            }
        },
        {
            texture: {
                type: "lines",
                value: 1,
                rotation: 135
            }
        },
        {
            texture: {
                type: "stair_pattern",
                value: 1
            }
        },
        {
            texture: {
                type: "roughness",
                value: 2
            }
        },
        {
            texture: {
                type: "grid_pattern",
                value: 3
            }
        },
        {
            texture: {
                type: "dashed_double_lines",
                value: 1
            }
        },
        {
            texture: {
                type: "lines",
                value: 1,
                rotation: 0
            }
        },
        {
            texture: {
                type: "lines",
                value: 1,
                rotation: 90
            }
        },
    ];

    let data = CSV.parse(jsonSpec.data.values);
    // Get first row from csv as array
    let dataHeader = data.splice(0, 1)[0];

    let maxHeight = jsonSpec.encoding.z.scale.maxHeight;
    let indicatorValue = jsonSpec.encoding.z.scale.indicatorValue;

    let textureType = jsonSpec.encoding.texture.type;

    let xAxisField = jsonSpec.encoding.x.field;
    let yAxisField = jsonSpec.encoding.y.field;
    let zAxisField = jsonSpec.encoding.z.field;
    let textureField = jsonSpec.encoding.texture.field;

    let xAxisFieldPos = dataHeader.indexOf(xAxisField);
    let yAxisFieldPos = dataHeader.indexOf(yAxisField);
    let zAxisFieldPos = dataHeader.indexOf(zAxisField);
    let roughnessFieldPos = dataHeader.indexOf(textureField);

    let xAxisValues = [];
    let yAxisValues = [];
    let textureValues = [];

    data.forEach((item, index, array) => {
        if (!xAxisValues.includes(item[xAxisFieldPos])) {
            xAxisValues.push(item[xAxisFieldPos]);
        }
        if (!yAxisValues.includes(item[yAxisFieldPos])) {
            yAxisValues.push(item[yAxisFieldPos]);
        }
        if (!textureValues.includes(item[roughnessFieldPos])) {
            textureValues.push(item[roughnessFieldPos]);
        }
    })

    let xAxisCount = xAxisValues.length;
    let yAxisCount = yAxisValues.length;

    // Get the Value of the tallest bar in the chart -> maxValue
    let maxValue = 0;
    xAxisValues.forEach((xItem, xIndex, xArray) => {
        yAxisValues.forEach((yItem, yIndex, yArray) => {
            let barValue = 0;
            textureValues.forEach((textureItem, textureIndex, textureArray) => {
                data.forEach((dataItem, dataIndex, dataArray) => {
                    if (dataItem.includes(xItem) && dataItem.includes(yItem) && dataItem.includes(textureItem)) {
                        barValue += parseFloat(dataItem[zAxisFieldPos]);
                    }
                })
            })
            if (barValue > maxValue) {
                maxValue = barValue;
            }
        })
    })

    // Factor to get the desired heights from the given values by multiplying
    let factor = maxHeight / maxValue;

    let jscadSpec = {};

    jscadSpec.legend_x = xAxisValues;
    jscadSpec.legend_y = yAxisValues;

    jscadSpec.external_legend = {};
    jscadSpec.external_legend.title = jsonSpec.title;
    jscadSpec.external_legend.list = [];

    // Data for the external legend
    textureValues.forEach((textureItem, textureIndex, textureArray) => {
        switch (textureType) {
            case "nominal":
                let row = patternTypes[textureIndex];
                row.label = textureItem;
                jscadSpec.external_legend.list.push(row);
                break;
            case "ordinal":
                jscadSpec.external_legend.list.push(
                    {
                        texture: {
                            type: "roughness",
                            value: 2 + textureIndex * 2
                        },
                        label: textureItem
                    }
                );
                break;
            default:
                console.log(textureType + " is no valid texture type!")
                break;
        }
    });

    // Data for the Haptification
    jscadSpec.bars = []
    xAxisValues.forEach((xItem, xIndex, xArray) => {
        jscadSpec.bars.push([]);
        yAxisValues.forEach((yItem, yIndex, yArray) => {
            jscadSpec.bars[xIndex].push([]);
            let barSpec = [];
            textureValues.forEach((textureItem, textureIndex, textureArray) => {
                data.forEach((dataItem, dataIndex, dataArray) => {
                    if (dataItem.includes(xItem) && dataItem.includes(yItem) && dataItem.includes(textureItem)) {
                        let barSegmentSpec = {};
                        barSegmentSpec.height = Math.round(dataItem[zAxisFieldPos] * factor);
                        // if (barSegmentSpec.height < 4) {
                        //     barSegmentSpec.height = 4;
                        // }
                        switch (textureType) {
                            case "nominal":
                                barSegmentSpec.texture = patternTypes[textureIndex].texture;
                                break;
                            case "ordinal":
                                barSegmentSpec.texture =
                                {
                                    "type": "roughness",
                                    "value": 2 + textureIndex * 2,
                                }
                                break;
                            default:
                                console.log(textureType + " is no valid texture type!")
                                break;
                        }
                        barSpec.push(barSegmentSpec);
                    }
                })
            })
            jscadSpec.bars[xIndex][yIndex] = barSpec;
        })
    })

    jscadSpec.indicator_dist = Math.round(indicatorValue * factor);
    jscadSpec.base_size = {"x": xAxisCount, "y": yAxisCount};

    console.log(JSON.stringify(jscadSpec, null, 4));

    return jscadSpec;
}

module.exports = {compile}