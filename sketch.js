var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);

  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup=new Group();
  climbersGroup=new Group();

  ghost = createSprite(300,300,10,10);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.4;

}

function draw() {
  background(200);

  if (gameState==="play"){
  if(tower.y > 400){
      tower.y = 300
    }
  if (keyDown("space")){
    ghost.velocityY=-10;
  }  
  if (keyDown("left_Arrow")){
    ghost.x = ghost.x-2;
  }  
  if (keyDown("right_Arrow")){
    ghost.x = ghost.x+2;
  }  
  spawnDoor();

  ghost.velocityY=ghost.velocityY+0.8;
  if(climbersGroup.isTouching(ghost)||ghost.y>600){
    gameState="end";
  }
 
  drawSprites();
}

if(gameState==="end"){
stroke("black");
fill("red");
textSize(50);
text("GAME OVER",200,250);

}
}

function spawnDoor(){

if (frameCount%240===0){
door=createSprite(200,-50,10,10);
climber=createSprite(200,10,10,10);
door.x=Math.round(random(120,400));
climber.x=door.x;
door.addImage(doorImg);
climber.addImage(climberImg);
door.velocityY=2;
climber.velocityY=2;
ghost.depth=door.depth;
ghost.depth+=1;
door.lifetime=800;
climber.lifetime=800;
doorsGroup.add(door);
climbersGroup.add(climber);

}
}
