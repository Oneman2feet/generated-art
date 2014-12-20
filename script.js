var paper = new Snap("svg");

var width  = window.screen.width;
var height = window.screen.height;

/*
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
*/

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

var colors = [
    {color:'#81eaa9', weight:1},
    {color:'#60d6be', weight:2},
    {color:'#d0f282', weight:2},
    {color:'#4ae2d6', weight:2},
    {color:'#99fcc6', weight:1}
];

var sum = 0;
var cdf = colors.reduce(function(acc,el){
    sum = (acc.length===0 ? 0 : acc[acc.length-1]) + el.weight;
    acc.push(sum);
    return acc;
},[]);

function binsearch(value, array) {
    var recbin = function(start,end) {
        if (start===end) return start;
        var test = Math.floor((end+start)/2);
        if (array[test]===value) return test;
        if (array[test]<value) return recbin(test+1,end);
        return recbin(start,test);
    };
    return recbin(0,array.length-1);
}

function pickColor() {
    var i = Math.random()*sum;
    return colors[binsearch(i,cdf)].color;
}

function colorShape(shape) {
    var groups = shape.selectAll("g").items;
    for (i in groups) {
        var group = groups[i];
        setGroup(group, {
            'stroke': 'black',
            'stroke-width': '1px',
            'fill': pickColor()
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
