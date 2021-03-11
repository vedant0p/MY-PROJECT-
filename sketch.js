var gameState = "Play"

var mario, mario_running
var banana, bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var back, backImage;
var score = 0;
var survivalTime = 0;

function preload() {

  backImage = loadImage("backgroound.jpg")

  mario_running = loadAnimation("mario.jpg")

  bananaImage = loadImage("OIP.jpg");
  obstacleImage = loadImage("12.png");

}

function setup() {
  createCanvas(400, 400);
  //creating backgound
  back = createSprite(200, 200, 800, 800);
  back.velocityX = -2;
  back.addImage(backImage);
  back.x = back.width / 2;
  
  //creating backgound
  ground = createSprite(400, 370, 500, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  ground.visible = false;
  console.log(ground.x)


  //creating mario
  mario = createSprite(80, 370, 20, 20);
  mario.addAnimation("moving", mario_running);
  mario.scale = 0.1;
  bananaGroup = createGroup();
  obstacleGroup = createGroup();

}

function draw() {
  background(255);
  if (gameState == "Play") {

    bananas()
    Obstacles()

    if (ground.x < 150) {
      ground.x = ground.width / 2;
    }
    if (back.x < 150) {
      back.x = back.width / 2;
    }

    survivaltime = Math.ceil(frameCount / frameRate())

    if (keyDown("space")) {
      mario.velocityY = -12;
    }

    mario.velocityY = mario.velocityY + 1

    if (mario.isTouching(bananaGroup)) {
      bananaGroup.destroyEach();
      score = score + 1;
    }

    if (mario.isTouching(obstacleGroup)) {
      mario.scale = 0.1;
    }
  } else {
    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
    ground.velocityX = 0;
    mario.velocityX = 0;
    mario.velocityY = mario.velocityY + 1
    stroke(0);
    fill("black");
    textSize(30);
    text("Game Over", 200, 200);
  }

  switch (score) {
    case 10:
      mario.scale = 0.1;
      break;

    case 20:
      mario.scale = 0.2;
      break;

    case 30:
      mario.scale = 0.3;
      break;

    case 40:
      mario.scale = 0.4;
      break;
    default:
      break;
  }

  mario.collide(ground);

  drawSprites();
  
  stroke("black");
  textSize(20);
  fill("black");
  text("score:" + score, 300, 50);

  stroke("black");
  textSize(20);
  fill("black");
  text("survivaltime:" + survivaltime, 100, 50);
}

function bananas() {
  if (frameCount % 65 === 0) {
    var banana = createSprite(500, Math.round(random(50, 250)));
    banana.velocityX = -(6 + score / 100);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.lifetime = 200;
    bananaGroup.add(banana);
  }
}

function Obstacles() {
  if (frameCount % 120 === 0) {
    var obstacle = createSprite(500, 340, 10, 10);
    obstacle.velocityX = -(6 + score / 100);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
  }
}