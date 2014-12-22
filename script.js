var paper = new Snap("svg");
var buttons = document.body.getElementsByTagName("button");
for (var i=0; i<buttons.length; ++i) {
    buttons[i].addEventListener("click", function(e){
        var composition = e.target.name;
        loadComposition(composition);
    });
}

// load the first composition
var defaultComposition = 'mayan';
var first = window.location.hash.slice(1);
if (first==='') first = defaultComposition;
loadComposition(first);

// display the given composition on the page
// TODO: don't fetch again on second time
function loadComposition(name) {
    paper.clear();
    window.location.hash = name;
    var script = document.createElement('script');
    script.setAttribute('src','/compositions/'+name+'.js');
    document.head.appendChild(script);
}
