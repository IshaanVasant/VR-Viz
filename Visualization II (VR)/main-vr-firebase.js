
const update = (data) => {

var d_length = data.length;

var hscale = d3.scale.linear()
.domain([0, d3.max(data,d => d.amount)])
.range([0, 3])

var scene = d3.select("a-scene")

var bars = scene.selectAll("a-cube.bar").data(data)

bars.enter().append("a-cube").classed("bar", true)

console.log(bars,data)

bars.exit().remove();

bars.attr({
position: function(d,i) {
var y = 1 + hscale(d.amount)/2;
var radius = 10;
var theta = i/d_length * 2 * Math.PI - 3/4*Math.PI
var x = radius * Math.cos(theta)
var z = radius * Math.sin(theta)
return x + " " + y + " " + z
},
rotation: function(d,i) {
var x = 0;
var z = 0;
var y = -(i/d_length)*360 - 45;
return x + " " + y + " " + z
},
width: function(d) { return 0.5},
depth: function(d) { return 0.9},
height: function(d) { return hscale(d.amount)},
color: function(data){if (data.amount > 50 ) {return 'purple'} else {return 'blue';}},
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

annotFunc()

})
.on("mouseleave", function(d,i) {

console.log("leave",i,d)
this.hovering = false;
d3.select(this).transition()
.attr({
metalness: 0,
width: 0.5
})

removeAnnotFunc()

}) 



var labels = scene.selectAll("a-entity.label").data(data)
labels.enter().append("a-entity").classed("label", true)
labels.exit().remove()
labels.attr({
text: function(d,i){  return "text: " + d.name},
material: "color: #0000ff"
})

labels.attr({
position: function(d,i) {
var y = 0.3;
var radius = 10;
var theta = i/d_length * 2 * Math.PI - 3/4*Math.PI
var x = radius * Math.cos(theta)
var z = radius * Math.sin(theta)
return x + " " + y + " " + z
},

rotation: function(d,i) {
var x = 0;
var z = 0;
var y = +45 -(i/d_length)*360;
return x + " " + y + " " + z
},
})



function annotFunc(){

var annot = scene.selectAll("a-entity.annot").data(data)

annot.enter().append("a-entity").classed("annot", true)

annot.exit().remove()

annot.attr({
text: function(d,i){  return "text: " + '$'+ d.amount},
material: "color: #5a15c2",
scale: '0.7 0.7 1'
})

annot.attr({
position: function(d,i) {
var y = 1.3 + hscale(d.amount);
var radius = 10;
var theta = i/d_length * 2 * Math.PI - 3/4*Math.PI
var x = radius * Math.cos(theta)
var z = radius * Math.sin(theta)
return x + " " + y + " " + z
},

rotation: function(d,i) {
var x = 0;
var z = 0;
var y = +45 -(i/d_length)*360;
return x + " " + y + " " + z
},
})
}



function removeAnnotFunc(){
  var annot = scene.selectAll("a-entity.annot").data(data)

  annot.enter().append("a-entity").classed("annot", true)
  
  annot.exit().remove()
  
  annot.attr({
  text: function(d,i){  return "text: " + ''},
  })
  }


};




var data = [];

db.collection('expenses').onSnapshot(res => {
  
  res.docChanges().forEach(change => {

    const doc = {...change.doc.data(), id: change.doc.id};

    switch (change.type) {
      case 'added':
        data.push(doc);
        break;
      case 'modified':
        const index = data.findIndex(item => item.id == doc.id);
        data[index] = doc;
        break;
      case 'removed':
        data = data.filter(item => item.id !== doc.id);
        break;
      default:
        break;
    }

  });

  update(data);

});