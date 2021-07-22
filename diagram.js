const { cube, cuboid, polygon, cylinder, polyhedron } = require('@jscad/modeling').primitives
const { center, rotate, translate, mirror, mirrorX, mirrorY, mirrorZ,rotateX,rotateY, rotateZ } = require('@jscad/modeling').transforms
const { union, subtract } = require('@jscad/modeling').booleans
const { extrudeLinear, extrudeFromSlices } = require('@jscad/modeling').extrusions
const { create } = require('@jscad/modeling').geometries.geom3;

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
    'Z': 0b101011
}

let diagram_data = {
    legend_x: [
        "AB",
        "CD",
        "EF"
    ],
    legend_y: [
        "Hallo",
        "Till"
    ],
    bars: [ // [x][y]
        [
            [
                {height:20,
                texture:{
                    type: "roughness",
                    value: 1
                }},
                {height: 30,
                texture:{
                    type: "roughness",
                    value: 5
                }},
                {height:10,
                texture:{
                    type: "roughness",
                    value: 2
                }},
                {height:20,
                texture:{
                    type: "roughness",
                    value: 4
                }}
              
          ],
          [
            {height:10,
            texture:{
                type: "roughness",
                value: 1
            }},
            {height: 25,
            texture:{
                type: "roughness",
                value: 5
            }},
            {height:20,
            texture:{
                type: "roughness",
                value: 2
            }},
            {height:15,
            texture:{
                type: "roughness",
                value: 4
            }}
          
      ],
        ],
        [
            [
                {height:10,
                texture:{
                    type: "roughness",
                    value: 1
                }},
                {height: 5,
                texture:{
                    type: "roughness",
                    value: 5
                }},
                {height:42,
                texture:{
                    type: "roughness",
                    value: 2
                }},
                {height:7,
                texture:{
                    type: "roughness",
                    value: 4
                }}
              
          ],
          [
            {height:28,
            texture:{
                type: "roughness",
                value: 1
            }},
            {height: 21,
            texture:{
                type: "roughness",
                value: 5
            }},
            {height:5,
            texture:{
                type: "roughness",
                value: 2
            }},
            {height:14,
            texture:{
                type: "roughness",
                value: 4
            }}
          
      ],
        ],
        [
            [
                {height:5,
                texture:{
                    type: "roughness",
                    value: 1
                }},
                {height: 47,
                texture:{
                    type: "roughness",
                    value: 5
                }},
                {height:7,
                texture:{
                    type: "roughness",
                    value: 2
                }},
                {height:8,
                texture:{
                    type: "roughness",
                    value: 4
                }}
              
          ],
          [
            {height:28,
            texture:{
                type: "roughness",
                value: 1
            }},
            {height: 16,
            texture:{
                type: "roughness",
                value: 5
            }},
            {height:17,
            texture:{
                type: "roughness",
                value: 2
            }},
            {height:25,
            texture:{
                type: "roughness",
                value: 4
            }}
          
      ],
        ]
    ],
    indicator_dist: 10,
    base_size: {x:3,y:2}
}



function joint(
    socket = false,
    joint_spacing = 30,
    joint_width = 5,
    joint_depth = 5,
    joint_height = 3,
    joint_tolerance = tolerance) {
        
        let height = socket ? joint_height+joint_tolerance : joint_height;
        let depth = socket ? joint_depth+joint_tolerance : joint_depth;
        let width = socket ? joint_width+joint_tolerance : joint_width;

        let obj = translate([-depth-width/2,-depth,0],
            polyhedron({
            points: [[0,0,0], [depth,depth,0], [depth+width,depth,0], [2*depth+width,0,0],
                     [0,0,height], [depth,depth,height], [depth+width,depth,height], [2*depth+width,0,height]],
            faces: [[0,1,2],[0,2,3],[6,5,4],[7,6,4],
                    [4,1,0],[5,1,4],[5,2,1],[6,2,5],
                    [6,3,2],[6,7,3],[4,0,3],[7,4,3]],
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

function base(base_size_x=4, base_size_y=2) {




    
    let base_x = base_size_x*(bar_spacing+bar_width);
    let base_y = base_size_y*(bar_spacing+bar_width);
    console.log('base_x='+base_x+'\nbase_y='+base_y);
    console.log('base_x/2-joint_spacing/2='+(base_x/2-joint_spacing/2));
    let socket_holes = [];
    
    console.log("bar_socket_width="+bar_socket_width+" | bar_socket_height="+bar_socket_height);

    for (let x = 0;x<base_size_x;x++ ) {
            for (let y = 0; y<base_size_y;y++) {
                console.log("socket hole - x:"+x+" | y:"+y);
                socket_holes.push(
                    translate([
                        (bar_spacing+bar_width)/2+x*(bar_spacing+bar_width),
                        (bar_spacing+bar_width)/2+y*(bar_spacing+bar_width),
                        base_thickness-bar_socket_height
                    ],
                        
                            cuboid({
                                size: [bar_socket_width,bar_socket_width,bar_socket_height],
                                center: [0,0,bar_socket_height/2]
                            })
                        
                    )
                );
        }
    }
    
    
    console.log("Return base");
    return  subtract(
                union(
                    cuboid({size:[base_x,base_y,base_thickness], center: [base_x/2,base_y/2,base_thickness/2]}),

                    translate([base_x,base_y/2-joint_spacing/2,0], 
                        rotateZ(Math.PI/2, 
                            joint()
                    )),
                    

                    translate([base_x,base_y/2+joint_spacing/2,0], 
                        rotateZ(Math.PI/2, 
                            joint()
                    ))
                
                ),

                socket_holes,

                translate([0,base_y/2-joint_spacing/2,0], 
                    rotateZ(Math.PI/2, 
                        joint(true)
                )),

                translate([0,base_y/2+joint_spacing/2,0], 
                    rotateZ(Math.PI/2, 
                        joint(true)
                )),

                mirrorY(
                    translate([base_x/2-joint_spacing/2,0,0], 
                        joint(true)
                )),
                
                mirrorY(
                    translate([base_x/2+joint_spacing/2,0,0], 
                        joint(true)
                ))
    
            )
            

    
    
    
    
        
    
}

function generate_texture(texture, height) {
    let texture_objects = [];
    switch (texture.type) {

        case "roughness":

            let dot_dist = 1+texture.value*0.5;
            let rows = Math.floor(height/dot_dist);
            let cols = Math.floor(bar_width/dot_dist);

            let border_x = (height-rows*dot_dist)*0.5;
            let border_y = (bar_width-cols*dot_dist)*0.5;

            for (let r=0;r<rows;r++) {
                for (let c=0;c<(cols-r%2);c++) {
                    texture_objects.push(
                        translate([border_x+dot_dist/2+r*dot_dist,border_y+dot_dist/2+(r%2*dot_dist/2+c*dot_dist)],
                            cylinder({radius:0.4, height:0.2})
                    ))
                } 
            }

        break;
    }
    return union(texture_objects)
}

function divider() {
    return union(
        translate([0,0,0.5],
            rotateX(-Math.PI/2,
                cylinder({radius:0.5,height:bar_width,center:[0,0,bar_width/2]})
        )),
            translate([-0.5,0,0],
                cuboid({size:[1,bar_width,0.5],
                        center:[0.5,bar_width/2,0.25]})
            
        )
    )
}

function indicator() {
    return rotateZ(Math.PI/4,
        cuboid({size:[1,1,bar_width+5],
                center:[0,0,(bar_width+5)/2]}))
}

function bar(params,indicator_dist=10,center=false) {
    let bar_object;

    let socket_width = bar_socket_width-bar_socket_tolerance;
    let socket_height = bar_socket_height-bar_socket_tolerance;
    
    let segments = [];
    let bar_height=0;
    for (let i=0;i<params.length;i++) {

        let param = params[i];
        console.log("height: " + param.height +
        "\nbar_height: "+bar_height);
        //let divider = bar_height ? (translate([bar_height,0,bar_width], divider())):[]

        let segment = union(translate([bar_height,0,0],
            cuboid({size:[param.height,bar_width,bar_width],center:[param.height/2,bar_width/2,bar_width/2]})
        ),
            translate([bar_height,0,bar_width], generate_texture(param.texture,param.height))
        )
        
        if(bar_height) {
            segment = union(
                segment,
                translate([bar_height,0,bar_width], divider())
            )
        }


        segments.push(
            segment
        )
        bar_height += param.height;

    }

    bar_object = union(
                    translate([-socket_height,(bar_width-socket_width)/2,(bar_width-socket_width)/2],
                        cuboid({size:[socket_height,socket_width,socket_width],center:[socket_height/2,socket_width/2,socket_width/2]})
                    ),
                    segments)


    if(indicator_dist>0) {
        let indicators = []

        for(let h=indicator_dist;h<=bar_height;h+=indicator_dist) {
            indicators.push(
                translate([h,0,0],indicator())
            )
            indicators.push(
                translate([h,bar_width,0],indicator())
            )
        }
        bar_object = subtract(bar_object,indicators);

    }
    
    if (center) {
        bar_object = translate([bar_width/2,bar_width/2,base_thickness],
                        rotate([0,-Math.PI/2,Math.PI/2],
                            bar_object))
    }
    
    return bar_object;
}

function braille_dot() {
    return translate([0,0,0.3], cylinder({radius:0.8, height:0.6}))
}

function braille_char(char='') {
    char=char.toUpperCase();

    dots = []
    console.log(braille[char]);
    if (braille[char] & 0b100000 ) { dots.push( translate( [ 1.25+0*2.5 , 1.25+2*2.5 , 0 ] , braille_dot())) }
    if (braille[char] & 0b010000 ) { dots.push( translate( [ 1.25+0*2.5 , 1.25+1*2.5 , 0 ] , braille_dot())) }
    if (braille[char] & 0b001000 ) { dots.push( translate( [ 1.25+0*2.5 , 1.25+0*2.5 , 0 ] , braille_dot())) }
    if (braille[char] & 0b000100 ) { dots.push( translate( [ 1.25+1*2.5 , 1.25+2*2.5 , 0 ] , braille_dot())) }
    if (braille[char] & 0b000010 ) { dots.push( translate( [ 1.25+1*2.5 , 1.25+1*2.5 , 0 ] , braille_dot())) }
    if (braille[char] & 0b000001 ) { dots.push( translate( [ 1.25+1*2.5 , 1.25+0*2.5 , 0 ] , braille_dot())) }

    return dots
}

function braille_text(text='', justify_left=false) {
    let chars = []
    
    for (let i=0;i<text.length;i++) {
        chars.push(
            translate([ justify_left ? i*6 : (text.length-i)*-6 ,-3.75,0],braille_char(text[i]))
        )
    }
    console.log('chars-length:'+chars.length);
    return chars;
}

function legend(size=4,type_y=false,data=[]) {
    let base_size = size*(bar_spacing+bar_width);
    

    max_text_length = 0;

    data.forEach(text => {
        max_text_length = Math.max(text.length,max_text_length)
    });

    max_text_length = max_text_length * 6 + 7
    let legend_obj = cuboid({   size: [(type_y?max_text_length:base_size),(type_y?base_size:max_text_length),base_thickness],
                                center: [(type_y?-max_text_length:base_size)/2,(type_y?base_size:-max_text_length)/2,base_thickness/2]});
                        

   
    let joints = union(
            translate([-joint_spacing/2,0,0],
                rotateZ(Math.PI,
                    joint() 
            )),
            translate([joint_spacing/2,0,0],
                rotateZ(Math.PI,
                    joint() 
            ))
        );
    if(!type_y) {
        joints = translate([base_size/2,0,0],joints);
    } else {
        joints = translate([0,base_size/2,0], rotateZ(-Math.PI/2, joints));
    }
    let texts = [];
    console.log('data:'+data.length);
    for (let i=0;i<data.length;i++) {
        console.log("i="+i+"\ndata[i]="+data[i]);
        if (!type_y) {
            texts.push(
                translate([ (bar_spacing+bar_width)/2+i*(bar_spacing+bar_width) , -2 , base_thickness ],
                    rotateZ(Math.PI/2,
                        braille_text(data[i])
                        )
                )
            );
        } else {
            texts.push(
                translate([ -2 , (bar_spacing+bar_width)/2+i*(bar_spacing+bar_width) , base_thickness ],
                    
                        braille_text(data[i])
                        
                )
            );
        }
    }
console.log(texts.length);
    return union(legend_obj, joints, texts);
    
}

function assembly (data) {
    let size_x = data.bars.length;
    let size_y = data.bars[0].length;
    
    let bars = []

    for (let x=0;x<size_x;x++) {
        for (let y=0;y<size_y;y++) {
            let bar_obj = bar(data.bars[x][y],data.indicator_dist,true);

            if(y==size_y-1) {
                bar_obj = rotateZ(Math.PI,
                    bar_obj
                    )
            }


            bars.push(
                translate([(bar_spacing+bar_width)/2+x*(bar_spacing+bar_width),(bar_spacing+bar_width)/2+y*(bar_spacing+bar_width),0],
                    
                bar_obj
                    
                )
            )
        }
    }

    // split size to base segments
    let base_x = Math.max(2,data.base_size.x);
    let base_y = Math.max(2,data.base_size.y);

    


    let legends_x = []

    for (let i=0;i<Math.ceil(size_x/base_x);i++) {
        legends_x.push(
            translate([base_x*i*(bar_spacing+bar_width),0,0],
                legend(base_x,false,data.legend_x.slice(i*base_x,i*base_x+base_x))
            )
        )
    }

    
    let legends_y = []
    for (let i=0;i<Math.ceil(size_y/base_y);i++) {
        legends_x.push(
            translate([0,base_y*i*(bar_spacing+bar_width),0],
                legend(base_y,true,data.legend_y.slice(i*base_y,i*base_y+base_y))
            )
        )
    }

    let bases = []
    for (let x=0;x<Math.ceil(size_x/base_x);x++) {
        for(let y=0;y<Math.ceil(size_y/base_y);y++) {
            bases.push(
                translate([base_x*x*(bar_spacing+bar_width),base_y*y*(bar_spacing+bar_width),0],
                    base(base_x,base_y)
                )
            )
        }
    }
    

    return [...bases,...bars,...legends_x,...legends_y]
}

const main = () => {
    //return legend()
    return assembly(diagram_data)

    //return braille_text('till');
    //return legend(4,false,["Till","Test","Hallo","bla"])
 /* return bar([
        {height:20,
        texture:{
            type: "roughness",
            value: 1
        }},
        {height: 30,
        texture:{
            type: "roughness",
            value: 5
        }},
        {height:10,
        texture:{
            type: "roughness",
            value: 2
        }},
        {height:20,
        texture:{
            type: "roughness",
            value: 4
        }}
      
  ],10,true);*/

 /* return texture ({
    type: "roughness",
    value: 1
},30)*/

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

module.exports = { main }