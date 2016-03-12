// start slingin' some d3 here.

var width = 600;
var height = 480;

var w = d3.select('svg')
  .style({'width': width});

var h = d3.select('svg')
  .style({'width': height});

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
    
//create more enemies
var createEnemies = function(n) {
  return _.range(0, n).map(function(i) {
    return {
      id: i,
      x: parseFloat(Math.random() * 2000).toFixed(3), //fix width
      y: parseFloat(Math.random() * 2000).toFixed(3) //fix height
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
  x: d3.scale.linear().domain([0, width]).range([0, 500]),
  y: d3.scale.linear().domain([0, height]).range([0, 500])
};

//Update Function
var update = function(data) {
  // DATA JOIN
  var circle = d3.select('svg').selectAll('circle') 
    .data(data);

  // UPDATE
  circle.transition()
      .duration(750)
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