
var Engine = Matter.Engine;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;
var MouseConstraint = Matter.MouseConstraint;
var Mouse = Matter.Mouse;

var playerPos = {x: 780, y: 200, h: 120};
var ourball = {x: 400, y: 300, r: 25};
// var mouseSens = 50;

//don't need to set Static to true if no gravity.y!
var wall1 = Bodies.rectangle(10, 0, 20, 800, { isStatic: true });
var wall2 = Bodies.rectangle(10, 0, 800, 20, { isStatic: true });
var wall3 = Bodies.rectangle(10, 590, 800, 20, { isStatic: true });
//how strange....
wall2.h = 20;
wall2.w = 800;
wall3.h = 20;
wall3.w = 800;
wall1.h = 800;
wall1.w = 20;
var walls = [wall1, wall2, wall3];

var player = Bodies.rectangle(playerPos.x, playerPos.y, 20, playerPos.h, { frictionAir: 0, friction: 0, restitution: 1, isStatic: true });

var ball = Bodies.circle(ourball.x, ourball.y, ourball.r, { frictionAir: 0, friction: 0, restitution: 1 });


//SET UP:
function setup() {
  var can = createCanvas(800, 600);
  var engine = Engine.create();
  var world = engine.world;
  World.add(world, [player, ball]);

  for (var i=0; i < walls.length; i++) {
    World.add(world, walls[i]);
  }
  Engine.run(engine);
  world.gravity.y = 0;

  //i forgot how sensitive this was:
  Body.applyForce(ball, {x: ourball.x, y: ourball.y}, {x:0.03, y: 0.01});

  var mouse = Mouse.create(can.elt);
  mouse.pixelRatio = pixelDensity();
  var m = MouseConstraint.create(engine, { mouse: mouse });
  World.add(world, m);
}

//DRAW:
function draw() {
  // console.log(mouseX, mouseY);
  background(200);
  for (var i=0; i < walls.length; i++) {
    rect(walls[i].position.x, walls[i].position.y, walls[i].w, walls[i].h);
  }

  ellipse(ball.position.x, ball.position.y, ourball.r, ourball.r);

  var playerCenter = playerPos.y + playerPos.h/2;
  var distance = Math.abs(mouseY - playerCenter);

  if (mouseY > 0 && mouseY < 500) {
    Body.setPosition(player, {x: 780, y: mouseY});
  }

  rect(player.position.x, player.position.y, 20, playerPos.h);
}
