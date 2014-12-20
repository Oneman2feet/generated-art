var paper = new Snap("svg");

var width  = window.screen.width;
var height = window.screen.height;

function makeTriangle(x, y, size, rotation, color) {
    var triangle = paper.polygon(-0.5, -0.5, -0.5, 0.5, 0.5, 0.5).attr({
        fill: color
    });

    var matrix = new Snap.Matrix();
    matrix.translate(x,y);
    matrix.rotate(rotation);
    matrix.scale(size);

    triangle.transform(matrix);
}

var gridsize = 20;
function makeRandomTriangle(colorSeed) {
    var size = gridsize * Math.pow(Math.floor(Math.random() * 4 + 1), 2);
    var color = randomColor({
        luminosity: 'bright',
        hue: colorSeed
    });
    var rotation = Math.floor(Math.random()*4) * 90;
    var x = gridsize * Math.floor(Math.random()*80);
    var y = gridsize * Math.floor(Math.random()*40);

    makeTriangle(x, y, size, rotation, color);
}

var color = Math.random() * 256;

for (var i=0; i<200; i++) {
    makeRandomTriangle(color);
}

Snap.load("/assets/glyph.svg", function (shape) {
    shape = shape.select("g").attr('id','glyph');
    colorShape(shape);
    transformShape(shape, 600, 200, 50, 50, 0, 5, 5);
    paper.append(shape);
});

function transformShape(shape, x, y, cx, cy, angle, scalex, scaley) {
    matrix = new Snap.Matrix();
    matrix.translate(x, y);
    matrix.rotate(angle, cx, cy);
    matrix.scale(scalex, scaley, cx, cy);
    shape.transform(matrix);
}

function colorShape(shape) {
    var groups = shape.selectAll("g").items;
    for (i in groups) {
        var group = groups[i];
        setGroup(group, {
            'stroke': 'black',
            'stroke-width': '1px',
            'fill': randomColor({hue:'orange'})
        });
    }
}

function setGroup(group, attrs) {
    var paths = group.selectAll("path").items
    for (i in paths) {
        var path = paths[i];
        path.attr(attrs);
    }
}
