let exampleSpecification = {
    "$schema": "https://hapd3cation.tillmii.de/public/hapd3cationSchema.json",
    "description": "Das folgende Diagramm enthält alle Impfungen bis zum einschließlich 07. Juli 2021 aus 8 verschiedenen Bundesländern. Die Säulen in der hinteren Reihe (1) enthalten die Zahlen aller mindestens einmal geimpften Personen. Die Säulen in der vorderen Reihe (2) enthalten die Zahlen aller vollständig geimpften Personen. Die Höhe jeder Säule repräsentiert die Anzahl der Menschen, die geimpft wurden. Weiterhin ist jede Säule in 2 Abschnitte unterteilt: Der untere Abschnitt ist weniger rau und repräsentiert alle geimpften Personen unter 60 Jahren, der ober Abschnitt ist stärker angeraut und repräsentiert alle geimpften Personen, welche 60 Jahre oder älter sind. Die Bundesländer treten von links nach rechts in folgender Reihenfolge auf: Berlin (BE), Brandenburg (BB), Hessen (HE), Rheinland-Pfalz (RP), Sachsen (SN), Sachsen-Anhalt (ST), Schleswig-Holstein (SH), Thüringen (TH). An den Seiten jeder Säule befinden sich Markierungen. Diese haben jeweils einen Abstand von einem Zentimeter. Jeder Abschnitt repräsentiert ca. 350000 Personen.",
    "data": {
        "values": "Bundesland,Alter,Anzahl,Impfstatus\nBE,bis_59,1249009,E\nBB,bis_59,646375,E\nHE,bis_59,2014537,E\nRP,bis_59,1279323,E\nSN,bis_59,952460,E\nST,bis_59,534312,E\nSH,bis_59,973072,E\nTH,bis_59,539266,E\nBE,ab_60,770509,E\nBB,ab_60,636215,E\nHE,ab_60,1436865,E\nRP,ab_60,1032644,E\nSN,ab_60,992991,E\nST,ab_60,600911,E\nSH,ab_60,753526,E\nTH,ab_60,563912,E\nBE,bis_59,772856,V\nBB,bis_59,414875,V\nHE,bis_59,1386409,V\nRP,bis_59,822881,V\nSN,bis_59,719440,V\nST,bis_59,356159,V\nSH,bis_59,614200,V\nTH,bis_59,365282,V\nBE,ab_60,674991,V\nBB,ab_60,518952,V\nHE,ab_60,1095244,V\nRP,ab_60,805295,V\nSN,ab_60,849376,V\nST,ab_60,504089,V\nSH,ab_60,615654,V\nTH,ab_60,460187,V\n",
        "format": {
            "type": "csv"
        }
    },
    "mark": "bar",
    "encoding": {
        "x": {"field": "Bundesland", "type": "nominal"},
        "y": {"field": "Impfstatus", "type": "nominal"},
        "z": {"field": "Anzahl", "type": "quantitative", "scale": {"maxHeight": "100", "indicatorValue": "350000"}},
        "texture": {"field": "Alter", "type": "ordinal"}
    }
}

let diagram_data = {
    legend_x: [
        "BE",
        "BB",
        "HE",
        "RP",
        "SN",
        "ST",
        "SH",
        "TH",
    ],
    legend_y: [
        "V",
        "E"
    ],
    bars:
        [ // [x][y]
            [
                [
                    {
                        height: 20,
                        texture: {
                            type: "roughness",
                            value: 1
                        }
                    },
                    {
                        height: 30,
                        texture: {
                            type: "roughness",
                            value: 5
                        }
                    },
                    {
                        height: 10,
                        texture: {
                            type: "roughness",
                            value: 2
                        }
                    },
                    {
                        height: 20,
                        texture: {
                            type: "roughness",
                            value: 4
                        }
                    }

                ],
                [
                    {
                        height: 10,
                        texture: {
                            type: "roughness",
                            value: 1
                        }
                    },
                    {
                        height: 25,
                        texture: {
                            type: "roughness",
                            value: 5
                        }
                    },
                    {
                        height: 20,
                        texture: {
                            type: "roughness",
                            value: 2
                        }
                    },
                    {
                        height: 15,
                        texture: {
                            type: "roughness",
                            value: 4
                        }
                    }

                ],
            ],
            [
                [
                    {
                        height: 10,
                        texture: {
                            type: "roughness",
                            value: 1
                        }
                    },
                    {
                        height: 5,
                        texture: {
                            type: "roughness",
                            value: 5
                        }
                    },
                    {
                        height: 42,
                        texture: {
                            type: "roughness",
                            value: 2
                        }
                    },
                    {
                        height: 7,
                        texture: {
                            type: "roughness",
                            value: 4
                        }
                    }

                ],
                [
                    {
                        height: 28,
                        texture: {
                            type: "roughness",
                            value: 1
                        }
                    },
                    {
                        height: 21,
                        texture: {
                            type: "roughness",
                            value: 5
                        }
                    },
                    {
                        height: 5,
                        texture: {
                            type: "roughness",
                            value: 2
                        }
                    },
                    {
                        height: 14,
                        texture: {
                            type: "roughness",
                            value: 4
                        }
                    }

                ],
            ],
            [
                [
                    {
                        height: 5,
                        texture: {
                            type: "roughness",
                            value: 1
                        }
                    },
                    {
                        height: 47,
                        texture: {
                            type: "roughness",
                            value: 5
                        }
                    },
                    {
                        height: 7,
                        texture: {
                            type: "roughness",
                            value: 2
                        }
                    },
                    {
                        height: 8,
                        texture: {
                            type: "roughness",
                            value: 4
                        }
                    }

                ],
                [
                    {
                        height: 28,
                        texture: {
                            type: "roughness",
                            value: 1
                        }
                    },
                    {
                        height: 16,
                        texture: {
                            type: "roughness",
                            value: 5
                        }
                    },
                    {
                        height: 17,
                        texture: {
                            type: "roughness",
                            value: 2
                        }
                    },
                    {
                        height: 25,
                        texture: {
                            type: "roughness",
                            value: 4
                        }
                    }

                ],
            ]
        ],
    indicator_dist: 10,
    base_size: {x: 8, y: 2}
}

module.exports = { exampleSpecification }