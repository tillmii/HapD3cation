const initializeCsgViewer = require("@jwc/csg-viewer");
const { cube } = require("@jscad/scad-api").primitives3d;
const primitives = require("@jscad/modeling").primitives;

const viewerOptions = {
    rendering: {
        background: [0.211, 0.2, 0.207, 1], // [1, 1, 1, 1],//54, 51, 53
        meshColor: [0.4, 0.6, 0.5, 1]
    },
    grid: {
        show: true,
        color: [1, 1, 1, 1],
        //size: [2230, 2230]
    },
    camera: {
        position: [450, 550, 700]
    },
    controls: {
        zoomToFit: {
            targets: "all"
        },
        limits: {
            maxDistance: 1600,
            minDistance: 0.01
        }
    }
};

const csg = cube({size: 100});

console.log(csg)
console.log(primitives.cube({size: 100}))

const { csgViewer, viewerDefaults, viewerState$ } = initializeCsgViewer(
    document.body,
    viewerOptions
);

// update / initialize the viewer with some data
csgViewer(viewerOptions, { solids: csg });

// you also have access to the defaults
console.log("viewerDefaults", viewerDefaults);

// you can subscribe to the state of the viewer to react to it if you want to,
// as the state is a most.js observable
viewerState$
    .throttle(5000)
    // .skipRepeats()
    .forEach(viewerState => console.log("viewerState", viewerState));

setTimeout(function (t) {
    csgViewer({ camera: { position: [0, 100, 100] } })
}, 5000)