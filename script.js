var paper = new Snap("svg");

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

function makeRandomTriangle() {
    var size = Math.random() * 500 + 20;
    var color = randomColor();
    var rotation = Math.floor(Math.random()*4) * 90;
    var x = Math.random()*1500;
    var y = Math.random()*800;

    makeTriangle(x, y, size, rotation, color);
}

for (var i=0; i<100; i++) {
    makeRandomTriangle();
}