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