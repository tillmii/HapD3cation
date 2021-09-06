const {cube, cuboid, polygon, cylinder, polyhedron} = require('@jscad/modeling').primitives
const {
    center,
    rotate,
    translate,
    mirror,
    mirrorX,
    mirrorY,
    mirrorZ,
    rotateX,
    rotateY,
    rotateZ
} = require('@jscad/modeling').transforms
const {union, subtract, intersect} = require('@jscad/modeling').booleans
const {extrudeLinear, extrudeFromSlices} = require('@jscad/modeling').extrusions
const {create} = require('@jscad/modeling').geometries.geom3;

const modeling = require('@jscad/modeling')

let tolerance = 0.2;

let base_thickness = 5;

let bar_width = 15;
let bar_spacing = 15;
let bar_socket_width = 7;
let bar_socket_height = 3;
let bar_socket_tolerance = tolerance;

let joint_spacing = 30;
let joint_width = 5;
let joint_depth = 5;
let joint_height = 3;
let joint_tolerance = tolerance;

let braille = {
    'A': 0b100000,
    'B': 0b110000,
    'C': 0b100100,
    'D': 0b100110,
    'E': 0b100010,
    'F': 0b110100,
    'G': 0b110110,
    'H': 0b110010,
    'I': 0b10100,
    'J': 0b10110,
    'K': 0b101000,
    'L': 0b111000,
    'M': 0b101100,
    'N': 0b101110,
    'O': 0b101010,
    'P': 0b111100,
    'Q': 0b111110,
    'R': 0b111010,
    'S': 0b11100,
    'T': 0b11110,
    'U': 0b101001,
    'V': 0b111001,
    'W': 0b10111,
    'X': 0b101101,
    'Y': 0b101111,
    'Z': 0b101011,
    '#': 0b001111,
    '0': 0b001011,
    '1': 0b010000,
    '2': 0b011000,
    '3': 0b010010,
    '4': 0b010011,
    '5': 0b010001,
    '6': 0b011010,
    '7': 0b011011,
    '8': 0b011001,
    '9': 0b001010
}

let diagram_data = {
    "legend_x": [
        "Montag",
        "Dienstag",
        "Mittwoch",
        "Donnerstag",
        "Freitag",
        "Samstag",
        "Sonntag"
    ],
    "legend_y": [
        "a"
    ],
    "external_legend": {
        "title": "Screentime",
        "list": [
            {
                "texture": {
                    "type": "lines",
                    "value": 1,
                    "rotation": 45
                },
                "label": "Sonstiges"
            },
            {
                "texture": {
                    "type": "lines",
                    "value": 1,
                    "rotation": 135
                },
                "label": "Videos"
            },
            {
                "texture": {
                    "type": "stair_pattern",
                    "value": 1
                },
                "label": "Messenger"
            },
            {
                "texture": {
                    "type": "roughness",
                    "value": 2
                },
                "label": "Dating"
            },
            {
                "texture": {
                    "type": "grid_pattern",
                    "value": 3
                },
                "label": "Tools"
            },
            {
                "texture": {
                    "type": "dashed_double_lines",
                    "value": 1
                },
                "label": "Musik"
            },
            {
                "texture": {
                    "type": "lines",
                    "value": 1,
                    "rotation": 0
                },
                "label": "Spiele"
            }
        ]
    },
    "bars": [
        [
            [
                {
                    "height": 24,
                    "texture": {
                        "type": "lines",
                        "value": 1,
                        "rotation": 45
                    }
                },
                {
                    "height": 6,
                    "texture": {
                        "type": "lines",
                        "value": 1,
                        "rotation": 135
                    }
                },
                {
                    "height": 6,
                    "texture": {
                        "type": "stair_pattern",
                        "value": 1
                    }
                },
                {
                    "height": 2,
                    "texture": {
                        "type": "roughness",
                        "value": 2
                    }
                },
                {
                    "height": 6,
                    "texture": {
                        "type": "grid_pattern",
                        "value": 3
                    }
                },
                {
                    "height": 2,
                    "texture": {
                        "type": "dashed_double_lines",
                        "value": 1
                    }
                },
                {
                    "height": 3,
                    "texture": {
                        "type": "lines",
                        "value": 1,
                        "rotation": 0
                    }
                }
            ]
        ],
        [
            [
                {
                    "height": 48,
                    "texture": {
                        "type": "lines",
                        "value": 1,
                        "rotation": 45
                    }
                },
                {
                    "height": 21,
                    "texture": {
                        "type": "lines",
                        "value": 1,
                        "rotation": 135
                    }
                },
                {
                    "height": 18,
                    "texture": {
                        "type": "stair_pattern",
                        "value": 1
                    }
                },
                {
                    "height": 3,
                    "texture": {
                        "type": "roughness",
                        "value": 2
                    }
                },
                {
                    "height": 4,
                    "texture": {
                        "type": "grid_pattern",
                        "value": 3
                    }
                },
                {
                    "height": 3,
                    "texture": {
                        "type": "dashed_double_lines",
                        "value": 1
                    }
                },
                {
                    "height": 1,
                    "texture": {
                        "type": "lines",
                        "value": 1,
                        "rotation": 0
                    }
                }
            ]
        ],
        [
            [
                {
                    "height": 17,
                    "texture": {
                        "type": "lines",
                        "value": 1,
                        "rotation": 45
                    }
                },
                {
                    "height": 5,
                    "texture": {
                        "type": "lines",
                        "value": 1,
                        "rotation": 135
                    }
                },
                {
                    "height": 6,
                    "texture": {
                        "type": "stair_pattern",
                        "value": 1
                    }
                },
                {
                    "height": 5,
                    "texture": {
                        "type": "roughness",
                        "value": 2
                    }
                },
                {
                    "height": 2,
                    "texture": {
                        "type": "grid_pattern",
                        "value": 3
                    }
                },
                {
                    "height": 1,
                    "texture": {
                        "type": "dashed_double_lines",
                        "value": 1
                    }
                },
                {
                    "height": 1,
                    "texture": {
                        "type": "lines",
                        "value": 1,
                        "rotation": 0
                    }
                }
            ]
        ],
        [
            [
                {
                    "height": 21,
                    "texture": {
                        "type": "lines",
                        "value": 1,
                        "rotation": 45
                    }
                },
                {
                    "height": 14,
                    "texture": {
                        "type": "lines",
                        "value": 1,
                        "rotation": 135
                    }
                },
                {
                    "height": 7,
                    "texture": {
                        "type": "stair_pattern",
                        "value": 1
                    }
                },
                {
                    "height": 2,
                    "texture": {
                        "type": "roughness",
                        "value": 2
                    }
                },
                {
                    "height": 3,
                    "texture": {
                        "type": "grid_pattern",
                        "value": 3
                    }
                },
                {
                    "height": 2,
                    "texture": {
                        "type": "dashed_double_lines",
                        "value": 1
                    }
                },
                {
                    "height": 1,
                    "texture": {
                        "type": "lines",
                        "value": 1,
                        "rotation": 0
                    }
                }
            ]
        ],
        [
            [
                {
                    "height": 31,
                    "texture": {
                        "type": "lines",
                        "value": 1,
                        "rotation": 45
                    }
                },
                {
                    "height": 6,
                    "texture": {
                        "type": "lines",
                        "value": 1,
                        "rotation": 135
                    }
                },
                {
                    "height": 12,
                    "texture": {
                        "type": "stair_pattern",
                        "value": 1
                    }
                },
                {
                    "height": 1,
                    "texture": {
                        "type": "roughness",
                        "value": 2
                    }
                },
                {
                    "height": 7,
                    "texture": {
                        "type": "grid_pattern",
                        "value": 3
                    }
                },
                {
                    "height": 1,
                    "texture": {
                        "type": "dashed_double_lines",
                        "value": 1
                    }
                },
                {
                    "height": 1,
                    "texture": {
                        "type": "lines",
                        "value": 1,
                        "rotation": 0
                    }
                }
            ]
        ],
        [
            [
                {
                    "height": 41,
                    "texture": {
                        "type": "lines",
                        "value": 1,
                        "rotation": 45
                    }
                },
                {
                    "height": 14,
                    "texture": {
                        "type": "lines",
                        "value": 1,
                        "rotation": 135
                    }
                },
                {
                    "height": 10,
                    "texture": {
                        "type": "stair_pattern",
                        "value": 1
                    }
                },
                {
                    "height": 1,
                    "texture": {
                        "type": "roughness",
                        "value": 2
                    }
                },
                {
                    "height": 4,
                    "texture": {
                        "type": "grid_pattern",
                        "value": 3
                    }
                },
                {
                    "height": 2,
                    "texture": {
                        "type": "dashed_double_lines",
                        "value": 1
                    }
                },
                {
                    "height": 1,
                    "texture": {
                        "type": "lines",
                        "value": 1,
                        "rotation": 0
                    }
                }
            ]
        ],
        [
            [
                {
                    "height": 27,
                    "texture": {
                        "type": "lines",
                        "value": 1,
                        "rotation": 45
                    }
                },
                {
                    "height": 8,
                    "texture": {
                        "type": "lines",
                        "value": 1,
                        "rotation": 135
                    }
                },
                {
                    "height": 15,
                    "texture": {
                        "type": "stair_pattern",
                        "value": 1
                    }
                },
                {
                    "height": 4,
                    "texture": {
                        "type": "roughness",
                        "value": 2
                    }
                },
                {
                    "height": 4,
                    "texture": {
                        "type": "grid_pattern",
                        "value": 3
                    }
                },
                {
                    "height": 1,
                    "texture": {
                        "type": "dashed_double_lines",
                        "value": 1
                    }
                },
                {
                    "height": 1,
                    "texture": {
                        "type": "lines",
                        "value": 1,
                        "rotation": 0
                    }
                }
            ]
        ]
    ],
    "indicator_dist": 4,
    "base_size": {
        "x": 7,
        "y": 1
    }
}


/**
 * Generate a joint pair in the origin
 * @param {boolean} socket   True for generating a socket (slightly larger) or false for generating a plug
 * @param {number} joint_spacing   Distance in mm fom one to the other joint, center to center
 * @param {number} joint_width   Width on the small side of the joint
 * @param {number} joint_depth   Depth of the joint
 * @param {number} joint_height   Height of the joint
 * @param {number} joint_tolerance   Tolerance added if generating a socket
 *
 * @return   CSG - pair of joints in the origin
 */
function joint(
    socket = false,
    joint_spacing = 30,
    joint_width = 5,
    joint_depth = 5,
    joint_height = 3,
    joint_tolerance = tolerance) {

    let height = socket ? joint_height + joint_tolerance : joint_height;
    let depth = socket ? joint_depth + joint_tolerance : joint_depth;
    let width = socket ? joint_width + joint_tolerance : joint_width;

    let obj = translate([-depth - width / 2, -depth, 0],
        polyhedron({
            points: [[0, 0, 0], [depth, depth, 0], [depth + width, depth, 0], [2 * depth + width, 0, 0],
                [0, 0, height], [depth, depth, height], [depth + width, depth, height], [2 * depth + width, 0, height]],
            faces: [[0, 1, 2], [0, 2, 3], [6, 5, 4], [7, 6, 4],
                [4, 1, 0], [5, 1, 4], [5, 2, 1], [6, 2, 5],
                [6, 3, 2], [6, 7, 3], [4, 0, 3], [7, 4, 3]],
            orientation: 'outward'
        }))


    // let obj = translate([-depth-width/2,-depth,0],
    //     (extrudeLinear({height: height},
    //         polygon({points: [
    //             [0,0],
    //             [depth,depth],
    //             [depth+width,depth],
    //             [2*depth+width,0]
    //         ]})
    //     )
    //     ));

    console.log((obj));
    console.log(modeling.geometries.geom3.isA(obj));

    return obj


}


/**
 * Generate a base plate for a bar diagram with joint plugs on the right and sockets on the left and bottom side
 * @param {number} base_size_x   Number of bar slots in x direction
 * @param {number} base_size_y   Number of bar slots in y direction
 *
 * @return   CSG - base plate, bottom left corner is in the origin
 */
function base(base_size_x = 4, base_size_y = 2) {


    let base_x = base_size_x * (bar_spacing + bar_width);
    let base_y = base_size_y * (bar_spacing + bar_width);
    console.log('base_x=' + base_x + '\nbase_y=' + base_y);
    console.log('base_x/2-joint_spacing/2=' + (base_x / 2 - joint_spacing / 2));
    let socket_holes = [];

    console.log("bar_socket_width=" + bar_socket_width + " | bar_socket_height=" + bar_socket_height);

    for (let x = 0; x < base_size_x; x++) {
        for (let y = 0; y < base_size_y; y++) {
            console.log("socket hole - x:" + x + " | y:" + y);
            socket_holes.push(
                translate([
                        (bar_spacing + bar_width) / 2 + x * (bar_spacing + bar_width),
                        (bar_spacing + bar_width) / 2 + y * (bar_spacing + bar_width),
                        base_thickness - bar_socket_height
                    ],

                    cuboid({
                        size: [bar_socket_width, bar_socket_width, bar_socket_height],
                        center: [0, 0, bar_socket_height / 2]
                    })
                )
            );
        }
    }


    console.log("Return base");
    return subtract(
        union(
            cuboid({size: [base_x, base_y, base_thickness], center: [base_x / 2, base_y / 2, base_thickness / 2]}),

            translate([base_x, base_y / 2 - joint_spacing / 2, 0],
                rotateZ(Math.PI / 2,
                    joint()
                )),


            translate([base_x, base_y / 2 + joint_spacing / 2, 0],
                rotateZ(Math.PI / 2,
                    joint()
                ))
        ),

        socket_holes,

        translate([0, base_y / 2 - joint_spacing / 2, 0],
            rotateZ(Math.PI / 2,
                joint(true)
            )),

        translate([0, base_y / 2 + joint_spacing / 2, 0],
            rotateZ(Math.PI / 2,
                joint(true)
            )),

        mirrorY(
            translate([base_x / 2 - joint_spacing / 2, 0, 0],
                joint(true)
            )),

        mirrorY(
            translate([base_x / 2 + joint_spacing / 2, 0, 0],
                joint(true)
            ))
    )


}

/**
 * Defines type and density of a texture
 * @typedef {Object} texture
 * @property {string} type   Type of the texture
 * @property {number} value   Texture specific value (density)
 * @property {number} rotation   Texture specific value (rotation)
 */

/**
 * Generate texture for a bar in a given type and size
 * @param {{type: string, value: number}} texture   Object defining the texture to generate
 * @param {number} height   Height of bar segment
 *
 * @return   CSG - texture
 */
function generate_texture(texture, height) {
    let texture_objects = [];
    let line_height = 0.3
    let line_thickness = 0.5
    switch (texture.type) {

        case "roughness":
        case "dotted_pattern":

            let dot_dist = 1 + texture.value * 0.5;
            let rows = Math.max(Math.floor(height / dot_dist), 1);
            let cols = Math.max(Math.floor(bar_width / dot_dist), 1);

            let border_x = (height - rows * dot_dist) * 0.5;
            let border_y = (bar_width - cols * dot_dist) * 0.5;

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < (cols - r % 2); c++) {
                    texture_objects.push(
                        translate([border_x + dot_dist / 2 + r * dot_dist, border_y + dot_dist / 2 + (r % 2 * dot_dist / 2 + c * dot_dist)],
                            cylinder({radius: 0.5, height: 0.3})
                        ))
                }
            }

            break;

        case "lines":


            let line_dist = 1.3 + texture.value * 0.5 + line_thickness / 2;
            let num_lines = Math.max(Math.floor(height / line_dist), 1);

            let border = (height - num_lines * line_dist) * 0.5

            num_lines *= 2

            for (let i = 0; i < num_lines; i++) {
                texture_objects.push(
                    cuboid({
                        size: [line_thickness, 1.5 * Math.max(bar_width, height), line_height],
                        center: [-height / 2 + border + i * line_dist, 0, line_height / 2]
                    })
                )
            }

            texture_objects = translate(
                [height / 2, bar_width / 2, 0],
                rotateZ(
                    texture.rotation * (Math.PI / 180),
                    texture_objects
                )
            )

            let intersection_body = cuboid({
                size: [height, bar_width, line_height],
                center: [height / 2, bar_width / 2, line_height / 2]
            })

            texture_objects = intersect(intersection_body, union(texture_objects))


            break;


        case "grid_pattern":

            texture_objects = union(
                generate_texture({type: "lines", value: texture.value, rotation: 0}, height),
                generate_texture({type: "lines", value: texture.value, rotation: 90}, bar_width)
            )

            break;

        case "dashed_double_lines":
            console.log("double_dashed_lines");
            let col_dist = 1.2 + texture.value * 0.5
            let row_dist = col_dist * 0.7

            let row_height = 2.5;
            let line_distance = 0.7;
            let line_width = 0.5;

            let col_size = line_distance + 2 * line_width + col_dist;
            let row_size = row_height + row_dist

            console.log("col_size=" + col_size + "  | row_size=" + row_size);

            let num_rows = Math.max(Math.floor(height / (row_size)), 1);
            let num_cols = Math.max(Math.floor(bar_width / (col_size)), 1);

            console.log("num_rows=" + num_rows + "  | num_cols=" + num_cols);

            let border_col = 0.5 * (bar_width - (col_size) * num_cols) + col_dist / 2
            let border_row = 0.5 * (height - (row_size) * num_rows) + row_dist / 2

            console.log("border_col=" + border_col + "  | border_row=" + border_row);

            for (let row = 0; row < num_rows; row++) {
                for (let col = 0; col < num_cols; col++) {

                    texture_objects.push(
                        translate([border_row + row * row_size, border_col + col * col_size, 0],
                            cuboid({
                                size: [row_height, line_width, line_height],
                                center: [row_height / 2, line_width / 2, line_height / 2]
                            })
                        )
                    )

                    texture_objects.push(
                        translate([border_row + row * row_size, border_col + col * col_size + line_width + line_distance, 0],
                            cuboid({
                                size: [row_height, line_width, line_height],
                                center: [row_height / 2, line_width / 2, line_height / 2]
                            })
                        )
                    )

                }
            }
            break;

        case "stair_pattern":

            let pattern_size = 1.3 + texture.value * 0.5 + line_thickness / 2;

            let num_x = Math.ceil(height / pattern_size)
            let num_y = Math.ceil(bar_width / pattern_size)

            for (let x = 0; x < num_x; x++) {
                for (let y = 0; y < num_y; y++) {

                    if (x % 2 == y % 2) {
                        texture_objects.push(
                            translate([x * pattern_size, y * pattern_size, 0],
                                cuboid({
                                    size: [line_thickness, pattern_size, line_height],
                                    center: [line_thickness / 2, pattern_size / 2, line_height / 2]
                                })
                            )
                        )
                    } else {
                        texture_objects.push(
                            translate([x * pattern_size, y * pattern_size, 0],
                                cuboid({
                                    size: [pattern_size, line_thickness, line_height],
                                    center: [pattern_size / 2, line_thickness / 2, line_height / 2]
                                })
                            )
                        )
                    }
                }
            }

            texture_objects = translate([0.5 * (height - num_x * pattern_size), 0.5 * (bar_width - num_y * pattern_size), 0], texture_objects)

            break;

    }

    let intersection_body = cuboid({
        size: [height, bar_width, line_height],
        center: [height / 2, bar_width / 2, line_height / 2]
    })

    texture_objects = intersect(intersection_body, union(texture_objects))

    return union(texture_objects)
}

/**
 * Generates a divider
 *
 * @return   CSG - divider
 */
function divider() {
    return union(
        translate([0, 0, 0.5],
            rotateX(-Math.PI / 2,
                cylinder({radius: 0.5, height: bar_width, center: [0, 0, bar_width / 2]})
            )),
        translate([-0.5, 0, 0],
            cuboid({
                size: [1, bar_width, 0.5],
                center: [0.5, bar_width / 2, 0.25]
            })
        )
    )
}

/**
 * Generates a indicator
 *
 * @return   CSG - indicator
 */
function indicator() {
    return rotateZ(Math.PI / 4,
        cuboid({
            size: [1, 1, bar_width + 5],
            center: [0, 0, (bar_width + 5) / 2]
        }))
}

/**
 * Defines size and texture of a bar segment
 * @typedef {Object} bar_segment
 * @property {number} height   Height of the segment
 * @property {texture} texture   Definition of the {@link texture}
 */

/**
 * Generate bar with given segments
 * @param {...bar_segment} params   Array of {@link bar_segment}
 * @param {number} indicator_dist   Distance of the indicators in mm
 * @param {boolean} center   Centers the bar in the origin
 *
 * @return   CSG - texture
 */
function bar(params, indicator_dist = 10, center = false) {
    let bar_object;

    let socket_width = bar_socket_width - bar_socket_tolerance;
    let socket_height = bar_socket_height - bar_socket_tolerance;

    let segments = [];
    let bar_height = 0;
    for (let i = 0; i < params.length; i++) {

        let param = params[i];
        if (param.height > 0) {
            console.log("height: " + param.height +
                "\nbar_height: " + bar_height);
            //let divider = bar_height ? (translate([bar_height,0,bar_width], divider())):[]

            let segment = union(translate([bar_height, 0, 0],
                    cuboid({
                        size: [param.height, bar_width, bar_width],
                        center: [param.height / 2, bar_width / 2, bar_width / 2]
                    })
                ),
                translate([bar_height, 0, bar_width], generate_texture(param.texture, param.height))
            )

            if (bar_height) {
                segment = union(
                    segment,
                    translate([bar_height, 0, bar_width], divider())
                )
            }


            segments.push(
                segment
            )
            bar_height += param.height;
        }
    }

    bar_object = union(
        translate([-socket_height, (bar_width - socket_width) / 2, (bar_width - socket_width) / 2],
            cuboid({
                size: [socket_height, socket_width, socket_width],
                center: [socket_height / 2, socket_width / 2, socket_width / 2]
            })
        ),
        segments)


    if (indicator_dist > 0) {
        let indicators = []

        for (let h = indicator_dist; h <= bar_height; h += indicator_dist) {
            indicators.push(
                translate([h, 0, 0], indicator())
            )
            indicators.push(
                translate([h, bar_width, 0], indicator())
            )
        }
        bar_object = subtract(bar_object, indicators);

    }

    if (center) {
        bar_object = translate([bar_width / 2, bar_width / 2, base_thickness],
            rotate([0, -Math.PI / 2, Math.PI / 2],
                bar_object))
    }

    return bar_object;
}

/**
 * Generates a single braille dot in the origin
 *
 * @return   CSG - braille dot
 */
function braille_dot() {
    return translate([0, 0, 0.3], cylinder({radius: 0.8, height: 0.6}))
}


/**
 * Generates braille dots for a single character
 * @param {string} char   Character
 *
 * @return   CSG - character in braille
 */
function braille_char(char = '') {
    char = char.toUpperCase();

    dots = []
    if (braille.hasOwnProperty(char)) {
        console.log(braille[char]);
        if (braille[char] & 0b100000) {
            dots.push(translate([1.25 + 0 * 2.5, 1.25 + 2 * 2.5, 0], braille_dot()))
        }
        if (braille[char] & 0b010000) {
            dots.push(translate([1.25 + 0 * 2.5, 1.25 + 1 * 2.5, 0], braille_dot()))
        }
        if (braille[char] & 0b001000) {
            dots.push(translate([1.25 + 0 * 2.5, 1.25 + 0 * 2.5, 0], braille_dot()))
        }
        if (braille[char] & 0b000100) {
            dots.push(translate([1.25 + 1 * 2.5, 1.25 + 2 * 2.5, 0], braille_dot()))
        }
        if (braille[char] & 0b000010) {
            dots.push(translate([1.25 + 1 * 2.5, 1.25 + 1 * 2.5, 0], braille_dot()))
        }
        if (braille[char] & 0b000001) {
            dots.push(translate([1.25 + 1 * 2.5, 1.25 + 0 * 2.5, 0], braille_dot()))
        }
    }
    return dots
}


/**
 * Generates braille for a given text
 * @param {string} text   Text to convert
 * @param {boolean} justify_left
 *
 * @return   CSG - braille text
 */
function braille_text(text = '', justify_left = false) {
    let chars = []
    let specialChars = 0;
    console.log('braile_text: ' + text + ' | justify_left=' + justify_left);
    for (let i = 0; i < text.length; i++) {
        if ((i == 0 && text[i].match(/^\d$/)) ||
            (text[i].match(/^\d$/) && !text[i - 1].match(/^\d$/))) {

            chars.push(
                translate([(i + specialChars) * 6, -3.75, 0], braille_char('#'))
            )
            specialChars++;
        }
        //console.log(text[i].toUpperCase() + ' - ' + braille.hasOwnProperty(text[i].toUpperCase()));
        if (braille.hasOwnProperty(text[i].toUpperCase())) {
            chars.push(
                translate([(i + specialChars) * 6, -3.75, 0], braille_char(text[i]))
            )
        }

    }

    console.log('chars-length:' + chars.length);

    if (!justify_left && chars.length > 0) {
        chars = translate([-(text.length + specialChars) * 6, 0, 0], chars)
    }


    return chars;
}


/**
 * Generates a braille legend plate
 * @param {number} size   Number of bars to label
 * @param {boolean} type_y   Is it a legend for y-axis?
 * @param {...string} data   Array of Strings to convert
 *
 * @return   CSG - legend plate
 */
function legend(size = 4, type_y = false, data = []) {
    let base_size = size * (bar_spacing + bar_width);


    max_text_length = 0;

    data.forEach(text => {
        max_text_length = Math.max(text.length, max_text_length)
    });

    max_text_length = max_text_length * 6 + 7
    let legend_obj = cuboid({
        size: [(type_y ? max_text_length : base_size), (type_y ? base_size : max_text_length), base_thickness],
        center: [(type_y ? -max_text_length : base_size) / 2, (type_y ? base_size : -max_text_length) / 2, base_thickness / 2]
    });


    let joints = union(
        translate([-joint_spacing / 2, 0, 0],
            rotateZ(Math.PI,
                joint()
            )),
        translate([joint_spacing / 2, 0, 0],
            rotateZ(Math.PI,
                joint()
            ))
    );
    if (!type_y) {
        joints = translate([base_size / 2, 0, 0], joints);
    } else {
        joints = translate([0, base_size / 2, 0], rotateZ(-Math.PI / 2, joints));
    }
    let texts = [];
    console.log('data:' + data.length);
    for (let i = 0; i < data.length; i++) {
        console.log("i=" + i + "\ndata[i]=" + data[i]);
        if (!type_y) {
            texts.push(
                translate([(bar_spacing + bar_width) / 2 + i * (bar_spacing + bar_width), -2, base_thickness],
                    rotateZ(Math.PI / 2,
                        braille_text(data[i])
                    )
                )
            );
        } else {
            texts.push(
                translate([-2, (bar_spacing + bar_width) / 2 + i * (bar_spacing + bar_width), base_thickness],

                    braille_text(data[i])
                )
            );
        }
    }
    console.log(texts.length);
    return union(legend_obj, joints, texts);

}

/**
 * Generates Terminator element in the origin with joint sockets
 * @param {number} width   Width of the terminator
 *
 * @return   CSG - terminator
 */
function terminator(width = 50) {
    let joints = [translate([-joint_spacing / 2, 0, 0],
        rotateZ(Math.PI,
            joint()
        )),
        translate([joint_spacing / 2, 0, 0],
            rotateZ(Math.PI,
                joint()
            ))]

    return subtract(
        cuboid({size: [8, width, base_thickness], center: [4, width / 2, base_thickness / 2]}),
        translate([0, width / 2, 0],
            rotateZ(-Math.PI / 2,
                joints
            )
        )
    )
}


/**
 * Generates a braille legend plate that doesn't connect to the diagram base. It contains a title and a list of labeled textures.
 * @param {Object} data   data object with title and array of textures and their labels
 *
 * @return   CSG - external legend plate
 */
function external_legend(data) {
    let elements = []
    let pos = 0
    let max_x = 0
    if (data.title) {
        let el = translate([10, -15 / 2, 0],
            braille_text(data.title, true)
        )

        elements.push(
            translate([0, -pos, base_thickness],
                el
            )
        )
        pos += 15
        max_x = Math.max(max_x, data.title.length * 6 + 20)
    }

    for (let i = 0; i < data.list.length; i++) {
        list_el = data.list[i];


        let texture = translate([5, -bar_width - 5, 0],
            generate_texture(list_el.texture, bar_width)
        )

        let text = translate([10 + bar_width, -(5 + (bar_width / 2)), 0],
            braille_text(list_el.label, true)
        )

        let el = union(texture, text)

        elements.push(
            translate([0, -pos, base_thickness],
                el
            )
        )
        max_x = Math.max(max_x, 10 + bar_width + list_el.label.length * 6 + 5);
        pos += 25
    }


    return union(
        cuboid({size: [max_x, pos, base_thickness], center: [max_x / 2, -pos / 2, base_thickness / 2]}),
        elements
    )
}


/**
 * Generates fully assembled diagram from a defined data structure
 * @param {Object} data
 *
 * @return   CSG - assembled diagram
 */
function assembly(data) {
    // console.dir(data);
    let size_x = data.bars.length;
    let size_y = data.bars[0].length;

    let bars = []

    for (let x = 0; x < size_x; x++) {
        for (let y = 0; y < size_y; y++) {
            let bar_obj = bar(data.bars[x][y], data.indicator_dist, true);

            if (y == size_y - 1) {
                bar_obj = rotateZ(Math.PI,
                    bar_obj
                )
            }


            bars.push(
                translate([(bar_spacing + bar_width) / 2 + x * (bar_spacing + bar_width), (bar_spacing + bar_width) / 2 + y * (bar_spacing + bar_width), 0],

                    bar_obj
                )
            )
        }
    }

    // split size to base segments
    let base_x = Math.max(2, data.base_size.x);
    let base_y = Math.max(2, data.base_size.y);


    let legends_x = []

    for (let i = 0; i < Math.ceil(size_x / base_x); i++) {
        legends_x.push(
            translate([base_x * i * (bar_spacing + bar_width), 0, 0],
                legend(base_x, false, data.legend_x.slice(i * base_x, i * base_x + base_x))
            )
        )
    }


    let legends_y = []
    for (let i = 0; i < Math.ceil(size_y / base_y); i++) {
        legends_x.push(
            translate([0, base_y * i * (bar_spacing + bar_width), 0],
                legend(base_y, true, data.legend_y.slice(i * base_y, i * base_y + base_y))
            )
        )
    }

    let bases = []
    for (let x = 0; x < Math.ceil(size_x / base_x); x++) {
        for (let y = 0; y < Math.ceil(size_y / base_y); y++) {
            bases.push(
                translate([base_x * x * (bar_spacing + bar_width), base_y * y * (bar_spacing + bar_width), 0],
                    base(base_x, base_y)
                )
            )
        }
    }

    let width_x = size_x * (bar_spacing + bar_width)
    let width_y = size_y * (bar_spacing + bar_width)

    let terminator_right = translate([width_x, 0, 0],
        terminator(width_y)
    )

    let external_leg = translate([width_x + 20, width_y, 0],
        external_legend(data.external_legend)
    )


    return translate([-width_x / 2, -width_y / 2, 0],
        [...bases, ...bars, ...legends_x, ...legends_y, terminator_right, external_leg]
    )
}

const main = () => {
    // return external_legend({
    //     title: 'Test',
    //     list: [
    //         {
    //             texture:{
    //                 type: "roughness",
    //                 value: 1
    //             },
    //             label: 'a123'
    //         },
    //         {
    //             texture:{
    //                 type: "roughness",
    //                 value: 3
    //             },
    //             label: 'c%f&hi'
    //         },
    //         {
    //             texture:{
    //                 type: "roughness",
    //                 value: 2
    //             },
    //             label: 'b'
    //         }
    //     ]
    // })


    return assembly(diagram_data)
    //return terminator(50);
    //return braille_text('test');
    //return legend(4,false,["Test","Test","Hallo","Welt"])


//   return generate_texture ({
//     type: "stair_pattern",
//     value: 0
//     },30)

//return divider();
// indicator();

//return base();
    /*
    return subtract(
        cube({size:5}),
        [cube({size:5, center:[2,2,2]}),
        cube({size:5, center:[-2,-2,-2]})]
        )
      */
}

module.exports = {main, assembly}