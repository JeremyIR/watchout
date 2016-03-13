// start slingin' some d3 here.

var width = 1265;
var height = 700;

//color set
var setColor = d3.scale.category20b();

//radius of circle for player
var playerRadius = 20;

//Title
d3.select('.header')
  .append('p')
  .append('text')
  .text('ARUN & JEREMY\'S JELLYBEAN GAME!');

//Container
var container = d3.select('.container')
  .append('svg')
  .transition()
  .duration(750)
  .style({'width': '100vw', 'height': '100vh'});

var battlefield = d3.select('svg')
  .append('rect')
  .classed('battlefield', true)
  .transition()
  .duration(1100)
  .attr('width', 1280)
  .attr('height', 720)
  // .style({'margin': '25vw'}) //not working
  .style('position', 'relative')
  .style('fill', '#6CF9FF')
  .style('stroke', 'black')
  .attr('align', 'center');

var playerData = [{
  x: 640,
  y: 360
}];

//drag function
var dragmove = function(d) {
  var x = d3.event.x;
  var y = d3.event.y;
  console.log('x:', x, 'y: ', y);
  d3.select(this)
    .attr('cx', d.x = x)
    .attr('cy', d.y = y);
};

//drag
var drag = d3.behavior.drag()
  .origin(function(d) {
    return d;
  })
  .on('drag', dragmove);


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
// console.log(dataset);

//append Enemies
var enemies = d3.select('svg').selectAll('circle')
  .data(dataset)
  .enter()
  .append('circle')
  .style('stroke', 'gray')
  .style('fill', function(d, i) {
    return setColor(i % 20);
  })
  .attr('class', 'enemies')
  .attr('r', 10)
  .attr('cx', function(d) {
    return d.x;
  })
  .attr('cy', function(d) {
    return d.y;
  });

//Player
var player = d3.select('svg')
  .data(playerData)
  // .enter()
  .append('circle')
  .classed('player', true)
  .attr('r', 20)
  .attr('cx', function(d) {
    return d.x;
  })
  .attr('cy', function(d) {
    return d.y;
  })
  .style('stroke', '#5B595C')
  .style('fill', '#FFE60D')
  .call(drag);

//axes
var axes = {
  x: d3.scale.linear().domain([0, width]).range([0, width]),
  y: d3.scale.linear().domain([0, height]).range([0, height])
};

//Scoreboard
var score = 0;
var bestScore = 0;
var scoreKeeper = function() {
  score += 1;
  bestScore = Math.max(score, bestScore);
  d3.select('.scoreboard .highscore span').text(bestScore);
  d3.select('.scoreboard .current span').text(score);
};

setInterval(scoreKeeper, 100);

var prevCollision = false;
var collisionCount = 0;

//Collision Function
var collide = function() {
  return function() {
    var thisEnemy = d3.select(this);

    d3.select('.enemies').each(function() {
      var otherEnemy = d3.select(this);

      if (thisEnemy.datum() !== otherEnemy.datum()) {

        dx = thisEnemy.attr('cx') - otherEnemy.attr('cx'),
          dy = thisEnemy.attr('cy') - otherEnemy.attr('cy'),
          distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

        if (distance < (+thisEnemy.attr('r') + +otherEnemy.attr('r'))) {
          collision(thisEnemy, otherEnemy);
        }
      }
    });
  };
};

var collision = function(thisEnemy, otherEnemy) {
  collisionCount++;
  d3.select('.scoreboard .collisions span').text(collisionCount);
  score = 0;
  console.log('Collision at: ' + thisEnemy.attr('cx') + ', ' + thisEnemy.attr('cy'));
  console.log(collisionCount);
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
      })
      .tween('collision', collide)
      .each('end', function() {
        update(dataset);
      });
};

setInterval(function() {
  update(d3.shuffle(dataset));
}, 1000);

