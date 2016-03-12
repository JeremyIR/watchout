// start slingin' some d3 here.


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
      x: parseFloat(Math.random() * 100).toFixed(3),
      y: parseFloat(Math.random() * 100).toFixed(3)
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
  x: d3.scale.linear().domain([0, 100]).range([0, 500]),
  y: d3.scale.linear().domain([0, 100]).range([0, 500])
};