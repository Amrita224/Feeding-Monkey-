var survivalTime=0;
var PLAY=1;
var END=0;
var gameState=1;
var monkey , monkey_running,Background,restart,gameOver;
var banana ,bananaImage, stone,stoneImage,BackgroundImage,collided,restartImage,gameOverImage;
var score;
var bnanaGroup,obstacleGroup;
var bananaSound,gmSound,jump;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("obstacle.png");
  BackgroundImage = loadImage("jungle-game-scenes.jpg");
  bananaSound=loadSound("fruit biting.wav");
  collided=loadImage("sprite_0.png");
  restartImage=loadImage("restart2.png");
  gameOverImage=loadImage("gameover3.jpg");
  jump=loadSound("jump sound.wav");
  gmSound=loadSound("gameOver sound.wav")
}



function setup() {
  createCanvas(500,260);
  
  
  Background=createSprite(10,140,50,50);
  Background.addImage(BackgroundImage);
  Background.velocityX=-4;
  
  monkey=createSprite(80,220,20,20);
  monkey.addAnimation("moving" ,monkey_running);
  monkey.scale=0.1;

  ground=createSprite(400,223,900,5);
  ground.velocityX=-4;
  ground.visible=false;
  
  restart=createSprite(250,190,20,20);
  restart.addImage(restartImage);
  restart.scale=0.2;
  
  gameOver=createSprite(250,110,20,20);
  gameOver.addImage(gameOverImage);
  gameOver.scale=0.3;
  
  bananaGroup=new Group();
  obstacleGroup=createGroup();
  
  
}


function draw() {
background("white");
  
  console.log(Background.x)
  
  if (gameState===PLAY){
    survivalTime=survivalTime+Math.round(frameRate()/60);
  Banana();
  Stone();
    
    restart.visible=false;
    gameOver.visible=false;
    
    if (keyDown("SPACE") && monkey.y>=185){
      monkey.velocityY=-12;
      jump.play();
      }
    if (bananaGroup.isTouching(monkey)){
      bananaSound.play();
      bananaGroup[0].destroy();
      }
  monkey.velocityY=monkey.velocityY+0.8;
  monkey.collide(ground);
  
    if (Background.x<-220){
    Background.x=Background.width/3;
    }
    
  if (ground.x<0){
    ground.x=ground.width/2;
    }
    
    if (obstacleGroup.isTouching(monkey)){
      gameState=END;
      gmSound.play();
    }
 }  

  if (gameState===END){
    
    restart.visible=true;
    gameOver.visible=true;
    Background.velocityX=0;
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    monkey.addImage(collided);
    monkey.x=80;
    monkey.y=189;
 if (mousePressedOver(restart)){
   gameState=PLAY;
    reset();
    restart.visible=false;
    gameOver.visible=false;
     
   
   
  
      
    }
  } 
    
  
  
  
 
  
  
  drawSprites();
  
  stroke("green");
  textFont("bold");
  textSize(30);
  text("Survival time:"+survivalTime,150,50);
  
}

function Banana(){
if (frameCount%100==0){
  banana=createSprite(500,20,20,20);
  banana.addImage(bananaImage);
  banana.scale=0.1;
  banana.velocityX=-(4+  survivalTime/150);
  banana.y=Math.round(random(160,100));
  banana.lifetime=100;
  bananaGroup.add(banana);
  gameOver.depth=banana.depth;
  gameOver.depth=gameOver.depth+1;
  } 
}


function Stone(){
if (frameCount%300==0){
  stone=createSprite(500,200,50,50);
  stone.addImage(stoneImage);
  stone.scale=0.09;
  stone.velocityX=-(7+ survivalTime/150);
  stone.lifetime=100;
  obstacleGroup.add(stone);
  
  }
  
}

function reset(){
  survivalTime=0;
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  
   Background.velocityX=-4;
   if (Background.x<10){
    Background.x=Background.width/3;
    }
    
   
   
  if (ground.x<0){
    ground.x=ground.width/2;
    }
  
  
  
}





