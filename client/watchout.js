// start slingin' some d3 here.

var width = 785;
var height = 590;

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
  .style('background-color', '#eee')
  .style({'width': '100vw', 'height': '100vh'});

//Battlefield
var battlefield = d3.select('svg')
  .append('rect')
  .transition()
  .duration(1000)
  .attr('x', 0)
  .attr('y', 0)
  .attr('width', 800)
  .attr('height', 600)
  .style('fill', '#6CF9FF')
  .style('stroke', 'black')
  .attr('align', 'center');

//Player
var player = d3.select('svg')
  .append('rect')
  // .path('m-7.5,1.62413c0,-5.04095 4.08318,-9.12413 9.12414,-9.12413c5.04096,0 9.70345,5.53145 11.87586,9.12413c-2.02759,2.72372 -6.8349,9.12415 -11.87586,9.12415c-5.04096,0 -9.12414,-4.08318 -9.12414,-9.12415z')
  // .attr('r', 8)
  .attr('x', 370)
  .attr('y', 270)
  .attr('width', 30)
  .attr('height', 30)
  .style('stroke', '#FF0D38')
  .style('fill', '#000');
    
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

var dataset = createEnemies(50);
console.log(dataset);

//append Enemies
d3.select('svg').selectAll('circle')
  .data(dataset)
  .enter()
  .append('circle')
  .style('stroke', 'gray')
  .style('fill', 'red')
  .attr('r', 10)
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