// start slingin' some d3 here.

var canvas = {
  width: 900,
  height: 450,
  padding: 20
};

//Title
d3.select('.header')
  .append('p')
  .append('text')
  .text('ARUN & JEREMY\'S EPIC PINBALL GAME!');

//Container
var container = d3.select('.container')
  .transition()
  .duration(750)
  .style('background-color', '#eee')
  .style({'width': '100vw', 'height': '100vh'});

//Battlefield
var battlefield = d3.select('.battlefield')
  .append('svg')
  .attr('width', canvas.width)
  .attr('height', canvas.height)
  .attr('padding', canvas.padding)
  .style({'background-color': 'red', border: '2px'});

//Enemies
var enemies = d3.select('.battlefield')
  .append('svg')
  .attr('width', 500)
  .attr('height', 500);
    
  //append Enemies
enemies.append('circle')
  .style('stroke', 'gray')
  .style('fill', 'aliceblue')
  .attr('r', 10)
  .attr('cx', 20)
  .attr('cy', 20);

//axes
var axes = {
  x: d3.scale.linear().domain([0, 100]).range([0, canvas.width]),
  y: d3.scale.linear().domain([0, 100]).range([0, canvas.height])
};