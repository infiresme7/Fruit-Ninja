var knife, knifeImage;
var PLAY = 1;
var END=0;
var gameState= PLAY;
var score=0;
var knifeSwoosh;
var gameOverSound;

var fruit, fruitImage1, fruitImage2, fruitImage3, fruitImage4;
var monster, monsterAnimation;
var enemyGroup, fruitGroup;
var gameOverImage, gameOver;
var position;

function preload(){
  knifeImage = loadImage("sword.png");
  fruitImage1= loadImage("fruit1.png");
  fruitImage2= loadImage("fruit2.png");
  fruitImage3= loadImage("fruit3.png");
  fruitImage4= loadImage("fruit4.png");
  
  monsterImage= loadAnimation("alien1.png","alien2.png");
  gameOverImage= loadImage("gameover.png");
  knifeSwoosh= loadSound("knifeSwooshSound.mp3");
  gameOverSound= loadSound("gameover.mp3");
}

function setup(){
  createCanvas(650,400)
  knife= createSprite(40,200,20,20);
  knife.addImage("knife",knifeImage);
  knife.scale=0.7;
  
  gameOver=createSprite(320,200,400,20);
  gameOver.addImage(gameOverImage);
  gameOver.visible=false;
  
  fruitGroup= createGroup();
  enemyGroup = createGroup();
  
 }
 
function draw(){
background("lightblue");
  
  
  if(gameState===PLAY){
    knife.y=World.mouseY;
    knife.x=World.mouseX;
     fruits();
     enemy();
 }
 if(enemyGroup.isTouching(knife)){
    //knife.addImage(gameOverImage);
    gameOverSound.play();
    knife.visible=false;
    gameOver.visible=true;
    gameOver.scale=2;
    knife.x=200;
    knife.y=200;
    gameState=END;
 }
  if(fruitGroup.isTouching(knife)){
     knifeSwoosh.play();
     fruitGroup.destroyEach();
     
     score=score+2;

  }
  
 if(gameState===END){
    //enemyGroup.setVelocityXEach(0);
    //enemyGroup.setLifetimeEach(0);
    //fruitGroup.setVelocityXEach(0);
    //fruitGroup.setLifetimeEach(0);
   enemyGroup.visible=false;
   fruitGroup.visible=false;
   
    
 }
 
  text("Score: "+ score, 300,50);
  
  if(score>0 && score%20===0){
      fruitGroup.setVelocityXEach= -(6+ score/10);                       
      enemyGroup.setVelocityXEach= -(6+ score/10);
     
  }
  
  
  drawSprites();
  
}

function fruits(){
  if(frameCount%50===0){
     fruit=createSprite(700,200,20,20);
    fruit.scale=0.2;
    r=Math.round(random(1,4));
    if(r==1){
       fruit.addImage(fruitImage1);
      }
    else if(r==2){
       fruit.addImage(fruitImage2);
      }
    else if(r==3){
       fruit.addImage(fruitImage3);
      }
    else if(r==4){
      fruit.addImage(fruitImage4)
      }
    
    
    position = Math.round(random(1,4));
    if(position===1){
       fruit.x=500;
    }
   else if(position===2){
      fruit.x=300;
    }
   else if(position===3){
      fruit.x=200;
    }
   else if(position===4){
     fruit.x=347;
   }
    
    fruit.y= Math.round(random(50,400));
    fruit.velocityX=-7;
    fruit.setLifetime=100;
    fruitGroup.add(fruit);
    }
  }
  
  function enemy(){
   if(World.frameCount % 150===0){
     monster= createSprite(700,400,20,20);
     monster.addAnimation("monsterImage",monsterImage);
     monster.y=Math.round(random(100,500));
     monster.velocityX=-8;
     monster.setLifetime=50;
     enemyGroup.add(monster);
   }
  
  }




