

var Engine = Matter.Engine;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;

var playerPos = {x: 780, y: 200, h: 120};

var mouseSens = 50;

//don't need to set Static to true if no gravity.y!
var wall = Bodies.rectangle(10, 0, 20, 800);
var player = Bodies.rectangle(playerPos.x, playerPos.y, 20, playerPos.h);


function setup() {
  var can = createCanvas(800, 600);
  var engine = Engine.create();
  var world = engine.world;
  World.add(world, [wall, player]);
  Engine.run(engine);
  // console.log(wall);
  world.gravity.y = 0;
}

function draw() {
  background(200);
  rect(wall.position.x, wall.position.y, 20, 800);
  // rect(playerPos.x, playerPos.y, 20, playerPos.h);
  // console.log(player.position.y);

  var playerCenter = playerPos.y + playerPos.h/2;
  var distance = Math.abs(mouseY - playerCenter);

  if (mouseY > playerCenter) {
    Body.setVelocity(player, {x:0, y: distance / mouseSens});
  } else if (mouseY < playerCenter) {
    Body.setVelocity(player, {x:0, y: -distance / mouseSens});
  }
  // console.log(mouseY, playerPos.y + playerPos.h / 2);
  // console.log(player.position.y);
  rect(player.position.x, player.position.y, 20, playerPos.h);
}
