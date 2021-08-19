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
  
  ghost=createSprite(300,50);
  ghost.addImage(ghostImg);
  ghost.scale=0.3;

  invisibleBlockGroup=new Group()
  climbersGroup=new Group()
}

function draw() {
  background(200);
  drawSprites()
  if(tower.y > 400){
      tower.y = 300
    }
    if(keyDown("SPACE")){
     ghost.velocityY=-5;
    }
    if(keyDown("LEFT_ARROW")){
      ghost.x=ghost.x-3
    }
    if(keyDown("RIGHT_ARROW")){
      ghost.x=ghost.x+3
    }
    ghost.velocityY=ghost.velocityY+0.8;

    if(ghost.isTouching(invisibleBlockGroup)){
      ghost.velocityY=0;
      climbersGroup.setVelocityYEach(0)
    }
    ghost.collide(climbersGroup)
    spawnDoor()
}

function spawnDoor(){
  
  if(frameCount%100==0){
    door=createSprite(Math.round(random(100,500)),-10);
    door.addImage(doorImg);
    door.velocityY=2;
    var climber=createSprite(door.x,door.y+50);
    climber.addImage(climberImg);
    climber.velocityY=2;
    var ingrnd=createSprite(door.x,door.y+60,climber.width,10);
    ingrnd.velocityY=2;
    ingrnd.visible=false;
    door.lifetime=350;
    climber.lifetime=350;
    ingrnd.lifetime=350;
    invisibleBlockGroup.add(ingrnd)
    climbersGroup.add(climber)
    ghost.depth=door.depth+1;
  }
}