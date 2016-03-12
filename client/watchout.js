// start slingin' some d3 here.

var width = 785;
var height = 590;

//radius of circle for player
var playerRadius = 20;

//Title
d3.select('.header')
  .append('p')
  .append('text')
  .text('ARUN & JEREMY\'S EPIC PINBALL GAME!');


//Container
var container = d3.select('.container')
  .append('svg')
  .transition()
  .duration(750)
  .style({'width': '100vw', 'height': '100vh'});

//Battlefield
// //position
// var posX = d3.select('svg')
//   .style({'margin': '50vw'});

var battlefield = d3.select('svg')
  .append('rect')
  .transition()
  .duration(800)
  .attr('width', 800)
  .attr('height', 600)
  .style({'margin': '25vw'}) //not working
  .style('position', 'absolute')
  .style('fill', '#6CF9FF')
  .style('stroke', 'black')
  .attr('align', 'center');

//drag
var drag = d3.behavior.drag()
  .origin(function(d) {
    return d;
  })
  .on('drag', dragmove);

//drag function
var dragmove = function(d) {
  var x = d3.event.x;
  var y = d3.event.y;
  d3.select(this)
    .attr('cx', d.x = Math.max(playerRadius, Math.min(width - playerRadius, d3.event.x)))
    .attr('cy', d.y = Math.max(playerRadius, Math.min(width - playerRadius, d3.event.y))); 
};

//Player
var player = d3.select('svg')
  .append('rect')
  .attr('class', 'player')
  .attr('width', 20)
  .attr('height', 20)
  // .attr('r', playerRadius) 
  .style('stroke', '#FF0D38')
  .style('fill', '#000')
  .call(drag);
    
//create more enemies
var createEnemies = function(n) {
  return _.range(0, n).map(function(i) {
    return {
      id: i,
      x: parseFloat(Math.random() * width).toFixed(3), //fix width
      y: parseFloat(Math.random() * height).toFixed(3) //fix height
    };
  });
};

var dataset = createEnemies(25);
console.log(dataset);

//append Enemies
d3.select('svg').selectAll('circle')
  .data(dataset)
  .enter()
  .append('circle')
  .style('stroke', 'gray')
  .style('fill', 'red')
  .attr('class', 'enemies')
  .attr('r', 15)
  .attr('cx', function(d) {
    return d.x;
  })
  .attr('cy', function(d) {
    return d.y;
  });

//axes
var axes = {
  x: d3.scale.linear().domain([0, width]).range([0, width]),
  y: d3.scale.linear().domain([0, height]).range([0, height])
};

//Update Function
var update = function(data) {
  // DATA JOIN
  var circle = d3.select('svg').selectAll('circle') 
    .data(data);

  // UPDATE
  circle.transition()
      .duration(1100)
      .attr('cx', function(d) {
        return axes.x(d.x);
      })
      .attr('cy', function(d) {
        return axes.y(d.y);
      });
};

//update(dataset);

setInterval(function() {
  update(d3.shuffle(dataset));
}, 1000);
