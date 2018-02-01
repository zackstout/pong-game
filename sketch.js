
var Engine = Matter.Engine;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;
var MouseConstraint = Matter.MouseConstraint;
var Mouse = Matter.Mouse;

var playerPos = {x: 780, y: 200, h: 120};
var ourball = {x: 400, y: 300, r: 25};
// var mouseSens = 50;

// need to refer to the *center* of the figure here:
// i'm not sure why we need to slim down the widths/heights respectively here to avoid gap between p5 and matter...Feels like a hack.s
var wall1 = Bodies.rectangle(20, 300, 20, 600, { isStatic: true });
var wall2 = Bodies.rectangle(400, 10, 800, 10, { isStatic: true });
var wall3 = Bodies.rectangle(400, 590, 800, 10, { isStatic: true });
//how strange that we need this....
wall1.h = 600;
wall1.w = 40;
wall2.h = 20;
wall2.w = 800;
wall3.h = 20;
wall3.w = 800;

var walls = [wall1, wall2, wall3];

var player = Bodies.rectangle(playerPos.x, playerPos.y, 20, playerPos.h, { frictionAir: 0, friction: 0, restitution: 1, isStatic: true });

var ball = Bodies.circle(ourball.x, ourball.y, ourball.r, { frictionAir: 0, friction: 0, restitution: 1 });


//SET UP:
function setup() {
  var can = createCanvas(800, 600);
  var engine = Engine.create();
  var world = engine.world;
  World.add(world, [player, ball]);
  // World.add(world, box1);

  for (var i=0; i < walls.length; i++) {
    World.add(world, walls[i]);
  }
  Engine.run(engine);
  world.gravity.y = 0;

  //i forgot how sensitive this was:
  Body.applyForce(ball, {x: ourball.x, y: ourball.y}, {x:0.03, y: 0.01});
  // Body.applyForce(ball, {x: ourball.x, y: ourball.y}, {x:-0.01, y: -0.01});

  var mouse = Mouse.create(can.elt);
  mouse.pixelRatio = pixelDensity();
  var m = MouseConstraint.create(engine, { mouse: mouse });
  World.add(world, m);
}

//DRAW:
function draw() {
  background(200);
  for (var i=0; i < walls.length; i++) {
    rect(walls[i].position.x - walls[i].w/2, walls[i].position.y - walls[i].h/2, walls[i].w, walls[i].h);
  }

  ellipse(ball.position.x, ball.position.y, ourball.r, ourball.r);

  var playerCenter = playerPos.y + playerPos.h/2;
  var distance = Math.abs(mouseY - playerCenter);

  if (mouseY > 0 && mouseY < 500) {
    Body.setPosition(player, {x: 780, y: mouseY});
  }

  rect(player.position.x, player.position.y, 20, playerPos.h);
}
