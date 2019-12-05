
var arr = null;
var d_name = [];
var data = [];
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xmlhttp = new XMLHttpRequest();
var url = "https://raw.githubusercontent.com/iamshaunjp/data-ui-with-d3-firebase/lesson-26/menu.json";

xmlhttp.open("GET", url, true);
xmlhttp.send();

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        arr = JSON.parse(xmlhttp.responseText);
        
    }
};

interval = setInterval(getResult, 100);

function getResult()
{
if(arr != null)
{
interval = clearInterval(interval);
    myFunction();
}
}


function myFunction() {

var i;

for(i = 0; i < arr.length ; i++) {
    d_name.push(arr[i].name);
    data.push(arr[i].orders);
}

console.log(d_name,data);


var hscale = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, 3])

var scene = d3.select("a-scene")

var bars = scene.selectAll("a-cube.bar").data(data)
bars.enter().append("a-cube").classed("bar", true)

bars.attr({
  position: function(d,i) {
    var y = 1 + hscale(d)/2;
    var radius = 7;
    var theta = i/data.length * 2 * Math.PI - 3/4*Math.PI
    var x = radius * Math.cos(theta)
    var z = radius * Math.sin(theta)
    return x + " " + y + " " + z
  },
  rotation: function(d,i) {
    var x = 0;
    var z = 0;
    var y = -(i/data.length)*360 - 45;
    return x + " " + y + " " + z
  },
  width: function(d) { return 0.5},
  depth: function(d) { return 0.9},
  height: function(d) { return hscale(d)},
  opacity: function(d,i) { return 0.6 + (i/data.length) * 0.4},
})
.on("click", function(d,i) {
  console.log("click", i,d)
})
.on("mouseenter", function(d,i) {
  if(this.hovering) return;
  console.log("hover", i,d)
  this.hovering = true;
  d3.select(this).transition().duration(1000)
  .attr({
    metalness: 0.5,
    width: 2
  })
})
.on("mouseleave", function(d,i) {
  console.log("leave",i,d)
  this.hovering = false;
  d3.select(this).transition()
  .attr({
    metalness: 0,
    width: 0.5
  })
}) 


var labels = scene.selectAll("a-entity.label").data(d_name)
labels.enter().append("a-entity").classed("label", true)
.attr({
  text: function(d,i){  return "text: " + d },
  material: "color: #0000ff"
})

labels.attr({
  position: function(d,i) {          
    var y = 0.3;
    var radius = 7;
    var theta = i/data.length * 2 * Math.PI - 3/4*Math.PI - 0.07
    var x = radius * Math.cos(theta)
    var z = radius * Math.sin(theta)
    return x + " " + y + " " + z
  },
  rotation: function(d,i) {
    var x = 0;
    var z = 0;
    var y = +45 -(i/data.length)*360;
    return x + " " + y + " " + z
  },
})

}
    