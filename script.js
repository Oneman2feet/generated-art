var paper = new Snap("svg");
var buttons = document.body.getElementsByTagName("button");
for (var i=0; i<buttons.length; ++i) {
    buttons[i].addEventListener("click", function(e){
        paper.clear();
        var script = document.createElement('script');
        script.setAttribute('src','/compositions/'+e.target.name+'.js');
        document.head.appendChild(script);
    });
}