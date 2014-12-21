Snap.load("/assets/glyph1.svg", function (shape) {
    shape = shape.select("g").attr('id','glyph');
    colorShape(shape);
    transformShape(shape, 300, 200, 50, 50, 0, 5, 5);
    paper.append(shape);
});

Snap.load("/assets/glyph2.svg", function (shape) {
    shape = shape.select("g").attr('id','glyph');
    colorShape(shape);
    transformShape(shape, 900, 200, 50, 50, 0, 5, 5);
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
