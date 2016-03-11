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
  .style({width: "100vw", height: "100vh"});

//Battlefield
var battlefield = d3.select('.battlefield')
  .append('svg')
  .attr('width', canvas.width)
  .attr('height', canvas.height)
  .attr('padding', canvas.padding)
  .style({"background-color": 'red', border: '2px'});

//Enemies
var enemies = d3.select('.enemies')
  .append('svg')
  .attr('width', 50)
  .attr('height', 50);

  //append Enemies
enemies.append('circle')
  .style('stroke', 'gray')
  .style('fill', 'blue');